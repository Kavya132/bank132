import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        mobile: '',
        role: 'user', // default role, you can change this according to your needs
        password: ''
    });

    const [navigateToLogin, setNavigateToLogin] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', formData);
            console.log(response.data);

            // Set navigateToLogin to true upon successful registration
            setNavigateToLogin(true);
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show error message)
        }
    };

    if (navigateToLogin) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
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

                form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    background-color: #fff;
                    animation: fadeIn 0.5s ease-in-out;
                }

                h2 {
                    margin-bottom: 20px;
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

                input, select {
                    width: 100%;
                    margin-bottom: 20px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 16px;
                    outline: none;
                    transition: border-color 0.3s ease-in-out;
                }

                input:hover, select:hover {
                    border-color: #007bff;
                }

                button {
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

                button:hover {
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
            <form onSubmit={handleSubmit}>
                <h2>BANKING AND FINANCE MANAGEMENT SYSTEM</h2>
                <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                {/* You can include a dropdown or input field for role selection if needed */}
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
