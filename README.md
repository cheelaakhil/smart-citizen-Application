# 🏥 SMART Citizen Wellbeing Recommender

> An AI-powered service recommendation system prioritizing healthcare and citizen wellbeing.

## 📖 Overview
The **SMART Citizen Wellbeing Recommender** is a full-stack web application designed to help citizens connect with the right public or private services based on their immediate needs.

Unlike standard search engines, this system uses an **Intelligent Triage Agent** ("CivicMate") to:
1.  **Analyze Intent:** Understands if a user needs routine care (e.g., Yoga) or critical help (e.g., Emergency).
2.  **Prioritize Safety:** Immediately detects medical emergencies and overrides recommendations with safety protocols.
3.  **Hybrid Recommendation:** Scores services based on urgency, rating, wait times, and location.

---

## 🚀 Features
* **Conversational Interface:** Natural language chat interface for easy interaction.
* **Emergency Guardrails:** Zero-latency detection of critical keywords (e.g., "Chest pain", "Suicide") to trigger red-alert warnings.
* **Smart Scoring Engine:** Algorithms that weigh *Urgency* vs. *Distance* vs. *Quality*.
* **Dual-Tier Service Database:** Distinguishes between Public (Govt) and Private services.

---

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (Single Page Application)
* **AI/Logic:** Rule-Based NLP (v1), LangChain.js (Ready for v2 integration)
* **Data:** JSON-based Mock Registry (Scalable to MongoDB/PostgreSQL)

---

## ⚙️ Installation & Setup

### 1. Prerequisites
Ensure you have **Node.js** installed on your machine.

### 2. Clone/Download
Download the project files to your local directory.

### 3. Install Dependencies
Open your terminal in the project folder and run:
```bash
npm install