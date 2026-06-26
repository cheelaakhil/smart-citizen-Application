# 🏙️ SMART Citizen | Future City OS

<div align="center">
  <p>A unified, real-time command center connecting Citizens, Emergency Services, and Government Infrastructure. Faster than a call. Smarter than a map.</p>
</div>

## 🚀 Overview

**SMART Citizen** is a Next-Gen Urban Operating System designed to streamline access to essential city services. Whether it's finding the nearest hospital with available beds, triggering an immediate SOS, or tracking down the closest public transit or ATM, SMART Citizen relies on live satellite data and cloud-synced databases to deliver zero-latency results.

## ✨ Features

- **🚨 Zero-Latency SOS:** Triggers emergency protocols instantly, sharing live GPS coordinates with the nearest patrol units via the WhatsApp API.
- **🏥 Live Bed Tracking:** Eliminates guesswork by displaying real-time ICU and hospital bed availability, pulling from both Live Satellite (OSM) and Cloud data.
- **🏛️ Govt & Utility Services:** Seamless access to nearby Police Stations, Pharmacies, ATMs, RTO/Meeseva, Metro/Bus Stations, EV Chargers, and Public Restrooms.
- **🛰️ Hybrid Data Fetching:** Utilizes a custom, robust intent analyzer that gracefully falls back from the OpenStreetMap (OSM) Overpass API to a Supabase Cloud database when needed.
- **🗺️ Interactive City Map:** Powered by Leaflet.js to pinpoint user locations and map dynamic POI (Points of Interest) visually.

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3 (Custom Glassmorphism Design), JavaScript, Leaflet.js
- **Backend:** Node.js, Express.js
- **Database / Auth:** Supabase (PostgreSQL)
- **APIs:** OpenStreetMap (OSM) Overpass API, WhatsApp API

## 📂 Project Structure

```text
smart-citizen-Application/
├── public/                 # Frontend Assets
│   ├── css/                # Styling (Glassmorphism, Animations)
│   ├── index.html          # Landing Page
│   ├── chat.html           # Main Dashboard & Interactive Map
│   ├── login.html          # Authentication
│   └── register.html       # User Registration
├── .env                    # Environment Variables (ignored by git)
├── server.js               # Express Backend, Hybrid Fetch, Routes
└── package.json            # Node Dependencies
```

## ⚙️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/cheelaakhil/smart-citizen-Application.git
   cd smart-citizen-Application
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   PORT=3000
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

4. **Run the Application**
   ```bash
   node server.js
   ```
   > The server will start on `http://localhost:3000`

## 🔐 Authentication & Database Setup

This project uses **Supabase** for user authentication and backend storage. 
1. Create a project on [Supabase](https://supabase.com/).
2. Under **Database**, create a `users` table:
   ```sql
   create table public.users (
     id uuid default gen_random_uuid() primary key,
     name text not null,
     email text unique not null,
     password text not null
   );
   ```
3. (Optional) Create a `services` table to act as a fallback when the OSM API is unavailable.

## 👨‍💻 Author

**Cheela Akhil**
- [LinkedIn](https://linkedin.com/in/cheelaakhil)
- [GitHub](https://github.com/cheelaakhil)
