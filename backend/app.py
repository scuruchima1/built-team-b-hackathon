from flask import Flask, request, jsonify, render_template, url_for  # Import Flask and jsonify for creating the app and sending JSON responses
from flask_cors import CORS  # Import CORS to handle Cross-Origin Resource Sharing
from methods import process_data, clear_old_plots  # Import the process_data function from the methods module
import pandas as pd  # Import pandas for reading and manipulating data
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__)))  # Create a new Flask application instance
CORS(app)  # Enable CORS for all routes, allowing requests from different origins

@app.route('/api/agro_conditions', methods=['GET'])  # Define a new route for the API
def agro_conditions():  # Function that handles requests to this route
    return jsonify({"condition": "optimal", "temperature": "20°C", "humidity": "60%"})  # Return sample data as JSON

# Read the data from the CSV file
df = pd.read_csv('POWER_Regional_Monthly_1992_2022.csv', index_col=False)

@app.route('/')
def home():
    return render_template('/templates/index.html')

@app.route('/plot', methods=['POST'])
def plot():

    latitude = request.form.get('latitude')  # Get user-provided latitude from form
    longitude = request.form.get('longitude') # Get user-provided longitude from form
    year = request.form.get('year') # Get user-provided year from form
    param = request.form.get('param')  # Get user-provided parameter from form

    plot_filename = process_data(df, longitude, latitude, year, param)
    if plot_filename is None:
        return jsonify({'error': 'No data available for the given filters.'}), 400
    plot_url = url_for('static', filename=plot_filename, _external=True)

    return jsonify({'plot_url': plot_url})

@app.route('/clear_plot', methods=['POST'])
def clear_plot():
    clear_old_plots(os.path.join(basedir, 'static'))
    return jsonify({'message': 'All plots have been cleared.'})

if __name__ == '__main__':  # Check if the script is being run directly
    app.run(debug=True)  # Start the Flask application in debug mode for development
