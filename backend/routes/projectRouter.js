const express = require('express');
const router = express.Router();
const { Projects, Teams } = require('../models'); // Adjust the path as needed

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.findAll();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific project by ID
router.get('/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Projects.findByPk(projectId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new project
router.post('/', async (req, res) => {
  const { projectName, repositoryLink, teamName } = req.body;
  try {
    const newProject = await Projects.create({ projectName, repositoryLink, teamName });
    res.json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a project by ID
router.put('/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  const { repositoryLink, teamID } = req.body;
  try {
    const project = await Projects.findByPk(projectId);
    if (project) {
      await project.update({ projectName, repositoryLink, teamName });
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a project by ID
router.delete('/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Projects.findByPk(projectId);
    if (project) {
      await project.destroy();
      res.json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;