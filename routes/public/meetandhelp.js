const express = require('express');
const router = express.Router();
const databaseService=require('../../utils/databaseService')

console.log("PUBLIC FEEDBACK")



router.post('/', async (req, res) => {
    res.status(200).send(await databaseService.meetandhelp(req.body))
})

router.get('/', async (req, res) => {
    res.status(200).send("OK")
})

module.exports = router