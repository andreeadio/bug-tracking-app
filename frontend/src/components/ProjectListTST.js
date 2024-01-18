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

const ProjectListTST = () => {

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
      <div className="team-member-projects">
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
              <Link to={`/tst/bugs/${project.projectID}`}>
                <div>{project.repositoryLink}</div>
              </Link>
            )}
          />
        </Card>
      </div>

    </div>
  );
};

export default ProjectListTST;
