const express = require('express');
const router = express.Router();
const databaseService=require('../utils/databaseService')
const readXlsxFile = require('read-excel-file/node');
const { __esModule } = require('read-excel-file/commonjs/readXlsxFileNode');

console.log("excel importer")



router.get('/', async (req, res) => {
    let result=null
    await readXlsxFile(__dirname+'/import/DataSet.xlsx').then(async (data)=> {
        console.log("imported: "+data.length+" rows")
        console.log("updating...")
        result=await databaseService.updateSourceData(data)

    }).catch(err=> {
        console.log(err)
    })
    res.status(200).send(result)
    

})


module.exports = router