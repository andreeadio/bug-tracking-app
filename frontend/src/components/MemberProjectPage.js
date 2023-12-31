import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css

import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ListBox } from 'primereact/listbox';
import axios from 'axios';
import { SERVER } from '../config/global';

const MemberProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState('');

 
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
    console.log('Add Project clicked');
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

        <BugDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                onProjectsAdded={() => {
                    setDialogVisible(false);
                    fetchBugs(); // Fetch updated bugs after adding a new bug
                }}
            />

      </div>
    </div>
  );
};

export default MemberProjectPage;