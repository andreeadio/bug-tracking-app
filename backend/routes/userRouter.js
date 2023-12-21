const express=require('express')
const router=express.Router()
const {Users}=require('../models')

router.get('/', async ( res) => {
    try {
        const usersList= await Users.findAll();
        res.status(200).json(usersList); 
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});


router.post('/', async (req, res) => {
    const UsersData = req.body;
    try {
        const Users = await Users.create(UsersData);
        res.json(Users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports=router;