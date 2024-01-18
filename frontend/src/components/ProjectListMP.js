import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css


import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectList.css'
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Card } from 'primereact/card';
import { ListBox } from 'primereact/listbox';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from 'axios';
import { SERVER } from '../config/global';
import ProjectDialog from './ProjectDialog';

const ProjectListMP = () => {

  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showProjectDialog, setShowProjectDialog] = useState(false);


  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${SERVER}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = () => {

    setShowProjectDialog(true);
  };

  const handleProjectDialogHide = () => {

    setShowProjectDialog(false);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.repositoryLink.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="project-page">
      <div className="team-member-projects" >
        <Card>
          <h2>List of Projects</h2>
          <InputText
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by Repository Link"
          />
          <ListBox
            options={filteredProjects}
            optionLabel="repositoryLink"
            filter
            filterPlaceholder="Search projects..."
            itemTemplate={(project) => (
              // Use Link to navigate to /bugs when an item is clicked
              <Link to={`/mp/bugs/${project.projectID}`}>
                <div>{project.repositoryLink}</div>
              </Link>
            )}
          />
        </Card>
      </div>

      <div className="add-project-button">
        <Button label="Add New Project" icon="pi pi-plus" onClick={handleAddProject} />
        <ProjectDialog visible={showProjectDialog} onHide={handleProjectDialogHide} onProjectAdded={fetchProjects} />
      </div>



    </div>
  );
};

export default ProjectListMP;

/* <div className="datatable-responsive">
        <DataTable value={projects}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}>
          <Column field="projectName" header="Project Name" sortable />
          <Column field="teamName" header="Team Name" />

          <Column
            header="Actions"
            body={(rowData) => (
              <div>
               
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-success"

                />
              </div>
            )}
          />
        </DataTable>
      </div> 
    */