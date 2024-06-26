
const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../config/const.js');


// Common token verification function
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json('Authorization header not provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json('No token provided');
    }

    jwt.verify(token, JWT_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(401).json('Invalid token');
        }
        req.decodedToken = decodedToken;
        next();
    });
};

// Verify if the token belongs to a team member ('MP')
const verifyTeamMember = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.decodedToken.role === 'MP') {
            next();
        } else {
            return res.status(403).json('Forbidden: Only team members are allowed');
        }
    });
};

// Verify if the token belongs to a tester ('TST')
const verifyTester = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.decodedToken.role === 'TST') {
            next();
        } else {
            return res.status(403).json('Forbidden: Only testers are allowed');
        }
    });
};

module.exports = {
    verifyToken,
    verifyTeamMember,
    verifyTester,
};