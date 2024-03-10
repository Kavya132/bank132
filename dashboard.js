import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
          padding: 50px;
        }

        h1 {
          color: #ffffff; /* White text color */
          font-size: 36px;
          margin-bottom: 30px;
          animation: fadeIn 4s ease-in-out;
        }

        h1:hover {
          transform: scale(1.05);
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

        .buttons-container {
          display: flex; /* Display children horizontally */
          justify-content: center; /* Center horizontally */
          border: 2px solid #ffffff; /* White border */
          border-radius: 10px; /* Rounded border */
          padding: 20px; /* Add padding inside the border */
        }

        button {
          margin: 10px;
          padding: 10px 20px;
          font-size: 18px;
          border: none;
          border-radius: 5px;
          background-color: #1abc9c; /* Light green button background */
          color: #ffffff; /* White text color */
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s, transform 0.3s;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          outline: none; /* Remove blue outline when clicked */
        }

        button:active {
          background-color: #1abc9c; /* Light green when clicked */
          transform: translateY(0);
          box-shadow: none;
        }
      `}</style>
      <div className="container">
        <h1>Bank and Finance Management System</h1>
        <div className="buttons-container">
          <Link to="/new-account">
            <button>Create Account</button>
          </Link>
          <Link to="/withdrawl">
            <button>Withdraw</button>
          </Link>
          <Link to="/deposit">
            <button>Deposit</button>
          </Link>
          <Link to="/balance">
            <button>Check Balance</button>
          </Link>
          <Link to="/transactions">
            <button>View Transactions</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
