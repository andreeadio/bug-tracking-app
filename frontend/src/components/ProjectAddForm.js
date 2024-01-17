// import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
// import "primereact/resources/primereact.min.css" //core css


// import { useState } from "react";
// import axios from "axios";
// import { SERVER } from '../config/global';


// //import primereact components
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';

// const ProjectAddForm = ({ onProjectAdded }) => {
//     const [project, setProjects] = useState(
//         {
//             link: '',
//             teamID: '',
//             //can add more if logic changes      
//         }
//     )

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             //make the post request
//             await axios.post(`${SERVER}/projects`, project);
//             // Assuming the API call is successful, reset the form and notify the parent component
//             setProjects({
//                 link: '',
//                 teamID: ''
//             });
//             onProjectAdded();

//             //display message
//             window.alert('Project successfully added!');
//         } catch (error) {
//             console.error('Error adding project:', error);
//             window.alert('Error when adding a project');

//         }
//     }

//     return (
//         <div>

//             <form onSubmit={handleSubmit}>

//                 <div className="p-fluid">

//                     <div className="p-field">
//                         <label htmlFor="link">Link</label>
//                         <InputText id="link" name="link" value={project.link}
//                             required
//                         />
//                     </div>

//                     <div className="p-field">
//                         <label htmlFor="teamID">Team</label>
//                         <InputText
//                             id="teamID" name="teamID" value={project.teamID}
//                             required
//                         />
//                     </div>   
//                 </div>

//                 <Button type="submit" label="Submit" onClick={handleSubmit} />
//             </form>
//         </div>
//     )

// }

// export default ProjectAddForm

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
        link: '',
        teamID: '',
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
                link: '',
                teamID: '',
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
                        <label htmlFor="link">Link</label>
                        <InputText
                            id="link"
                            name="link"
                            value={project.link}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="teamID">Team</label>
                        <InputText
                            id="teamID"
                            name="teamID"
                            value={project.teamID}
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
