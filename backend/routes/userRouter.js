const express = require('express');
const router = express.Router();
const { Users } = require('../models'); // Adjust the path as needed

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific user by ID
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Users.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new user
// Create a new user
router.post('/', async (req, res) => {
  const { username, email, role, password } = req.body; // Include username in the destructured assignment
  try {
    const newUser = await Users.create({ username, email, role, password }); // Include username when creating a user
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update a user by ID
// Update a user by ID
router.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { username, email, role, password } = req.body; // Include username in the destructured assignment
  try {
    const user = await Users.findByPk(userId);
    if (user) {
      await user.update({ username, email, role, password }); // Include username in the update
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete a user by ID
router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Users.findByPk(userId);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;