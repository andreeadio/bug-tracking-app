import express from 'express'

const router = express.Router()

//get the list of bugs
router.get('/bugs', (req, res) => {

    res.status(200).json(res.app.locals.bugs)
})
export default router