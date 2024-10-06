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

const DisplayMap = ({ setLatitude, setLongitude }) => {
    const [geoData, setGeoData] = useState(null);
    const [latitude, setObjLatitude] = useState(40.0); // Default center latitude
    const [longitude, setObjLongitude] = useState(-89.0); // Default center longitude
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


    const LocationMarker = () => { 
        useMapEvents({
            click(e) {
                setObjLatitude(e.latlng.lat);
                setObjLongitude(e.latlng.lng);
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
                    />
                )}
                <LocationMarker />
            </MapContainer>
        </div>
    );
};

export default DisplayMap;
