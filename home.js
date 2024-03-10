import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import CSS file

const Home = () => {
  return (
    <div>
      <h1>WELCOME TO BANK AND FINANCE MANAGEMENT SYSTEM</h1>
      <br />
      <br />
      <Link to='/register'>REGISTER</Link>
      <br />
      <Link to='/login'>LOGIN</Link>
    </div>
  );
};

export default Home;