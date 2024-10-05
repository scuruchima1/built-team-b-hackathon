import React, { useEffect, useState } from 'react';  // Import React and necessary hooks
import './App.css';  // Import the CSS file for styling

function App() {  // Define the functional component named App
    const [conditions, setConditions] = useState(null);  // State variable to hold conditions data, initially null
    const [loading, setLoading] = useState(true);  // State variable to track loading status, initially true
    const [error, setError] = useState(null);  // State variable to hold any error messages, initially null

    useEffect(() => {  // useEffect hook to perform side effects, runs after the component mounts
        const fetchData = async () => {  // Define an asynchronous function to fetch data
            try {
                const response = await fetch('http://127.0.0.1:5000/api/agro_conditions');  // Fetch data from the backend
                if (!response.ok) {  // Check if the response is not okay (status not in the 200-299 range)
                    throw new Error('Network response was not ok');  // Throw an error if the response is not okay
                }
                const data = await response.json();  // Parse the JSON data from the response
                setConditions(data);  // Update the conditions state with the fetched data
            } catch (error) {  // Catch any errors that occur during the fetch
                setError(error.message);  // Update the error state with the error message
            } finally {
                setLoading(false);  // Set loading to false regardless of success or error
            }
        };

        fetchData();  // Call the fetchData function
    }, []);  // Empty dependency array means this effect runs only once when the component mounts

    if (loading) {  // Check if loading is true
        return <p>Loading...</p>;  // Display a loading message
    }

    if (error) {  // Check if there is an error
        return <p>Error: {error}</p>;  // Display the error message
    }

    return (  // Render the main UI
        <div className="App">  // Main wrapper div with class "App"
            <header className="App-header">  // Header section
                <h1>Agricultural Conditions</h1>  // Main title
                {conditions ? (  // Check if conditions data is available
                    <div>  // Render this div if conditions exist
                        <p><strong>Condition:</strong> {conditions.condition}</p>  // Display condition
                        <p><strong>Temperature:</strong> {conditions.temperature}</p>  // Display temperature
                        <p><strong>Humidity:</strong> {conditions.humidity}</p>  // Display humidity
                    </div>
                ) : (  // If no conditions are available
                    <p>No conditions available.</p>  // Display a message indicating no data
                )}
            </header>
        </div>
    );
}

export default App;  // Export the App component for use in other files
