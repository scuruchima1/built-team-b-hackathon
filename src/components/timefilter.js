import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './timefilter.css'; // Import your custom CSS file

const TimeFilter = ({ onTimeSelect }) => {
    const [selectedItem, setSelectedItem] = useState("Select a time frame");

    const handleSelect = (eventKey) => {
        setSelectedItem(eventKey);
        onTimeSelect(eventKey);
    };

    const times = [
        "Week",
        "6-Months(Past)",
        "12-Months(Past)",
        "5-Years(Past)"
    ];

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedItem}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-scrollable"> 
                {
                    times.map(time => (
                        <Dropdown.Item key={time} eventKey={time}>{time}</Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default TimeFilter;
