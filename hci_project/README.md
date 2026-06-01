# Ecommerce-AI-voice-text-Assistant

A bilingual voice-driven conversational assistant for accessible e-commerce interfaces, developed as a Human-Computer Interaction (HCI) project at Information Technology University (ITU), Lahore.

This project enables users to interact with an e-commerce platform using voice and text commands in **English, Roman Urdu, Urdu script, and code-switched language**. It focuses on improving accessibility for users who prefer voice interaction or face barriers with traditional text-based e-commerce interfaces.

This repository contains the **MERN implementation**, **interactive prototype**, **evaluation scripts**, and **IEEE paper assets** for:

**A Bilingual Voice-Driven Conversational Assistant for Accessible E-Commerce Interfaces**

---

## Features

* 🎤 Voice input through browser speech recognition
* 💬 Text input fallback
* 🌐 Multilingual support:

  * English
  * Roman Urdu
  * Urdu script
  * Code-switched commands
* 🛒 Product search with filters
* ➕ Add/remove products from cart
* 📋 View cart workflow
* ✅ Order confirmation and persistence
* 🔊 Spoken assistant responses
* 🖥️ Visual feedback for:

  * language detection
  * intent recognition
  * product details
  * cart updates

---

## Project Structure

```bash
Ecommerce-AI-voice-text-Assistant/
│
├── client/                  # React + Vite shopping assistant UI
├── server/                  # Express API + database models
│
├── prototype/
│   ├── index.html           # Static multimodal web prototype
│   ├── styles.css           # Responsive styling
│   └── app.js               # UI logic + voice + cart workflow
│
├── src/
│   └── assistant-core.js    # Bilingual rule-based NLU engine
│
├── eval/
│   └── evaluate.js          # Automated testing & evaluation
│
├── paper/
│   ├── main.tex             # IEEE paper draft
│   ├── references.bib       # Research references
│   └── figures/             # Charts + screenshots
│
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/Ecommerce-AI-voice-text-Assistant.git
cd Ecommerce-AI-voice-text-Assistant
```

Install dependencies.

### Frontend

```bash
cd client
npm install
```

### Backend

Open another terminal:

```bash
cd server
npm install
```

---

## Run the MERN Application

Run frontend and backend in separate terminals.

### Terminal 1 — Client

```bash
cd client
npm run dev
```

### Terminal 2 — Server

```bash
cd server
npm start
```

Open in browser:

Frontend:

```bash
http://127.0.0.1:5173
```

---

## Database

Start MongoDB locally or configure:

```env
MONGODB_URI=your_database_connection_string
```

If MongoDB is unavailable, the server falls back to an **in-memory store** so the demo continues to run.

---

## Run Static Prototype

Open:

```bash
prototype/index.html
```

Features include:

* text fallback
* browser microphone input
* bilingual product search
* cart updates
* order confirmation
* visual transcript and response output

---

## Example Commands

### English

* `show me red shoes under 5000`
* `add laptop to cart`
* `remove shoes`
* `show cart`
* `yes place order`

### Roman Urdu

* `mujhe blue kurta dikhao`
* `cart mein 2 kurta add karo`
* `red shoes remove karo`
* `mera cart dikhao`
* `haan order confirm karo`

### Urdu

* `سرخ جوتے دکھاؤ`
* `کارٹ میں شامل کرو`
* `میرا کارٹ دکھاؤ`
* `آرڈر کنفرم کرو`

---

## Run Evaluation

```bash
node eval/evaluate.js
```

Generated output:

```bash
paper/figures/evaluation_results.json
paper/figures/accuracy_chart.tex
```

Evaluation covers:

* intent recognition
* slot extraction
* bilingual commands
* Roman Urdu
* Urdu script
* code-switched interactions

---

## Team Members

**Muhammad Mateen Amjad** — BSCE22005
**Abdullah Zahid** — BSCE22040
**Hoor ul Ain Amir** — BSCE22037

Department of Computer Engineering
Information Technology University (ITU), Lahore, Pakistan

---

## Future Improvements

* larger product catalogue
* stronger speech recognition accuracy
* improved synonym handling
* smarter NLP pipeline
* payment gateway integration
* deployment for real-world testing

---

## License

This project is developed for academic and educational purposes.
