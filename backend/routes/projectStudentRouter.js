const express=require('express')
const router=express.Router()
const {ProjectStudent}=require('../models')//este o instanta a modelului creat de noi 
//comanda pentru a selecta din database informatiile
router.get('/', async ( res) => {
    try {
        const listOfStudentsProjects = await ProjectStudent.findAll();
        res.status(200).json(listOfStudentsProjects); 
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching student projects:', error);

        // Send a 500 Internal Server Error response
        res.status(500).json({ message: 'Error fetching student projects' });
    }
});


//comenzile pentru a insera in database ul nostru infromatii
router.post('/', async (req, res) => {
    const projectStudentData = req.body;
    try {
        const projectStudent = await ProjectStudent.create(projectStudentData);
        res.json(projectStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



module.exports=router;