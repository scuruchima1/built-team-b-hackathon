import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON,useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import './map.css';

const icon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});


const addMarginOfError = (latitude, longitude, margin = 0.01) => {
    const randomOffset = () => (Math.random() - 0.5) * margin * 2;
    const newLatitude = latitude + randomOffset();
    const newLongitude = longitude + randomOffset();
    return [newLatitude, newLongitude];
};

const DisplayMap = () => {
    const [geoData, setGeoData] = useState(null);
    const [latitude, setLatitude] = useState(40.0); // Default center latitude
    const [longitude, setLongitude] = useState(-89.0); // Default center longitude
    const position = [latitude, longitude]; // Center of Illinois

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

    const LocationMarker = () => { 
        useMapEvents({
            click(e) {
                setLatitude(e.latlng.lat);
                setLongitude(e.latlng.lng);
            },
        });
        return latitude && longitude ? (
            <Marker 
                position={[latitude, longitude]} 
                icon={icon}
                draggable={true}
                eventHandlers={{
                    dragend: (e) => {
                        const marker = e.target;
                        const position = marker.getLatLng();
                        setLatitude(position.lat);
                        setLongitude(position.lng);
                    
                    },
                }}
            />
        ) : null;
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
                <LocationMarker />
            </MapContainer>
            <div>
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
            </div>
        </div>
    );
};

export default DisplayMap;
