import 'bootstrap/dist/css/bootstrap.css';  // Import Bootstrap CSS for styling
import React from 'react';  // Import React
import ReactDOM from 'react-dom/client';  // Import ReactDOM for rendering
import { BrowserRouter as Router } from 'react-router-dom';  // Import Router from React Router
import './index.css';  // Import global styles
import App from './App';  // Import the main App component
import reportWebVitals from './reportWebVitals';  // Import performance measurement function

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create a root element for rendering
root.render(
  <React.StrictMode>
    <Router>  // Wrap the App component in Router to enable routing
      <App />  // Render the main App component
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
