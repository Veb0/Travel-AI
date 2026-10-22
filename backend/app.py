from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "destinations.json")


def load_destinations():
    with open(DATA_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


@app.route("/")
def home():
    return jsonify({
        "message": "TravelAI Python backend is running"
    })


@app.route("/api/destinations", methods=["GET"])
def get_destinations():
    try:
        destinations = load_destinations()
        return jsonify(destinations)
    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 500


@app.route("/api/destinations/<destination_name>", methods=["GET"])
def get_destination(destination_name):
    destinations = load_destinations()

    for destination in destinations:
        if destination["name"].lower() == destination_name.lower():
            return jsonify(destination)

    return jsonify({
        "error": "Destination not found"
    }), 404


if __name__ == "__main__":
    app.run(debug=True, port=5000)