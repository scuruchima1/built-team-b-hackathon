// src/components/About.js
import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <section className="Summary">
                <div className='Content'>
                    <h2>Summary</h2>
                    <p>
                        Farmers face a deluge of water-related challenges due to unpredictable weather, pests, and diseases. 
                        These factors can significantly impact crop health, farmers’ profits, and food security. Depending 
                        upon the geography, many farmers may face droughts or floods—sometimes both of these extreme events 
                        occur within the same season!
                    </p>
                </div>
            </section>

            <section className="Problem">
                <div className='Content'>
                    <h2>Problem</h2>
                    <p>
                        Farmers need a way to predict and manage water-related 
                        risks to ensure crop health and maximize profits. They 
                        need a tool that can provide accurate and timely 
                        information about the water content in their soil. This
                        information can help them make informed decisions about
                        irrigation, fertilization, and pest management.
                    </p>
                </div>
            </section>

            <section className="Solution">
                <div className='Content'>
                    <h2>Solution</h2>
                    <p>
                        Our solution is a web application displays a map of 
                        Illinois with county boundaries. Users can input their county, the year, and the parameter they want to
                        visualize. The application will then generate a plot showing the parameter data for the selected county
                        and year. This information can help farmers make informed decisions about irrigation, fertilization, and
                        pest management.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;