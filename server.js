const express = require('express')
const Data = require('./routes/GetData')
const cors = require('cors')
const path = require('path')
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 8888
var app = express()
var jsonParser = bodyParser.json()
app.use(cors())
console.log("hellow")
app.use(express.static('./client/build'));
app.use('/api',jsonParser,Data)
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
});

app.listen(PORT)

