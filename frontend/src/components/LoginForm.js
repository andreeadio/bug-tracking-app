import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css

import './LoginForm.css'

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card'
import React from "react"

const LoginForm = () => {

    //TODO: functions to handle submit etc

    const handleSubmit = async (e) => {
        //TODO
    }


    return (
        <div className="login-container">
            <Card title='Login' className="card">
                <form>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="username">username</label>
                            <InputText id="username" name="username" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="password">password</label>
                            <InputText id="password" name="password" />
                        </div>
                    </div>
                    <Button type="submit" label="Submit" onClick={handleSubmit} />
                </form>
            </Card>
        </div>



    )
}

export default LoginForm