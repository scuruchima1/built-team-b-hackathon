import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import DisplayMap from './components/map';
import Header from './components/header';
import CountyFilter from './components/countyfilter';
import TimeFilter from './components/timefilter';
import DataInputForm from './components/DataInputForm';
import About from './About';
import Weather from './components/weather'
import axios from 'axios';  // Import axios for making API requests

function App() {
    const [plotPath, setPlotPath] = useState(null);
    const [latitude, setLatitude] = useState(40.0);
    const [longitude, setLongitude] = useState(-89.0);

    const handlePlotGenerated = (path) => {
        setPlotPath(path);
    };

    const [selectedCounty, setSelectedCounty] = useState(null);

    const handleCountySelect = (county) => {
        const parsedCountyData = JSON.parse(county);
        setSelectedCounty(parsedCountyData.county);
        setLatitude(parsedCountyData.coords[0]);
        setLongitude(parsedCountyData.coords[1]);
    };

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/about" element={
                        <About />
                    } />
                    <Route path="/" element={
                        <>
                        <Weather longitude={longitude} latitude={latitude}/>
                        <DisplayMap longitude={longitude} latitude={latitude} setLatitude={setLatitude} setLongitude={setLongitude} />
                        <DataInputForm latitude={latitude} longitude={longitude} />
                        {plotPath && (
                            <div>
                                <h2>Generated Plot:</h2>
                                <img src={`data:image/png;base64,${plotPath}`} alt="Generated Plot" />
                            </div>
                        )}
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

export default App;
