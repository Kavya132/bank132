import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const CreateAccountForm = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        aadharnumber: '',
        mobilenumber: '',
        initialBalance: '',
        address: '',
        role: 'user' // Default role
    });
    const [navigateToDash, setNavigateToDash] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/new-account', formData);
            console.log(response.data);
            // Handle success (e.g., show success message)
            setNavigateToDash(true);
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show error message)
        }
    };

    if (navigateToDash) {
        alert('Account created successfully');
        return <Navigate to="/dashboard" />;
    }

    return (
        <div>
            <style>{`
                body {
                    background: linear-gradient(135deg, #3498db, #2ecc71); /* Blue-green gradient background */
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    text-align: center; /* Center align the text */
                }

                h1 {
                    color: #fff; /* White text color */
                }

                .form-container {
                    background-color: #fff; /* White background color */
                    border: 1px solid #ddd; /* Border */
                    border-radius: 10px; /* Rounded border */
                    padding: 20px; /* Add padding inside the border */
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow */
                    width: 400px; /* Adjust form width as needed */
                    margin: 50px auto; /* Center the form horizontally */
                }

                .form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                input[type="text"],
                input[type="email"],
                input[type="number"],
                textarea,
                select,
                button {
                    margin: 10px;
                    padding: 12px;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                    outline: none;
                    width: calc(100% - 24px); /* Adjust input width to fill the container */
                }

                button {
                    background-color: #007bff; /* Blue button background */
                    color: #fff; /* White text color */
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #0056b3; /* Darker blue on hover */
                }

                /* Keyframes animations */
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

                @keyframes slideInRight {
                    0% {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                /* Apply animations to form elements */
                input,
                textarea,
                select,
                button {
                    animation: fadeIn 0.5s ease-in-out, slideInRight 0.5s ease-in-out;
                }

                /* Apply hover effect to form elements */
                input:hover,
                textarea:hover,
                select:hover,
                button:hover {
                    transform: translateY(-2px);
                }
            `}</style>
            <h1>CUSTOMER ACCOUNT OPENING FORM</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="text" name="aadharnumber" value={formData.aadharnumber} onChange={handleChange} placeholder="Aadhar Number" required />
                    <input type="text" name="mobilenumber" value={formData.mobilenumber} onChange={handleChange} placeholder="Mobile Number" required />
                    <input type="number" name="initialBalance" value={formData.initialBalance} onChange={handleChange} placeholder="Initial Balance" required />
                    <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccountForm;