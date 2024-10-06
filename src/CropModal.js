// src/components/CropModal.js
import React from 'react';
import Modal from 'react-modal';
import './CropModal.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const CropModal = ({ isOpen, onRequestClose, crop }) => {
    if (!crop) {
        return null;
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>

            <h2>{crop.name}</h2>
            <img src={crop.image} alt={crop.title} style={{ width: '40%', height: 'auto' }} />
            <p>{crop.description}</p>
            <h3>Pest Management Tips:</h3>
            <p>{crop.tips.pestManagement}</p>
            <h3>Pesticide Recommendations:</h3>
            <p>{crop.tips.pesticide}</p>
            <h3>Water Requirements:</h3>
            <p>{crop.tips.water}</p>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default CropModal;