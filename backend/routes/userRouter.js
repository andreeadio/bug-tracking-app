const express = require('express');
const router = express.Router();
const { Users } = require('../models'); // Adjust the path as needed
const bcrypt = require('bcryptjs');
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
router.post('/', async (req, res) => {
  const { username, email, role, password } = req.body; // Include username in the destructured assignment
  if (!username || !email || !password) {
    return res.status(400).json('Bad Request');
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ username, email, role, password: hashedPassword });
    const { userID } = newUser;

    //res.json(newUser);
    res.status(200).json({ userID, message: "Register successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Login Handler
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }


    res.status(200).json({ userID: user.userID, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


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