import React, { useEffect, useState } from 'react';  // Import React and necessary hooks
import './App.css';  // Import the CSS file for styling
import DisplayMap from './components/map';
import Header from './components/header'
import CountyFilter from './components/countyfilter'
import TimeFilter from './components/timefilter'

function App() {  // Define the functional component named App

    return (  // Render the main UI
        <div className="App"> 
            <Header/>
            <DisplayMap/>
            <div className="TimeFilter">
                <TimeFilter/>
            </div>
            <div className="CountyFilter">
                <CountyFilter/>
            </div>
        </div>
    );
}

export default App;  // Export the App component for use in other files
