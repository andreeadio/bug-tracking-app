import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css
import 'primeicons/primeicons.css';

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectList.css'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Carousel } from 'primereact/carousel';
import { InputText } from "primereact/inputtext";
import { ListBox } from 'primereact/listbox';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from 'axios';
import { SERVER } from '../config/global';
import ProjectDialog from './ProjectDialog';

const ProjectListMP = () => {
  const navigate = useNavigate();
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

  const handleProjectClick = (projectId) => {

    navigate(`/tst/bugs/${projectId}`)
  };

  const handleProjectDialogHide = () => {
    setShowProjectDialog(false);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.repositoryLink.toLowerCase().includes(searchText.toLowerCase())
  );

  const projectTemplate = (project) => (
    <Card
      title={project.projectName}
      style={{ width: '90%', margin: '20px 10px 10px 10p', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      onClick={() => handleProjectClick(project.projectID)}
    >
      <div>
        <i className="pi pi-folder" style={{ marginRight: '8px' }}></i>
        <strong>Project Name:</strong> {project.projectName}
      </div>
      <div>
        <strong>Team Name:</strong> {project.teamName}
      </div>

    </Card>
  );

  return (
    <div className="project-page">

      <h2>List of Projects</h2>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-search"></i>
        </span>
        <InputText
          placeholder="Search projects by repository..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="team-member-projects">
        <Carousel
          value={filteredProjects}
          itemTemplate={projectTemplate}
          numVisible={3}
          numScroll={1}
          responsiveOptions={[
            {
              breakpoint: '1024px',
              numVisible: 2,
              numScroll: 1,
            },
            {
              breakpoint: '768px',
              numVisible: 1,
              numScroll: 1,
            },
          ]}
        />
      </div>

    </div>
  );
};

export default ProjectListMP;
