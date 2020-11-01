const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const passport=require('passport')

const app=express()
app.use(bodyParser({limit: '10mb'}));
app.use(bodyParser.json())
app.use(cors())


const updatedb=require('./routes/updatedb')
app.use('/updatedb',updatedb)

const getdics=require('./routes/getdics')
app.use('/getdics',getdics)

const pets=require('./routes/pets')
app.use('/pets',pets)

const photos=require('./routes/photos')
app.use('/photos',photos)

const reports=require('./routes/reports')
app.use('/reports',reports)

const export1=require('./routes/export1')
app.use('/sqlexport',export1)

const publicpets=require('./routes/public/pets')
app.use('/public/api/pets',publicpets)

const enroll=require('./routes/public/meetandhelp')
app.use('/public/api/meetandhelp',enroll)


if (process.env.NODE_ENV==='production') {
    console.log('production')
    app.use(express.static(__dirname+'/public/'));
    //handle SPA
    app.get(/.*/, (req, res)=> {
        console.log('sending index.html')
        res.sendFile(__dirname, +'/public/index.html');
    })
    console.log(__dirname)
}

var port=process.env.PORT || 19999;



app.listen(port,()=> {
    console.log(`Server started on port ${port}`)
});

