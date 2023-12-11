const express = require("express");
const app = express();
require('dotenv').config();
require('./connection/connection')
const auth = require('./routes/auth');
const todoList = require('./routes/todoList');
const cors = require('cors');
const contact = require("./routes/contact");
const path = require('path');

app.use(express.json());
app.use(cors())

const port = process.env.PORT || 5000;

app.use("/api/v1", auth);
app.use("/api/v2", todoList);
app.use("/api/v3", contact)

//static files
app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('*', function(req, res){
    res.sendFile(__dirname, './frontend/build/index.html')
})

app.get('/', (req,res)=>{
    res.send("Hello")
})


app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`)
})