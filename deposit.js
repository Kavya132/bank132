import React, { useState } from 'react';
import axios from 'axios';

const DepositForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    money: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/deposit', formData);
      alert('Deposit successful');
      // Optionally, you can reset the form fields here
      setFormData({ email: '', money: '' });
    } catch (error) {
      console.error(error);
      alert('Deposit failed');
    }
  };

  return (
    <div className="container">
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #3498db, #2ecc71); /* Blue-green gradient background */
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          text-align: center;
          padding: 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h1 {
          color: #ffffff; /* White color */
          font-size: 36px;
          margin-bottom: 20px; /* Adjust spacing */
        }

        .form-container {
          width: 300px;
          margin: 10px auto;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }

        .form-container input,
        .form-container button {
          margin: 10px 0;
          padding: 10px;
          width: calc(100% - 20px);
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
          transition: border-color 0.3s;
        }

        .form-container input:focus,
        .form-container button:focus {
          border-color: #007bff;
        }

        .form-container button {
          background-color: #007bff;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .form-container button:hover {
          background-color: #0056b3;
        }
      `}</style>
      <h1>DEPOSIT</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="number"
            name="money"
            value={formData.money}
            onChange={handleChange}
            placeholder="Amount"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DepositForm;