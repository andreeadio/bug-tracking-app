import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.repeatPassword) {
            alert("Passwords don't match!");
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password, // În practică, ar trebui hashuită în backend
                    // Nu trimite 'repeatPassword', nu este necesar pentru backend
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User registered:', data);
                navigate('/chosemembership');
            } else {
                setError(data.message || "Failed to register");
            }
        } catch (error) {
            setError("Failed to connect to the server");
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="register-container">
            <h2 className="form-title">Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-field">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Afișează mesajele de eroare aici */}
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
