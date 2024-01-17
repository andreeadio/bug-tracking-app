import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChoseMembership = () => {
    const navigate = useNavigate();

    const handleProjectMemberClick = () => {
        navigate('/projectsMember');
    };

    const handleTesterMemberClick = () => {
        navigate('/projectsTester');
    };
    return (
        <div className="buttons-container">
            <button className="styled-button"onClick={handleProjectMemberClick}>Project Member</button>
            <button className="styled-button" onClick={handleTesterMemberClick}>Tester Member</button>
        </div>
    );
};

export default ChoseMembership;
