import React from 'react';
import { Button } from 'primereact/button';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog';
import LoginForm from './LoginForm';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const navigate = useNavigate();
    const showLogin = () => {
        setShowLoginDialog(true);
    };

    const hideLogin = () => {
        setShowLoginDialog(false);
    };

    const handleRegisterClick = () => {
        navigate.push('/register'); // Folosește history.push pentru a naviga
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to BugTrack!</h1>
                <p>Managing and tracking software issues has never been easier.</p>
                <p>Bug Tracker Pro is your go-to solution for efficient bug tracking and project management.</p>

                <div className="login-buttons">
                    <Button label="Login" icon="pi pi-user" onClick={showLogin} />

                </div>

                <p>Not a member yet? <a href="/register" onClick={handleRegisterClick} style={{ color: '#007bff', textDecoration: 'none' }}>Sign up here</a></p>

                <Dialog header="Login" visible={showLoginDialog} style={{ width: '50vw' }} onHide={hideLogin}>
                    <LoginForm hideLogin={hideLogin} />
                </Dialog>
            </header>
        </div >
    );
}

export default App;
