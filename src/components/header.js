import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for active styling
import './header.css';

const Header = () => {
    return (
        <div>
            <header className="block-header">
                <NavLink to="/" className="header-title" activeClassName="active-link">
                    AgriVision
                </NavLink>
                <nav className="nav-links">
                    <NavLink to="/about" activeClassName="active-link">
                        About
                    </NavLink>
                </nav>
            </header>
        </div>
    );
};

export default Header;
