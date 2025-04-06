# C:\Users\chitr\anaconda3\python.exe backend/app.py
# https://openweathermap.org/current - API
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import xgboost as xgb
import joblib
from datetime import datetime

app = Flask(__name__)
CORS(app)

import os
model_path = os.path.join(os.path.dirname(__file__), "xgb_model.pkl")
model = joblib.load(model_path)
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        # Extract datetime features
        dt = datetime.fromisoformat(data["datetime"])
        hour = dt.hour
        day = dt.day
        month = dt.month
        year = dt.year
        weekday = dt.weekday()

        features = pd.DataFrame([{
            "season": get_season(month),
            "holiday": 0,  # optional: autofill if not in frontend
            "workingday": 1 if weekday < 5 else 0,
            "weather": int(data["weather"]),
            "temp": float(data["temp"]),
            "atemp": float(data["atemp"]),
            "humidity": float(data["humidity"]),
            "windspeed": float(data["windspeed"]),
            "hour": hour,
            "day": day,
            "month": month,
            "year": year,
            "weekday": weekday
        }])

        pred = model.predict(features)[0]
        user_count = int(data["user_count"])
        category = get_demand_category(user_count, pred)

        return jsonify({
            "predicted_count": int(pred),
            "category": category
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

def get_demand_category(actual, predicted):
    diff = actual - predicted
    if diff >= 50:
        return "very high"
    elif diff >= 20:
        return "high"
    elif abs(diff) < 20:
        return "normal"
    elif diff <= -20 and diff > -50:
        return "low"
    else:
        return "very low"

def get_season(month):
    if month in [12, 1, 2]: return 1  # Winter
    if month in [3, 4, 5]: return 2  # Spring
    if month in [6, 7, 8]: return 3  # Summer
    return 4  # Fall

if __name__ == "__main__":
    app.run(debug=True)
