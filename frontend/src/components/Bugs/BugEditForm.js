import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css

import UserContext from '../UserContext'
import { useState, useContext } from "react";
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



    const handleChange = (e) => {
        const { name, value } = e.target
        setBug((prevBug) => ({ ...prevBug, [name]: value }))
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

    const priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
    ];


    return (
        <div>

            <form onSubmit={handleSubmit}>

                <div className="p-fluid">

                    <div className="p-field">
                        <label htmlFor="title">Title</label>
                        <InputText id="title" name="title" value={bug.title} onChange={handleChange}
                            disabled
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <InputTextarea
                            id="description"
                            name="description"
                            value={bug.description}
                            onChange={handleChange}
                            disabled
                        />
                    </div>

                    <div className="p-field">
                        <label>Severity</label>
                        <ToggleButton
                            checked={bug.severity}
                            disabled
                        />
                    </div>

                    <div className="p-field">
                        <label>Priority</label>
                        <Dropdown
                            value={bug.priority}
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
                            value={bug.commitLink}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="assignedToUser">Title</label>
                        <InputText id="assignedToUser" name="assignedToUser" value={bug.assignedToUser} onChange={handleChange}
                            disabled
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