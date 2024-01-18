import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const ChoseMembership = () => {
    const navigate = useNavigate();

    const handleProjectMemberClick = () => {
        navigate(`/mp/listProjects`);
    };

    const handleTesterMemberClick = () => {
        navigate(`/tst/listProjects`);
    };

    const cardStyle = {
        margin: '10px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };
    return (
        <div className="p-flex-row p-justify-center">

            <h3> Choose one option</h3>
            <Card style={cardStyle}>
                <h1>Enter as Project Member</h1>
                <Button className="styled-button" onClick={handleProjectMemberClick}>
                    Project Member
                </Button>
            </Card>


            <Card style={cardStyle}>
                <h1>Enter as Tester Member</h1>
                <Button className="styled-button" onClick={handleTesterMemberClick}>
                    Tester Member
                </Button>
            </Card>

        </div>
    );
};

export default ChoseMembership;

/* <div className="buttons-container">
            <button className="styled-button"onClick={handleProjectMemberClick}>Project Member</button>
            <button className="styled-button" onClick={handleTesterMemberClick}>Tester Member</button>
        </div> */