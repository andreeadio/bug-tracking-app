//import bcrypt from 'bcrypt';
//import express from 'express';
// import jwt from 'jsonwebtoken';
// import { JWT_KEY } from '../config/const.js';
// import { Users } from '../models/Users.js'; // Adjust based on your actual Users model path and name
// import { createUser, getUserByEmailAndCheckPassword } from '../models/user.js'; // Ensure these functions exist and are imported correctly
const express = require('express');
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

async function loginHandler(req, res, role) {
	let { email, password } = req.body;

	if (!email || !password) return res.status(400).json('Bad Request');

	try {
		const user = await getUserByEmailAndCheckPassword(Users, email, password);
		if (user && user.role === role) { // ensure role matches
			return res.status(200).json({ user: user, token: generateToken(user) });
		} else {
			return res.status(403).json('Unauthorized role');
		}
	} catch (e) {
		console.warn(e.stack);
		return res.status(500).json(e.message);
	}
}

async function registerHandler(req, res, role) {
	let { name, email, password, repeatPassword } = req.body;

	// Registration validation logic here

	try {
		const user = await createUser(Users, { name, email, password, role }); // ensure createUser can handle the role
		return res.status(201).json(user);
	} catch (e) {
		return res.status(500).json(e.message);
	}
}

function generateToken(user) {
	return jwt.sign(
		{
			userId: user.userID,
			role: user.role, // 'MP' or 'TST'
			email: user.email,
			name: user.name, // Assuming 'name' is part of user model
		},
		JWT_KEY,
		{
			expiresIn: '24h',
		}
	);
} 

module.exports=accountRoutes;
