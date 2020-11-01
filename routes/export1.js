
const express = require('express');
const router = express.Router();
const databaseService=require('../utils/databaseService')
const excel = require('node-excel-export');

console.log("excel export")



router.get('/', async (req, res) => {
      //выгрузка структуры данных
      res.setHeader('Content-Disposition', 'attachment; filename=Schema.sql');
      let sql=await databaseService.getSQLSchema()
  console.log(sql)
      res.send(Buffer.from(sql,'utf-8'));
})



module.exports = router