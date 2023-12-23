const express = require('express')
const router = express.Router()

const { Bugs } = require('../models')

//GET the list of bugs
router.get('/', async (req, res) => {

    //res.send("List of Bugs!")
    const listOfBugs = await Bugs.findAll()
    res.status(200).json(listOfBugs)
})

//GET http://localhost:8080/bugs/1
router.get('/:id', async (req, res) => {
    const bugId = req.params.id
    try {
        const bug = await Bugs.findByPk(bugId)
        if (!bug) {
            return res.status(404).json({ message: 'Bug not found' })
        }
        return res.status(200).json(bug)

        //TODO: sorting 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
});

//POST
router.post('/', async (req, res) => {
    try {
        const bug = req.body
        //validation
        if (!bug || !bug.title || !bug.description) {
            return res.status(400).json({ message: 'Invalid request' })
        }

        //add the new bug to the database
        await Bugs.create(bug)
        res.status(201).json({ message: 'Bug created!' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }

})

//DELETE
router.delete('/:id', async (req, res) => {
    const bugId = req.params.id
    try {
        const existingBug = await Bugs.findByPk(bugId)
        if (!existingBug) {
            return res.status(404).json({ message: 'Bug not found' })
        }

        //deleting the bug from the database
        await Bugs.destroy({
            where: {
                id: bugId
            }
        })

        return res.status(200).json({ message: 'Bug deleted!' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

//TODO: PUT
module.exports = router