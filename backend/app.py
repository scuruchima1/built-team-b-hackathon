from flask import Flask, jsonify  # Import Flask and jsonify for creating the app and sending JSON responses
from flask_cors import CORS  # Import CORS to handle Cross-Origin Resource Sharing

app = Flask(__name__)  # Create a new Flask application instance
CORS(app)  # Enable CORS for all routes, allowing requests from different origins

@app.route('/api/agro_conditions', methods=['GET'])  # Define a new route for the API
def agro_conditions():  # Function that handles requests to this route
    return jsonify({"condition": "optimal", "temperature": "20°C", "humidity": "60%"})  # Return sample data as JSON

if __name__ == '__main__':  # Check if the script is being run directly
    app.run(debug=True)  # Start the Flask application in debug mode for development
