import React from 'react';
import './mainpage.css';
import logoImage from './main.jpg';


function mainpage() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h1>BROCODE</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      
        <div className="text">
          <h2>Welcome to the Galaxy</h2>
          <p>
            The galaxy is a vast and mysterious place filled with billions
            of stars, planets, and celestial wonders waiting to be explored.
            Whether you're an astronomer or an adventurer, there's always
            something new to discover.
          </p>
        </div>
   <img src={logoImage} className='image'></img>
    </>
  );
}

export default mainpage;
