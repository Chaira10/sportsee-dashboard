import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
    <div className="img-container">
        <img src="/13.png" alt="logo" className="nav-logo"/>
    </div>
    <div className="link-container">
        <ul className="navbar">
            <li className="nav-link">Accueil</li>
            <li className="nav-link">Profil</li>
            <li className="nav-link">Réglage</li>
            <li className="nav-link">Communauté</li>
        </ul>
    </div>
    
    </nav>
  )
}

export default Navbar