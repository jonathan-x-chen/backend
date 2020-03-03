const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const mongoService = require('./mongodbHandler.js');

server.use(express.json());
server.post('/signUp',function(req,res){
    var user = {
        "email":req.body.email,
        "password":req.body.password
    }
    mongoService.insertAnUser(user,res)
});

server.get('/getAllUser',function(req,res){
    mongoService.getAllUser(res);
});

server.get('/login',function(req,res){
    res.sendFile("../HtmlFile/loginPage.html");
})





server.listen(4547);