const express = require('express');
const app = express()
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const router = require('./routes/index');

    
mongoose.connect('mongodb://localhost:27017/lc1', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb');
});


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',router)



app.listen(3000, ()=>{
    console.log('listen on port 3000');
    
})