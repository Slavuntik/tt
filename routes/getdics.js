const express = require('express');
const router = express.Router();
const databaseService=require('../utils/databaseService')
const readXlsxFile = require('read-excel-file/node');
const { __esModule } = require('read-excel-file/commonjs/readXlsxFileNode');

console.log("get dics")



router.get('/', async (req, res) => {

    let dicName=req.query["header"].split(",")[0].toUpperCase()
    
    res.status(200).send(await databaseService.getDic(dicName))

})

router.post('/',async (req,res)=> {
    if (req.body) {
        let result=false
        if ((req.body.dicname)&&(req.body.value)) {
            result=await databaseService.addValue(req.body.dicname,req.body.value)
        }
        res.status(200).send(result)
    }
    else {
        res.status(401).send("nothing to add")
    }
})


module.exports = router