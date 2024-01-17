import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css

import React, { useState, useEffect } from 'react';
//import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ListBox } from 'primereact/listbox';
import axios from 'axios';
import { SERVER } from '../config/global';
import ProjectDialog from './ProjectDialog';

const MemberProjectPage = () => {
  const [projects, setProjects] = useState([]);
  //const [searchText, setSearchText] = useState('');
  const [showProjectDialog, setShowProjectDialog] = useState(false);

 
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${SERVER}/projectsMember`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = () => {
    // Add logic for adding a new project (e.g., show a modal, navigate to a new page)
    setShowProjectDialog(true);
  };

  const handleProjectDialogHide = () => {
    // This function is called when the ProjectDialog is closed or hidden
    setShowProjectDialog(false);
  };

  return (
    <div className="project-page">
      <div className="team-member-projects">
        <Card>
          <h2>Team Member Projects</h2>
          <ListBox
            options={projects}
            optionLabel="name"
            filter
            filterPlaceholder="Search projects..."
            itemTemplate={(project) => <div>{project.name}</div>}
          />
        </Card>
      </div>

      <div className="add-project-button">
        <Button label="Add New Project" icon="pi pi-plus" onClick={handleAddProject} />

        {/* Render the ProjectDialog conditionally based on showProjectDialog state */}
      <ProjectDialog visible={showProjectDialog}  onHide={handleProjectDialogHide} onProjectAdded={fetchProjects} />

      </div>
    </div>
  );
};

export default MemberProjectPage;