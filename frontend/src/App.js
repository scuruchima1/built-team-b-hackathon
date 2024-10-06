import React, { useEffect, useState } from 'react';  // Import React and necessary hooks
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';  // Import the CSS file for styling
import DisplayMap from './components/map';
import Header from './components/header'
import CountyFilter from './components/countyfilter'
import TimeFilter from './components/timefilter'
import DataInputForm from './components/DataInputForm';
import About from './About';
import Weather from './components/weather'
import axios from 'axios';  // Import axios for making API requests

function App() {  // Define the functional component named App
    // Plot
    const [plotPath, setPlotPath] = useState(null);
    const [latitude, setLatitude] = useState(40.0);;
    const [longitude, setLongitude] = useState(-89.0);

    const handlePlotGenerated = (path) => {
        setPlotPath(path);
    };

    // County filter
    const [selectedCounty, setSelectedCounty] = useState(null);

    const handleCountySelect = (county) => {
        const parsedCountyData = JSON.parse(county);
        setSelectedCounty(parsedCountyData.county);
        setLatitude(parsedCountyData.coords[0])
        setLongitude(parsedCountyData.coords[1])
    };

    // Time filter
    const [selectedTimeframe, setSelectedTimeframe] = useState(null);

    const handleTimeframeSelect = (timeframe) => {
        setSelectedTimeframe(timeframe);
    }

    return (
        <Router>
            <div className="App">
                <Header />
                <nav>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                    </div>       
                </nav>
                <Routes>
                    <Route path="/about" element={
                        <About />
                    } />
                    <Route path="/" element={
                        <>
                        <PrecipitationForecast />
                        <Weather longitude={longitude} latitude={latitude}/>
                        <DisplayMap longitude={longitude} latitude={latitude} setLatitude={setLatitude} setLongitude={setLongitude} />
                        <DataInputForm latitude={latitude} longitude={longitude} />
                        {plotPath && (
                            <div>
                                <h2>Generated Plot:</h2>
                                <img src={`data:image/png;base64,${plotPath}`} alt="Generated Plot" />
                            </div>
                        )}
                        <div className="TimeFilter">
                            <TimeFilter onTimeSelect={handleTimeframeSelect}/>
                        </div>
                        <div className="CountyFilter">
                            <CountyFilter onCountySelect={handleCountySelect} />
                        </div>
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;  // Export the App component for use in other files
