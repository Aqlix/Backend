const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
var userRouter = require('./routes/user');
var editRouter = require('./routes/edit')
// Mongo DB Connection
mongoose.connect(process.env.MONGO_DB_URL).then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});



app.use(cors())
app.use(express.json())
app.use('/', userRouter);
app.use('/', editRouter);

// Routes


// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})