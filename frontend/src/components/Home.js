import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>YouTube Clone</h1>
      <div className="button-container">
        <Link to="/login"><button className="btn">Login</button></Link>
        <Link to="/signup"><button className="btn">Signup</button></Link>
      </div>
    </div>
  );
};

export default Home;