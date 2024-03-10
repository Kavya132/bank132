import React, { useState } from 'react';
import axios from 'axios';

const TransactionsForm = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [transactions, setTransactions] = useState([]); // State to hold the fetched transactions

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/transactions', formData);
      // Update state with the fetched transactions
      setTransactions(response.data);
      alert('Transactions fetched successfully');
      // Optionally, you can reset the form fields here
      setFormData({ email: '' });
    } catch (error) {
      console.error(error);
      alert('Fetching transactions failed');
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

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }

        li {
          border: 1px solid white;
          border-radius: 10px;
          padding: 10px;
          margin-bottom: 10px;
        }

        p {
          margin: 0;
          color: black;
        }
      `}</style>
      <h1>TRANSACTIONS</h1>
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
      {transactions.length > 0 && (
        <div>
          <h2>Transactions:</h2>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                <p>Amount: {transaction.amount}</p>
                <p>Date: {transaction.time}</p>
                <p>Transaction ID: {transaction.transactionId}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionsForm;