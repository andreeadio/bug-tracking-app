import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css
import { Button } from 'primereact/button'

import { useState, useEffect } from 'react'
import axios from 'axios'
//import './BugList.css'; // Import the CSS file
import { SERVER } from '../config/global'
//import AddBugForm from '../Bug/Bug';

import BugAddForm from "./BugAddForm"
import BugDialog from "./BugDialog"


const BugList = () => {
    const [bugs, setBugs] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);

    // Fetch the list of bugs from your server
    const fetchBugs = async () => {
        try {
            const response = await axios.get(`${SERVER}/bugs`);
            setBugs(response.data);
        } catch (error) {
            console.error('Error fetching bugs:', error);
        }
    };

    useEffect(() => {


        fetchBugs();
    }, []); // Empty dependency array ensures that this effect runs once on component mount

    // Organize bugs by status
    const bugsByStatus = bugs.reduce((acc, bug) => {
        acc[bug.status] = acc[bug.status] || [];
        acc[bug.status].push(bug);
        return acc;
    }, {});

    return (
        <div className="bug-list-container" style={{ padding: "80px", display: 'grid' }}>
            <h1>Bug List</h1>


            <Button label="Add New Bug" onClick={() => setDialogVisible(true)} />


            <BugDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                onBugAdded={() => {
                    setDialogVisible(false);
                    fetchBugs(); // Fetch updated bugs after adding a new bug
                }}
            />


            {Object.keys(bugsByStatus).map((status) => (
                <div key={status} className={`status-card ${status.toLowerCase()}-card`}>
                    <h2>{status}</h2>
                    <ul>
                        {bugsByStatus[status].map((bug) => (
                            <li
                                key={bug.bugID}
                                className={`bug-card ${bug.severity ? 'severity-true' : ''}`}
                            >
                                <strong className="bug-title">{bug.title}</strong>
                                <p className="bug-description">{bug.description}</p>
                                <p>Severity: {bug.severity ? 'High' : 'Low'}</p>
                                <p>Priority: {bug.priority}</p>
                                {/* Add more bug details as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default BugList;
