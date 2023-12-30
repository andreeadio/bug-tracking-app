import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css

import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ListBox } from 'primereact/listbox';
import axios from 'axios';
import { SERVER } from '../config/global';

const TesterProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${SERVER}/projectsTester`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div className="tester-project-page">
      {/* Project List */}
      <div className="project-list">
        <Card>
          <h2>All Projects</h2>
          <ListBox
            options={projects}
            optionLabel="name"
            filter
            filterPlaceholder="Search projects..."
            itemTemplate={(project) => <div>{project.name}</div>}
          />
        </Card>
      </div>

      {/* Additional Tester Features */}
      {/* Add any additional features specific to the tester here */}

    </div>
  );
};

export default TesterProjectPage;