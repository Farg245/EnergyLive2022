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


app.get('/', check.authenticated, async (req, res)=>{
     
    //const email = "dejah.will@hotmail.com"
    //const email = req.query.email;
    let user = req.user
    const email = user.email;
    //console.log(email)
    //const allMails = await User.find({}, "Email")
    //console.log(allMails)
    if (typeof email === "undefined") {
        const allMails = await User.find({}, "Email")
        res.render("index", {allMails: allMails})
    }
    if (typeof email !== "undefined"){
        
        const lol = await User.find({});
        const test_util = lol.filter((user_info)=>email===user_info.Email)
        //const test_util = await User.find({"Email": {email} }, "FirstName LastName LastLogin DaysLeft -_id");

        //console.log(test_util)
        test = test_util[0]
        //console.log(test)

        var fname = test['FirstName'];
        var lname = test['LastName'];
        var lastlog = test['LastLogin'];
        var dleft = test['DaysLeft'];
        //console.log(typeof dleft)

        let extended_by = req.query.ext_days;
        if (typeof extended_by != "undefined"){
            dleft = dleft + parseInt(extended_by);
            const filter = { Email: email };    
            const update = { DaysLeft: dleft };

            let doc = await User.findOneAndUpdate(filter, update, {returnOriginal: false});
            //console.log(doc)
        }

        res.render("userData",{email: email, fname: fname, lname: lname, lastlog: lastlog, dleft: dleft})
    }
})

