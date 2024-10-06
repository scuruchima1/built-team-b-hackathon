import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './countyfilter.css'; // Import your custom CSS file


const CountyFilter = ({ onCountySelect }) => {
    const illinoisCountyCoordinates = {
        "Adams": { city: "Quincy", coords: [39.9356, -91.4099] },
        "Alexander": { city: "Cairo", coords: [37.0050, -89.1773] },
        "Bond": { city: "Greenville", coords: [38.8923, -89.4137] },
        "Boone": { city: "Belvidere", coords: [42.2639, -88.8443] },
        "Brown": { city: "Mount Sterling", coords: [39.9873, -90.7630] },
        "Bureau": { city: "Princeton", coords: [41.3686, -89.4645] },
        "Calhoun": { city: "Hardin", coords: [39.1586, -90.6173] },
        "Carroll": { city: "Mount Carroll", coords: [42.0959, -89.9789] },
        "Cass": { city: "Virginia", coords: [39.9514, -90.2107] },
        "Champaign": { city: "Urbana", coords: [40.1106, -88.2073] },
        "Christian": { city: "Taylorville", coords: [39.5481, -89.2940] },
        "Clark": { city: "Marshall", coords: [39.3914, -87.6989] },
        "Clay": { city: "Louisville", coords: [38.7719, -88.5051] },
        "Clinton": { city: "Carlyle", coords: [38.6114, -89.3732] },
        "Coles": { city: "Charleston", coords: [39.4961, -88.1762] },
        "Cook": { city: "Chicago", coords: [41.8781, -87.6298] },
        "Crawford": { city: "Robinson", coords: [39.0053, -87.7372] },
        "Cumberland": { city: "Toledo", coords: [39.2731, -88.2431] },
        "DeKalb": { city: "Sycamore", coords: [41.9886, -88.6862] },
        "DeWitt": { city: "Clinton", coords: [40.1531, -88.9595] },
        "Douglas": { city: "Tuscola", coords: [39.7998, -88.2817] },
        "DuPage": { city: "Wheaton", coords: [41.8661, -88.1070] },
        "Edgar": { city: "Paris", coords: [39.6134, -87.6968] },
        "Edwards": { city: "Albion", coords: [38.3776, -88.0569] },
        "Effingham": { city: "Effingham", coords: [39.1200, -88.5434] },
        "Fayette": { city: "Vandalia", coords: [38.9606, -89.0932] },
        "Ford": { city: "Paxton", coords: [40.4581, -88.1005] },
        "Franklin": { city: "Benton", coords: [37.9961, -88.9201] },
        "Fulton": { city: "Lewistown", coords: [40.3967, -90.1559] },
        "Gallatin": { city: "Shawneetown", coords: [37.6987, -88.1414] },
        "Greene": { city: "Carrollton", coords: [39.3037, -90.4071] },
        "Grundy": { city: "Morris", coords: [41.3570, -88.4212] },
        "Hamilton": { city: "McLeansboro", coords: [38.0912, -88.5369] },
        "Hancock": { city: "Carthage", coords: [40.4159, -91.1328] },
        "Hardin": { city: "Elizabethtown", coords: [37.4486, -88.3067] },
        "Henderson": { city: "Oquawka", coords: [40.9370, -90.9501] },
        "Henry": { city: "Cambridge", coords: [41.3036, -90.1926] },
        "Iroquois": { city: "Watseka", coords: [40.7767, -87.7376] },
        "Jackson": { city: "Murphysboro", coords: [37.7640, -89.3362] },
        "Jasper": { city: "Newton", coords: [38.9887, -88.1628] },
        "Jefferson": { city: "Mount Vernon", coords: [38.3173, -88.9032] },
        "Jersey": { city: "Jerseyville", coords: [39.1209, -90.3282] },
        "Jo Daviess": { city: "Galena", coords: [42.4167, -90.4290] },
        "Johnson": { city: "Vienna", coords: [37.4156, -88.8973] },
        "Kane": { city: "Geneva", coords: [41.8875, -88.3054] },
        "Kankakee": { city: "Kankakee", coords: [41.1200, -87.8612] },
        "Kendall": { city: "Yorkville", coords: [41.6415, -88.4473] },
        "Knox": { city: "Galesburg", coords: [40.9478, -90.3712] },
        "Lake": { city: "Waukegan", coords: [42.3636, -87.8448] },
        "LaSalle": { city: "Ottawa", coords: [41.3456, -88.8425] },
        "Lawrence": { city: "Lawrenceville", coords: [38.7264, -87.6814] },
        "Lee": { city: "Dixon", coords: [41.8400, -89.4774] },
        "Livingston": { city: "Pontiac", coords: [40.8803, -88.6294] },
        "Logan": { city: "Lincoln", coords: [40.1489, -89.3646] },
        "Macon": { city: "Decatur", coords: [39.8403, -88.9548] },
        "Macoupin": { city: "Carlinville", coords: [39.2790, -89.8818] },
        "Madison": { city: "Edwardsville", coords: [38.8114, -89.9532] },
        "Marion": { city: "Salem", coords: [38.6287, -88.9457] },
        "Marshall": { city: "Lacon", coords: [41.0242, -89.4115] },
        "Mason": { city: "Havana", coords: [40.3009, -90.0607] },
        "Massac": { city: "Metropolis", coords: [37.1517, -88.7101] },
        "McDonough": { city: "Macomb", coords: [40.4584, -90.6718] },
        "McHenry": { city: "Woodstock", coords: [42.3147, -88.4483] },
        "McLean": { city: "Bloomington", coords: [40.4842, -88.9937] },
        "Menard": { city: "Petersburg", coords: [40.0114, -89.8504] },
        "Mercer": { city: "Aledo", coords: [41.1995, -90.7504] },
        "Monroe": { city: "Waterloo", coords: [38.3356, -90.1499] },
        "Montgomery": { city: "Hillsboro", coords: [39.1617, -89.4881] },
        "Morgan": { city: "Jacksonville", coords: [39.7331, -90.2293] },
        "Moultrie": { city: "Sullivan", coords: [39.5995, -88.6093] },
        "Ogle": { city: "Oregon", coords: [42.0142, -89.3334] },
        "Peoria": { city: "Peoria", coords: [40.6936, -89.5890] },
        "Perry": { city: "Pinckneyville", coords: [38.0804, -89.3806] },
        "Piatt": { city: "Monticello", coords: [40.0284, -88.5737] },
        "Pike": { city: "Pittsfield", coords: [39.6064, -90.8052] },
        "Pope": { city: "Golconda", coords: [37.3631, -88.4878] },
        "Pulaski": { city: "Mound City", coords: [37.0850, -89.1606] },
        "Putnam": { city: "Hennepin", coords: [41.2517, -89.3601] },
        "Randolph": { city: "Chester", coords: [37.9139, -89.8229] },
        "Richland": { city: "Olney", coords: [38.7290, -88.0859] },
        "Rock Island": { city: "Rock Island", coords: [41.4694, -90.5699] },
        "Saline": { city: "Harrisburg", coords: [37.7389, -88.5400] },
        "Sangamon": { city: "Springfield", coords: [39.7817, -89.6501] },
        "Schuyler": { city: "Rushville", coords: [40.1218, -90.5634] },
        "Scott": { city: "Winchester", coords: [39.6292, -90.4565] },
        "Shelby": { city: "Shelbyville", coords: [39.4067, -88.7967] },
        "St. Clair": { city: "Belleville", coords: [38.5201, -89.9834] },
        "Stark": { city: "Toulon", coords: [41.0947, -89.8589] },
        "Stephenson": { city: "Freeport", coords: [42.2964, -89.6217] },
        "Tazewell": { city: "Pekin", coords: [40.5675, -89.6407] },
        "Union": { city: "Jonesboro", coords: [37.4537, -89.2704] },
        "Vermilion": { city: "Danville", coords: [40.1245, -87.6300] },
        "Wabash": { city: "Mount Carmel", coords: [38.4131, -87.7614] },
        "Warren": { city: "Monmouth", coords: [40.9120, -90.6475] },
        "Washington": { city: "Nashville", coords: [38.3514, -89.3819] },
        "Wayne": { city: "Fairfield", coords: [38.3784, -88.3595] },
        "White": { city: "Carmi", coords: [38.0903, -88.1660] },
        "Whiteside": { city: "Morrison", coords: [41.8098, -89.9657] },
        "Will": { city: "Joliet", coords: [41.5250, -88.0817] },
        "Williamson": { city: "Marion", coords: [37.7306, -88.9338] },
        "Winnebago": { city: "Rockford", coords: [42.2711, -89.0937] },
        "Woodford": { city: "Eureka", coords: [40.7206, -89.2726] }
        };

    const [selectedItem, setSelectedItem] = useState("Select a County");

    const handleSelect = (county) => {
        const parsedCountyData = JSON.parse(county);
        setSelectedItem(parsedCountyData.county);
        onCountySelect(county);
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedItem}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-scrollable"> 
                {
                    Object.keys(illinoisCountyCoordinates).map(county => (
                        <Dropdown.Item 
                            key={county} 
                            eventKey={JSON.stringify({ county, ...illinoisCountyCoordinates[county] })}
                        >
                        {county}
                        </Dropdown.Item>
                    ))
                
                }
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CountyFilter;
