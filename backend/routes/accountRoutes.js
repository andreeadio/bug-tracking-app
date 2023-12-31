//import bcrypt from 'bcrypt';
//import express from 'express';
// import jwt from 'jsonwebtoken';
// import { JWT_KEY } from '../config/const.js';
// import { Users } from '../models/Users.js'; // Adjust based on your actual Users model path and name
// import { createUser, getUserByEmailAndCheckPassword } from '../models/user.js'; // Ensure these functions exist and are imported correctly
const express = require('express');
const router = express.Router();
const { Users } = require('../models'); // Ajustează calea după caz
const JWT_KEY = "MySuperSecretKey12345!@#$%^&*()"; 
const bcrypt = require('bcryptjs');
const accountRoutes = express.Router();

// Team Member login route
accountRoutes.route('/team-member/login').post(async (req, res) => {
	return await loginHandler(req, res, 'MP');
});

// Tester login route
accountRoutes.route('/tester/login').post(async (req, res) => {
	return await loginHandler(req, res, 'TST');
});

// Team Member register route
accountRoutes.route('/team-member/register').post(async (req, res) => {
	return await registerHandler(req, res, 'MP');
});

// Tester register route
accountRoutes.route('/tester/register').post(async (req, res) => {
	return await registerHandler(req, res, 'TST');
});

// Token validation route remains the same
accountRoutes.route('/validate-token').post(async (req, res) => {
	// Your existing validation logic here
});

// Helper functions
async function getUserByEmail(email) {
    try {
        const user = await Users.findOne({ where: { email: email } });
        return user;
    } catch (e) {
        throw e;
    }
}

async function createUser({ username, email, password, role = 'BASIC' }) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
        const newUser = await Users.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        return newUser;
    } catch (e) {
        throw e;
    }
}

// Generate JWT Token
function generateToken(user) {
    return jwt.sign(
        {
            userId: user.userID,
            role: user.role,
            email: user.email,
        },
        JWT_KEY,
        {
            expiresIn: '24h',
        }
    );
}

// Login Handler
router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json('Bad Request');

    try {
        const user = await getUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return res.status(200).json({ user: user, token: generateToken(user) });
        } else {
            return res.status(403).json('Unauthorized or Invalid Credentials');
        }
    } catch (e) {
        return res.status(500).json(e.message);
    }
});

// Register Handler
router.post('/register', async (req, res) => {
    let { username, email, password, repeatPassword } = req.body;

    // Basic validation
    if (!username || !email || !password || password !== repeatPassword) {
        return res.status(400).json('Bad Request');
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.status(409).json('User already exists');

        const newUser = await createUser({ username, email, password });
        return res.status(201).json(newUser);
    } catch (e) {
        return res.status(500).json(e.message);
    }
});
module.exports=accountRoutes;