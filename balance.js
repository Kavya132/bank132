import React, { useState } from 'react';
import axios from 'axios';

const BalanceForm = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [balance, setBalance] = useState(null); // State to hold the fetched balance

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/balance', formData);
      // Update state with the fetched balance
      setBalance(response.data);
      alert('Balance fetched successfully');
      // Optionally, you can reset the form fields here
      setFormData({ email: '' });
    } catch (error) {
      console.error(error);
      alert('Fetching balance failed');
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

        form {
          margin-bottom: 20px;
        }

        input,
        button {
          margin: 10px 0;
          padding: 10px;
          width: calc(100% - 20px);
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
          transition: border-color 0.3s;
        }

        input:focus,
        button:focus {
          border-color: #007bff;
        }

        button {
          background-color: #007bff;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #0056b3;
        }

        h2 {
          margin-bottom: 10px;
          color: #333;
        }

        p {
          color:yello;
          border:3px double white;
          display: inline-block;
          font-size: 34px
        }
      `}</style>
      <h1>  check balance</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {balance !== null && (
        <div>
          <h2>Balance:</h2>
          <p>{balance}</p>
        </div>
      )}
    </div>
  );
};

export default BalanceForm;