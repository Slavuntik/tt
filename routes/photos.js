const express = require('express');
const router = express.Router();
const databaseService=require('../utils/databaseService')

console.log("photos end point")



router.get('/', async (req, res) => {
    let petid=req.query["petid"]
    console.log(petid)
    if (petid) {
        res.status(200).send(await databaseService.getPetPhotos(petid))
    }
    else {
        res.status(200).send("no photos")
    }
    
    
})


module.exports = router