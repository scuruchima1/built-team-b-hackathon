import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

const DisplayMap = () => {
    const [geoData, setGeoData] = useState(null);
    const position = [40.0, -89.0]; // Center of Illinois

    // Fetch the GeoJSON data when the component loads
    useEffect(() => {
        const fetchGeoJSON = async () => {
            const response = await fetch('https://raw.githubusercontent.com/codeforgermany/click_that_hood/master/public/data/illinois-counties.geojson');
            const data = await response.json();
            setGeoData(data);
        };
        fetchGeoJSON();
    }, []);

    // Function to style each feature (optional)
    const style = {
        color: 'blue',
        weight: 1,
        fillOpacity: 0.1,
    };

    // Function to handle mouseover events and show popup
    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: (e) => {
                const { name } = feature.properties; // Assuming the property name holds the county name
                const layer = e.target;
                layer.bindPopup(`<strong>${name}</strong>`).openPopup();
            },
            mouseout: (e) => {
                e.target.closePopup();
            },
        });
    };

    return (
        <div className="displayMap">
            <MapContainer center={position} zoom={6} className="leaflet-container">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {geoData && (
                    <GeoJSON 
                        data={geoData} 
                        style={style} 
                        onEachFeature={onEachFeature} 
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default DisplayMap;
