const express = require('express');
const router = express.Router();
const databaseService=require('../utils/databaseService')

console.log("pets end point")



router.get('/', async (req, res) => {

    
    res.status(200).send(await databaseService.getAllPets())
    
})


module.exports = router