import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css

import UserContext from '../UserContext'
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { SERVER } from '../../config/global';


//import primereact components
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';



//form for adding a bug
const BugEditForm = ({ bug, onClose, onUpdate }) => {

    const [editedBug, setEditedBug] = useState({ ...bug });
    const [selectedStatus, setSelectedStatus] = useState(editedBug.status);

    useEffect(() => {
        // Update editedBug state when bug prop changes
        setEditedBug({ ...bug });
    }, [bug]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditedBug((prevBug) => ({ ...prevBug, [name]: value }))
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            //make the put request
            await axios.put(`${SERVER}/bugs/${editedBug.bugID}`, editedBug);

            onUpdate();
            onClose();

            //display message
            window.alert('Bug successfully updated!');
        } catch (error) {
            console.error('Error adding bug:', error);
            window.alert('Error when adding a bug');

        }
    }
    const handleStatusChange = (e) => {
        setSelectedStatus(e.value);
        setEditedBug((prevBug) => ({ ...prevBug, status: e.value }));
    };
    const statusOptions = [
        { label: 'Verified', value: 'Verified' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Implemented', value: 'Implemented' },
        { label: 'Open', value: 'Open' },
    ];
    const priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
    ];


    return (
        <div>

            <form onSubmit={handleUpdate}>

                <div className="p-fluid">

                    <div className="p-field">
                        <label htmlFor="title">Title</label>
                        <InputText id="title" name="title" value={editedBug.title} onChange={handleChange}
                            disabled
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <InputTextarea
                            id="description"
                            name="description"
                            value={editedBug.description}
                            onChange={handleChange}
                            disabled
                        />
                    </div>

                    <div className="p-field">
                        <label>Severity</label>
                        <ToggleButton
                            checked={editedBug.severity}
                            disabled
                        />
                    </div>

                    <div className="p-field">
                        <label>Priority</label>
                        <Dropdown
                            value={editedBug.priority}
                            options={priorityOptions}
                            placeholder="Select Priority"
                            disabled
                        />
                    </div>
                    <div className="p-field">
                        <label>Status</label>
                        <Dropdown
                            value={selectedStatus}
                            options={statusOptions}
                            placeholder="Select Status"
                            onChange={handleStatusChange}
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="commitLink">Commit Link</label>
                        <InputText
                            id="commitLink"
                            name="commitLink"
                            value={editedBug.commitLink}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="assignedToUser">Assign to user</label>
                        <InputText id="assignedToUser" name="assignedToUser" value={editedBug.assignedToUser} onChange={handleChange}

                        />
                    </div>
                </div>

                <Button type="button" label="Update" onClick={handleUpdate} />
                <Button type="button" label="Cancel" onClick={onClose} className="p-button-secondary" />

            </form>
        </div>
    )

}


export default BugEditForm