import React, { useState } from "react";
import axios from "axios";
import CountyFilter from "./countyfilter"; // Import the CountyFilter component
import TimeFilter from "./timefilter"; // Import the TimeFilter component
import './DataInputForm.css'; // Add your CSS file for styling

const DataInputForm = ({ longitude, latitude }) => {
    // const [latitude, setLatitude] = useState('');
    // const [longitude, setLongitude] = useState('');
    const [year, setYear] = useState('');
    const [param, setParam] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  // State for Error Message
    const [plotUrl, setPlotUrl] = useState(null);  // State for Plot URL

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear any existing error message
        setErrorMessage('');

        // Validate latitude and longitude bounds
        if (parseFloat(latitude) < -90 || parseFloat(latitude) > 90) {
            setErrorMessage('Latitude must be between -90 and 90.');
            return;
        }
        if (parseFloat(longitude) < -180 || parseFloat(longitude) > 180) {
            setErrorMessage('Longitude must be between -180 and 180.');
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            formData.append('year', year);
            if (param) {
                formData.append('param', param);
            }

            const response = await axios.post('http://127.0.0.1:5000/plot', formData, {
                headers: { 'Content-Type':  'multipart/form-data' },
            });
            setPlotUrl(response.data.plot_url);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setErrorMessage('Error connecting to the backend. Please try again.');
        }
    };

    const handleClear = async () => {
        try {
            await axios.post('http://127.0.0.1:5000/clear_plot');
            // setLatitude('');
            // setLongitude('');
            setYear('');
            setParam('');
            setPlotUrl(null);
            setErrorMessage('');
        } catch (error) {
            console.error('Error clearing form: ', error);
            setErrorMessage('Error clearing form. Please try again.');
        }
    };
    
    return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
            Year:
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
        <label>
            Parameter (optional):
            <select value={param} onChange={(e) => setParam(e.target.value)}>
                <option value="">Select a parameter</option>
                <option value="RH2M">Relative Humidity at 2 Meters (%)</option>
                <option value="T2M_MAX">Temperature at 2 meters max (C)</option>
                <option value="PRECTOTCORR">Precipitation Corrected (mm)</option>
                <option value="PRECTOTCORR_SUM">Precipitation Corrected Sum (mm/day)</option>
            </select>
        </label>
        <button type="submit">Generate Plot</button>
        <button type='button' onClick={handleClear}>Clear</button>
        </form>
        {plotUrl && (
        <div>
            <h2>Generated Plot</h2>
            <img src={plotUrl} alt="Generated Plot" />
        </div>
        )}
    </div>
    );
};

export default DataInputForm;
