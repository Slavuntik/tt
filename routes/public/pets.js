const express = require('express');
const router = express.Router();
const databaseService=require('../../utils/databaseService')

console.log("PUBLIC PETS")



router.get('/', async (req, res) => {
    res.status(200).send(await databaseService.getAllPublicPets(req.query))
})


module.exports = router