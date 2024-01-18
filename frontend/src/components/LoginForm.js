import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css

import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card'
import React from "react"
import { useState, useContext } from 'react';

const LoginForm = ({ hideLogin }) => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("useContext(UserContext) is null. Make sure UserContext is properly set up.");
    }

    const { setUser, userID } = userContext;

    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Client side: LoginForm.js

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data);
                const { userID } = data;
                hideLogin();
                //console.log('User data:', data);
                //console.log('userid: ' + userID);
                // Redirect to /chosemembership
                navigate('/chosemembership');
            } else {
                // Set error message from response
                setError(data.message || "An unknown error occurred");
            }
        } catch (error) {
            setError('Network error, please try again later.');
        }
    };



    const handleRegisterClick = () => {
        navigate.push('/register'); // Folosește history.push pentru a naviga
    };
    // Stilurile pentru centrarea containerului

    return (

        <form onSubmit={handleSubmit}>
            <div className="p-fluid" style={{ marginBottom: '20px' }}>
                <div className="p-field">
                    <label htmlFor="username">Username</label>
                    <InputText id="username" name="username" onChange={(e) => setUsername(e.target.value)} />                            </div>
                <div className="p-field">
                    <label htmlFor="password">Password</label>
                    <InputText id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />                            </div>
            </div>

            <div className="register-link" style={{ marginBottom: '20px', textAlign: 'center' }}>
                Don't have an account? <a href="/register" onClick={handleRegisterClick} style={{ color: '#007bff', textDecoration: 'none' }}>Register</a>
            </div>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}  {/* Display error message */}
            <Button type="submit" label="Submit" />
        </form>

    );

}

export default LoginForm;