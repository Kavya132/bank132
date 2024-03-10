import React, { useState } from 'react';
import axios from 'axios';

const WithdrawlForm = () => {
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
      await axios.post('http://localhost:5000/withdrawl', formData);
      alert('Withdrawl successful');
      // Optionally, you can reset the form fields here
      setFormData({ email: '', money: '' });
    } catch (error) {
      console.error(error);
      alert('Withdrawl failed');
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
          width: 300px;
          margin: 10px auto;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #ffffff; /* White text color */
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
      `}</style>
      <h1>WITHDRAWL</h1>
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
  );
};

export default WithdrawlForm;