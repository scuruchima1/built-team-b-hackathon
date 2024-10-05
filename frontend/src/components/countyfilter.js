import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './countyfilter.css'; // Import your custom CSS file

const CountyFilter = () => {
    const [selectedItem, setSelectedItem] = useState("Select a County");

    const handleSelect = (eventKey) => {
        setSelectedItem(eventKey);
    };

    const illinoisCounties = [
        "Adams",
        "Alexander",
        "Bond",
        "Boone",
        "Brown",
        "Bureau",
        "Calhoun",
        "Carroll",
        "Cass",
        "Champaign",
        "Christian",
        "Clark",
        "Clay",
        "Clinton",
        "Coles",
        "Cook",
        "Crawford",
        "Cumberland",
        "Dekalb",
        "Dewitt",
        "Douglas",
        "DuPage",
        "Edgar",
        "Edwards",
        "Effingham",
        "Fayette",
        "Ford",
        "Franklin",
        "Fulton",
        "Gallatin",
        "Greene",
        "Grundy",
        "Hamilton",
        "Hancock",
        "Hardin",
        "Henderson",
        "Henry",
        "Iroquois",
        "Jackson",
        "Jasper",
        "Jefferson",
        "Jersey",
        "Jo Daviess",
        "Johnson",
        "Kane",
        "Kankakee",
        "Kendall",
        "Knox",
        "Lake",
        "LaSalle",
        "Lawrence",
        "Lee",
        "Livingston",
        "Logan",
        "Macon",
        "Macoupin",
        "Madison",
        "Marion",
        "Marshall",
        "Mason",
        "Massac",
        "McDonough",
        "McHenry",
        "McLean",
        "Menard",
        "Mercer",
        "Monroe",
        "Montgomery",
        "Morgan",
        "Moultrie",
        "Ogle",
        "Peoria",
        "Perry",
        "Piatt",
        "Pike",
        "Pope",
        "Pulaski",
        "Putnam",
        "Randolph",
        "Richland",
        "Rock Island",
        "Saline",
        "Sangamon",
        "Schuyler",
        "Scott",
        "Shelby",
        "St. Clair",
        "Stark",
        "Stephenson",
        "Tazewell",
        "Union",
        "Vermilion",
        "Wabash",
        "Warren",
        "Washington",
        "Wayne",
        "White",
        "Whiteside",
        "Will",
        "Williamson",
        "Winnebago",
        "Woodford"
    ];

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedItem}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-scrollable"> 
                {
                    illinoisCounties.map(county => (
                        <Dropdown.Item key={county} eventKey={county}>{county}</Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CountyFilter;
