const express = require('express');
const app =express()
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser')
const check =require("./utils/checkAuthenticated")
const cors = require("cors");

const User = require("./models/User_Model.js");

app.use(express.json());
app.use(cookieParser());

// Middleware
const path = require("path");

app.use(express.static('public'));
app.set("view engine","ejs")

connectDB();

app.listen(7005);

app.get('/',  check.authenticated, async (req, res)=>{
    const email = dieuth
    console.log(email)
    const lol = await User.find({});
    const test = lol.filter((user_info)=>email===user_info.Email)
    //const user_info = await User.find({"Email": {email} }, "FirstName LastName LastLogin DaysLeft -_id");

    console.log(test)
    // const lname = req.query.LastName;
    // const fname = req.query.FirstName;
    // const lastlog = req.query.LastLogin;
    // const dleft = req.query.DaysLeft;

    var fname = test['FirstName'];
    var lname = test['LaststName'];
    var lastlog = test['LastLogin'];
    var dleft = test['DaysLeft'];
    console.log(fname)
    console.log(lname)
    console.log(lastlog)
    console.log(dleft)

    res.render("index",{fname: fname, lname: lname, email: dieuth, lastlog: lastlog, dleft: dleft})
    //res.send("Hello")
})


app.get('/extend', check.authenticated, (req, res)=>{
    let extended_by = req.ext_by;
    res.render('extend', {extended_by});
    res.redirect('http://localhost/microservice03/ActualTotalLoad')
})

