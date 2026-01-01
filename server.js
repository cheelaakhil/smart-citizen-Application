require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- 1. DATABASE ---
let services = [
    // HOSPITALS
    { id: "h1", name: "Malla Reddy Narayana Hospital", type: "Hospital", tags: ["hospital", "emergency"], rating: 4.2, lat: 17.519, lon: 78.465, location: "Suraram" },
    { id: "h2", name: "Usha Mullapudi Cardiac Center", type: "Hospital", tags: ["hospital", "heart"], rating: 4.6, lat: 17.505, lon: 78.435, location: "Jeedimetla" },
    
    // PHARMACIES
    { id: "p1", name: "Apollo Pharmacy", type: "Pharmacy", tags: ["pharmacy", "medicine"], rating: 4.2, lat: 17.520, lon: 78.470, location: "Suraram" },
    { id: "p2", name: "MedPlus Dundigal", type: "Pharmacy", tags: ["pharmacy", "medicine"], rating: 4.5, lat: 17.584, lon: 78.436, location: "Dundigal" },

    // SHOPPING
    { id: "s1", name: "Nexus Hyderabad Mall", type: "Mall", tags: ["shopping", "mall", "cinema", "nexus"], rating: 4.6, lat: 17.484, lon: 78.399, location: "Kukatpally" },
    { id: "s2", name: "Vishal Mega Mart", type: "Shopping", tags: ["shopping", "mart", "clothes", "grocery", "vishal"], rating: 4.1, lat: 17.590, lon: 78.442, location: "Gandimaisamma" },
    { id: "s3", name: "D-Mart Kompally", type: "Shopping", tags: ["shopping", "grocery", "mart"], rating: 4.5, lat: 17.545, lon: 78.488, location: "Kompally" },

    // GYMS
    { id: "g1", name: "Iron Pumping Gym", type: "Gym", tags: ["gym", "fitness"], rating: 4.7, lat: 17.585, lon: 78.435, location: "Dundigal" }
];

let users = [{ id: "u1", name: "Akhil", email: "akhilcheela4@gmail.com", password: "123" }];

// --- 2. LOGIC ---
function calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat1*(Math.PI/180))*Math.cos(lat2*(Math.PI/180))*Math.sin(dLon/2)*Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function getRecommendations(params) {
    let candidates = services;

    // 1. Keyword Search
    if (params.keywords && params.keywords.length > 0) {
        const lowerKeywords = params.keywords.map(k => k.toLowerCase());
        candidates = candidates.filter(service => 
            service.tags.some(tag => lowerKeywords.some(k => tag.includes(k) || k.includes(tag)))
        );
    } 
    // 2. Name Search
    else if (params.nameSearch) {
        const query = params.nameSearch.toLowerCase();
        candidates = candidates.filter(service => 
            service.name.toLowerCase().includes(query) || 
            service.location.toLowerCase().includes(query)
        );
    }

    return candidates.map(service => {
        let score = service.rating * 10;
        let dist = null;
        if (params.userLocation) {
            dist = calculateDistance(params.userLocation.lat, params.userLocation.lon, service.lat, service.lon);
            if (dist !== null) {
                if (dist < 5) score += 30;  
                else score -= (dist * 1);      
            }
        }
        return { ...service, score, distance: (dist !== null) ? dist.toFixed(1) : "?" };
    }).sort((a, b) => b.score - a.score);
}

async function analyzeIntent(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes("accident") || lowerMsg.includes("sos") || lowerMsg.includes("help")) {
        return { action: 'EMERGENCY', response: "🚨 **CRITICAL**: Showing emergency centers!" };
    }

    let keywords = [];
    if (lowerMsg.includes("pharmacy")) keywords.push("pharmacy");
    if (lowerMsg.includes("hospital")) keywords.push("hospital");
    if (lowerMsg.includes("gym")) keywords.push("gym");
    
    // THIS FIXES "MALLS" BUTTON ISSUE
    if (lowerMsg.includes("shop") || lowerMsg.includes("mall") || lowerMsg.includes("mart")) {
        keywords.push("shopping", "mall", "mart");
    }

    if (keywords.length > 0) {
        return { action: 'SEARCH', params: { keywords } };
    }
    
    // FALLBACK: Name Search
    return { action: 'SEARCH', params: { nameSearch: userMessage } };
}

// --- 3. ROUTES ---
app.post('/login', (req, res) => {
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password);
    if (user) res.json({ success: true, user: { name: user.name } });
    else res.json({ success: false });
});

app.post('/chat', async (req, res) => {
    try {
        const { message, location } = req.body;
        console.log("📥 Received Message:", message); // Debug Log

        const intent = await analyzeIntent(message);

        if (intent.action === 'SEARCH' || intent.action === 'EMERGENCY') {
            intent.params = intent.params || {};
            intent.params.userLocation = location;
            
            const results = getRecommendations(intent.params);
            
            if (results.length === 0) return res.json({ type: 'text', reply: `I couldn't find "${message}" nearby.` });
            
            return res.json({ 
                type: intent.action === 'EMERGENCY' ? 'emergency' : 'recommendation', 
                reply: intent.response || `Found ${results.length} options for you.`, 
                data: results.slice(0, 5) 
            });
        }
        res.json({ type: 'text', reply: intent.response });
    } catch (error) {
        res.status(500).json({ type: 'text', reply: "Server error." });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));