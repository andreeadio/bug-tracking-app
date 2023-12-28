const express = require('express');
const router = express.Router();
const { Teams, Users } = require('../models'); // Adjust the path as needed

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Teams.findAll();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific team by ID
router.get('/:teamId', async (req, res) => {
  const teamId = req.params.teamId;
  try {
    const team = await Teams.findByPk(teamId, {
      include: [{ model: Users, as: 'members' }]
    });
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new team
router.post('/', async (req, res) => {
  const { projectID } = req.body;
  try {
    const newTeam = await Teams.create({ projectID });
    res.json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a team by ID
router.put('/:teamId', async (req, res) => {
  const teamId = req.params.teamId;
  const { projectID } = req.body;
  try {
    const team = await Teams.findByPk(teamId);
    if (team) {
      await team.update({ projectID });
      res.json(team);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a team by ID
router.delete('/:teamId', async (req, res) => {
  const teamId = req.params.teamId;
  try {
    const team = await Teams.findByPk(teamId);
    if (team) {
      await team.destroy();
      res.json({ message: 'Team deleted successfully' });
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;