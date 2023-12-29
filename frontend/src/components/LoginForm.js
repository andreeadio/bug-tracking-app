import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css

import './LoginForm.css'
import {  useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card'
import React from "react"

const LoginForm = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        //TODO: Handle form submission logic here
    }
    const handleRegisterClick = () => {
        navigate.push('/register'); // Folosește history.push pentru a naviga
    };
    // Stilurile pentru centrarea containerului
    const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#20232a',
    };

    const cardStyle = {
        backgroundColor: '#fff', // Culoarea de fundal pentru card
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Umbră pentru efect de "plutire"
        width: '100%', // Latimea cardului
        maxWidth: '400px', // Latimea maxima a cardului
        margin: 'auto', // Asigură că cardul este centrat în containerul flex
        position: 'absolute', // Poziționare absolută pentru centrare exactă
        top: '50%', // Centrat vertical
        left: '50%', // Centrat orizontal
        transform: 'translate(-50%, -50%)', // Ajustează poziționarea cardului pentru centrare exactă
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    return (
        <div style={centerStyle}>
            <div className="login-container" style={cardStyle}>
                <Card title='Login' className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="p-fluid" style={{ marginBottom: '20px' }}>
                            <div className="p-field">
                                <label htmlFor="username">Username</label>
                                <InputText id="username" name="username" />
                            </div>
                            <div className="p-field">
                                <label htmlFor="password">Password</label>
                                <InputText id="password" name="password" type="password" />
                            </div>
                        </div>

                        <div className="register-link" style={{ marginBottom: '20px', textAlign: 'center' }}>
                            Don't have an account? <a href="/register" onClick={handleRegisterClick} style={{ color: '#007bff', textDecoration: 'none' }}>Register</a>
                        </div>

                        <Button type="submit" label="Submit" />
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default LoginForm;