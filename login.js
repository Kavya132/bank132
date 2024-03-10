import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log(response.data.token);
      
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true); // Set login state to true after successful login
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #00bfff, #32cd32);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 100%;
        }

        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .input {
          width: 100%;
          margin-bottom: 20px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease-in-out;
        }

        .input:hover {
          border-color: #007bff;
        }

        .button {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          background-color: #007bff;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          animation: pulse 1s infinite;
        }

        .button:hover {
          background-color: #0056b3;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <h2>BANKING AND FINANCE MANAGEMENT SYSTEM</h2>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" placeholder="Email" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="input" placeholder="Password" />
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
