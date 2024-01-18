const express = require('express')
const router = express.Router()

const { Bugs } = require('../models')
//const { verifyToken } = require('../middleware/authMiddleware');


// POST endpoint for adding a bug
//GET the list of bugs
router.get('/', async (req, res) => {

    try {
        const listOfBugs = await Bugs.findAll();
        res.status(200).json(listOfBugs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
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
        //const reportedByUserID = req.decodedToken.id;

        //validation
        if (!bug || !bug.title || !bug.description) {
            return res.status(400).json({ message: 'Invalid request' })
        }

        //add the new bug to the database
        //await Bugs.create(...bug, reportedByUserID)
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
                bugID: bugId
            }
        })

        return res.status(200).json({ message: 'Bug deleted!' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

// GET bugs reported by a specific user
router.get('/reportedByUser/:reportedByUserID', async (req, res) => {
    const reportedByUserID = req.params.reportedByUserID;

    try {
        const bugsReportedByUser = await Bugs.findAll({
            where: {
                reportedByUserID: reportedByUserID,
            },
        });

        res.status(200).json(bugsReportedByUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.get('/byProject/:projectID', async (req, res) => {
    const projectID = req.params.projectID;

    try {
        const bugsInProject = await Bugs.findAll({
            where: {
                projectID: projectID,
            },
        });

        res.status(200).json(bugsInProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//TODO: PUT

module.exports = router