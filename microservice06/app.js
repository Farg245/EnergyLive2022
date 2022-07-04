const express = require('express');
const app =express()

const cookieParser = require('cookie-parser')
const check =require("./utils/checkAuthenticated")
app.use(express.json());
app.use(cookieParser());

// Middleware
const path = require("path");

app.use(express.static('public'));
app.set("view engine","ejs")

app.listen(7005);

app.get('/',  check.authenticated, (req, res)=>{
    res.render("index")
})


app.get('/extend', check.authenticated, (req, res)=>{
    let extended_by = req.ext_by;
    res.render('extend', {extended_by});
    res.redirect('http://localhost/microservice03/ActualTotalLoad')
})

