import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css
import { Button } from 'primereact/button'
import { Tag } from "primereact/tag"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import axios from 'axios'
//import './BugList.css'; // Import the CSS file
import { SERVER } from '../../config/global'
//import AddBugForm from '../Bug/Bug';

import BugAddForm from "./BugAddForm"
import BugDialog from "./BugDialog"
import BugDataTable from "./BugDataTable"


const BugList = () => {
    const { projectID } = useParams();
    const [bugs, setBugs] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);

    // Fetch the list of bugs from your server
    const fetchBugs = async () => {
        try {
            const response = await axios.get(`${SERVER}/bugs/byProject/${projectID}`);
            setBugs(response.data);
        } catch (error) {
            console.error('Error fetching bugs:', error);
        }
    };

    useEffect(() => {
        fetchBugs();
    }, [projectID]); // Empty dependency array ensures that this effect runs once on component mount

    const handleDeleteBug = async (bugID) => {

        try {
            //make the post request
            await axios.delete(`${SERVER}/bugs/${bugID}`);
            setBugs(bugs.filter((bug) => bug.bugID !== bugID));

            //display message
            window.alert('Bug successfully deleted!');
        } catch (error) {
            console.error('Error: cannot delete bug', error);
            window.alert('Error: cannot delete bug');

        }
    }

    const statusBodyTemplate = (bug) => {
        return <Tag value={bug.status} severity={getSeverity(bug)}></Tag>;
    };
    const getSeverity = (bug) => {
        switch (bug.status) {
            case 'Verified':
                return 'success';

            case 'In Progress':
                return 'warning';

            case 'Implemented':
                return 'info';

            case 'Open':
                return 'danger';
            default:
                return null;
        }
    };

    return (
        <div className="bug-list-container" style={{ padding: "80px", display: 'grid' }}>
            <h1>Project Dashboard</h1>


            <Button label="Add New Bug" onClick={() => setDialogVisible(true)} style={{ marginBottom: "10px" }} />

            <BugDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                onBugAdded={() => {
                    setDialogVisible(false);
                    fetchBugs(); // Fetch updated bugs after adding a new bug
                }}
                projectID={projectID}
            />

            <BugDataTable bugs={bugs} onDelete={handleDeleteBug} statusBodyTemplate={statusBodyTemplate} hideActionsColumn={true} />
        </div>
    );
};

export default BugList;
