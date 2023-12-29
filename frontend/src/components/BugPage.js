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
import BugDataTable from "./BugDataTable"


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
            <h1>Project Dashboard</h1>

            <Button label="Add New Bug" onClick={() => setDialogVisible(true)} />

            <BugDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                onBugAdded={() => {
                    setDialogVisible(false);
                    fetchBugs(); // Fetch updated bugs after adding a new bug
                }}
            />

            <BugDataTable bugs={bugs} />


        </div>
    );
};

export default BugList;
