// src/components/About.js
import React, {useState} from 'react';
import CropModal from './CropModal';
import './About.css';

const About = () => {
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
   
    const openModal = (crop) => {
        setSelectedCrop(crop);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedCrop(null);
        setModalIsOpen(false);
    };

    const crops = [
        {
            name: 'Corn',
            image: '/Corn.jpg',
            description: 'Corn is a staple crop in the United States. It is used for food, animal feed, and fuel production.',
            tips: {
                pestManagement: 'Monitor for corn earworms and European corn borers. Use integrated pest management (IPM) techniques.',
                pesticide: 'Consider using Bt corn to reduce the need for insecticides.',
                water: 'Corn typically requires 20-25 inches of water per season, especially during pollination.'
            }
        },
        {
            name: 'Soybeans',
            image: '/Soybeans.jpg',
            description: 'Soybeans are a versatile crop that can be used for food, animal feed, and industrial products.',
            tips: {
                pestManagement: 'Watch for aphids and soybean loopers. Use resistant varieties and crop rotation to manage pests.',
                pesticide: 'Apply systemic insecticides if pest populations exceed economic thresholds.',
                water: 'Soybeans need about 15-20 inches of water during the growing season, particularly during pod fill.'
            }
        },
        {
            name: 'Wheat',
            image: '/Wheat.jpg',
            description: 'Wheat is a staple crop that is used to make bread, pasta, and other food products.',
            tips: {
                pestManagement: 'Monitor for aphids and wheat rust diseases. Use resistant varieties to minimize damage.',
                pesticide: 'Fungicides may be necessary during wet weather to prevent diseases like fusarium head blight.',
                water: 'Wheat requires approximately 12-18 inches of water throughout its growing season.'
            }
        },
        {
            name: 'Hay',
            description: 'Hay is a forage crop that is used to feed livestock.',
            tips: {
                pestManagement: 'Check for pests like alfalfa weevils and grasshoppers. Implement timely harvests to avoid infestations.',
                pesticide: 'Use targeted insecticides if pest populations are high and affect yield quality.',
                water: 'Hay crops typically need 20-30 inches of water during the growing season, depending on the type of forage.'
            }
        },
        {
            name: 'Oats',
            image: '/Oats.jpg',
            description: 'Oats are a cereal grain that is used for food, animal feed, and industrial products.',
            tips: {
                pestManagement: 'Keep an eye out for cutworms and rust diseases. Implement crop rotation and sanitation practices.',
                pesticide: 'Insecticides may be necessary for cutworm infestations during early growth stages.',
                water: 'Oats require about 15-20 inches of water, with critical periods during seedling establishment and grain filling.'
            }
        }
    ];


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
            <div className="crop-list">
                {crops.map((crop) => (
                    <button key={crop.name} onClick={() => openModal(crop)} className="crop-button">
                        {crop.name}
                    </button>
                ))}
            </div>
            <CropModal 
                isOpen={modalIsOpen}
                crop={selectedCrop}
                onRequestClose={closeModal}
            />
        </div>
    );
};

export default About;