// WeatherComponent.js
import React, { useState, useEffect } from 'react';

const Weather = ({ latitude, longitude }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            setError(null); // Reset error state

            try {
                // Fetch data from the API
                const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Get the forecast URL from the response
                const forecastUrl = data.properties.forecast;
                setCity(data.properties.relativeLocation.properties.city);
                setState(data.properties.relativeLocation.properties.state);

                // Fetch the forecast data
                const forecastResponse = await fetch(forecastUrl);
                if (!forecastResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const forecastData = await forecastResponse.json();
                
                setWeatherData(forecastData); // Set the forecast data
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // End loading state
            }
        };

        if (latitude && longitude) {
            fetchWeatherData();
        }
    }, [latitude, longitude]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!weatherData) {
        return <div>No weather data available.</div>;
    }

    // Get the latest weather forecast (first period in the periods array)
    const latestForecast = weatherData.properties.periods[0];

    return (
        <div>
            <h3>{latestForecast.name} in {city}, {state}</h3>
            {/* <img src={latestForecast.icon} alt={latestForecast.shortForecast} /> */}
            {/* <p><strong>Forecast:</strong> {latestForecast.detailedForecast}</p> */}
            <p><strong>Temperature:</strong> {latestForecast.temperature}°{latestForecast.temperatureUnit}</p>
            <p><strong>Wind Speed:</strong> {latestForecast.windSpeed} {latestForecast.windDirection}</p>

        </div>
    );
};

export default Weather;
