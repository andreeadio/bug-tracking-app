import "primereact/resources/themes/lara-dark-pink/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css

import { useState } from "react";
import axios from "axios";
import { SERVER } from '../config/global';

// import primereact components
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const ProjectAddForm = ({ onProjectAdded }) => {
    const [project, setProject] = useState({
        projectName: '',
        repositoryLink: '',
        teamName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prevProject) => ({ ...prevProject, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // make the post request
            await axios.post(`${SERVER}/projects`, project);
            // Assuming the API call is successful, reset the form and notify the parent component
            setProject({
                projectName: '',
                repositoryLink: '',
                teamName: '',
            });
            onProjectAdded();

            // display message
            window.alert('Project successfully added!');
        } catch (error) {
            console.error('Error adding project:', error);
            window.alert('Error when adding a project');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="projectName">Project Name</label>
                        <InputText
                            id="projectName"
                            name="projectName"
                            value={project.projectName}
                            onChange={handleChange}
                            require
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="repositoryLink">Repository Link</label>
                        <InputText
                            id="repositoryLink"
                            name="repositoryLink"
                            value={project.repositoryLink}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="teamName">Team Name</label>
                        <InputText
                            id="teamName"
                            name="teamName"
                            value={project.teamName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <Button type="submit" label="Submit" />
            </form>
        </div>
    );
};

export default ProjectAddForm;
