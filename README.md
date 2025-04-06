# 🚴‍♂️ Rapido Bike Demand Prediction Web App

A smart web app that predicts **Rapido bike ride demand** using machine learning and real-time weather and datetime data. It's fast, clean, and helps users estimate how busy the service might be in their area.

## 🔍 Features

- 🌐 **Auto Location Detection**: Uses browser geolocation to fetch user location.
- 🌤️ **Weather Autofill**: Gets current temperature, humidity, windspeed, and weather condition using OpenWeatherMap API.
- ⏰ **Datetime Autofill**: Automatically fills in current date and time.
- 🤖 **ML Prediction**: Uses an XGBoost model to predict demand.
- 🧠 **Demand Category**: Categorizes predicted demand into:
  - 🔴 Very High
  - 🟠 High
  - 🟢 Normal
  - 🔵 Low
  - ⚪ Very Low
- 🎨 **Modern UI**:
  - Responsive design
  - Dark/light mode toggle
  - Animated prediction result reveal
  - Tooltips and weather icons (☀️ 🌧️ ⛈️ ☁️)

---

## 📦 Tech Stack

| Layer     | Technologies                      |
|-----------|-----------------------------------|
| Frontend  | HTML, CSS, JavaScript             |
| Backend   | Python, Flask, Flask-CORS         |
| ML Model  | XGBoost (trained separately)      |
| APIs      | Geolocation API, OpenWeatherMap   |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ChitranshGuha/Rapido-Bike-Demand-Prediction.git
cd Rapido-Bike-Demand-Prediction
```

### 2. Set Up Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

> Flask server will run on `http://127.0.0.1:5000`

### 3. Run the Frontend

Open `index.html` in your browser.

---

## 📂 Project Structure

```
Rapido-Bike-Demand-Prediction/
├── backend/
│   ├── app.py               # Flask API
│   ├── model.xgb            # Trained XGBoost model
│   └── requirements.txt
├── index.html               # Main frontend file
├── style.css                # Styling for the app
├── script.js                # Client-side JS for autofill & API calls
└── README.md
```

---

## 📊 Model Overview

- Trained using historical bike ride data
- Input features:
  - Datetime (hour, day, month, weekday, etc.)
  - Weather
  - Temperature
  - Humidity
  - Windspeed
- Output: Predicted ride count
- Model: XGBoost Regressor
- Category logic based on predicted count vs expected

---

## 🔐 API Key

Get your free OpenWeatherMap API key here: [https://openweathermap.org/appid](https://openweathermap.org/appid)

Update it in `script.js`:

```js
const apiKey = "your_openweathermap_api_key";
```

---

## ✨ Enhancements (Implemented)

- ✅ Dark mode / light mode toggle
- ✅ Animated result reveal
- ✅ Weather icons & tooltips
- ✅ Cleaner layout, reduced scrolling

---

## 📸 Screenshots

![Homepage](Screenshot%202025-04-07%20012326.png)

![Prediction](Screenshot%202025-04-07%20012344.png)


---

## 🧠 Future Ideas

- Add reverse geocoding for city name
- Store and view recent predictions
- Deploy with Flask + Netlify/Vercel
- Add charts or demand trends

---

## 📄 License

MIT License © [Chitransh Guha](https://github.com/ChitranshGuha)
```

---

Let me know if you want me to include the dataset link, training notebook reference, or deployment guide too!
