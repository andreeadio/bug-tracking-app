import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css


import { useState } from "react";
import axios from "axios";
import { SERVER } from '../../config/global';


//import primereact components
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';



//form for adding a bug
const BugAddForm = ({ onBugAdded }) => {
    const [bug, setBug] = useState(
        //bug details
        {
            title: '',
            description: '',
            severity: false,
            priority: 'Medium',
            commitLink: '',
            //can add more if logic changes      
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target
        setBug((prevBug) => ({ ...prevBug, [name]: value }))
    }

    const handleToggle = () => {
        setBug((prevBug) => ({ ...prevBug, severity: !prevBug.severity }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //make the post request
            await axios.post(`${SERVER}/bugs`, bug);
            // Assuming the API call is successful, reset the form and notify the parent component
            setBug({
                title: '',
                description: '',
                severity: false,
                priority: 'Medium',
                commitLink: '',
            });
            onBugAdded();

            //display message
            window.alert('Bug successfully added!');
        } catch (error) {
            console.error('Error adding bug:', error);
            window.alert('Error when adding a bug');

        }
    }

    const handlePriorityChange = (e) => {
        setBug({ ...bug, priority: e.value });
    };

    const priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
    ];


    //
    return (
        <div>

            <form onSubmit={handleSubmit}>

                <div className="p-fluid">

                    <div className="p-field">
                        <label htmlFor="title">Title</label>
                        <InputText id="title" name="title" value={bug.title} onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <InputTextarea
                            id="description"
                            name="description"
                            value={bug.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="p-field">
                        <label>Severity</label>
                        <ToggleButton
                            checked={bug.severity}
                            onChange={handleToggle}
                        />
                    </div>

                    <div className="p-field">
                        <label>Priority</label>
                        <Dropdown
                            value={bug.priority}
                            options={priorityOptions}
                            onChange={handlePriorityChange}
                            placeholder="Select Priority"
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
                </div>

                <Button type="submit" label="Submit" onClick={handleSubmit} />
            </form>
        </div>
    )

}


export default BugAddForm