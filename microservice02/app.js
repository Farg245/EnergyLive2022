require('dotenv').config()

const express = require('express');
const LoggedInUser = require("./models/User_Model.js");
const app =express()
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser')
const check =require("./utils/checkAuthenticated")
// Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '943213374348-nlci0pngntpeshsip11d8f9d1gjo52ls.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);
// Middleware
const path = require("path");
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set("view engine","ejs")
app.get('/', (req, res)=>{
    res.render("index")
})

connectDB();

app.get('/login', (req,res)=>{
    res.render('login');
})

app.post('/login', (req,res)=>{
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
      }
      
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success')
      })
      .catch(console.error);

})
app.get('/profile', check.authenticated, async (req, res)=>{
    let user = req.user
    let email = req.email
    var username = user.name.split(" ")
    var firstname = username[0]
    var lastname = username[1]
    var timestamp = Date.now()
    var d = LoggedInUser
    var myobj = { FirstName: firstname, LastName: lastname, Email: user.email, LastLogin: new Date(timestamp).toString(), DaysLeft: 30, LoggedInFlag: true};
    const found = await d.find({"Email": user.email})
    if  ( found.length == 0){
        LoggedInUser.insertMany(myobj)
    }
    else{
        const filter = { Email: user.email };    
        const update = { LastLogin: new Date(timestamp).toString(), LoggedInFlag: true };
        let util = await LoggedInUser.findOneAndUpdate(filter, update, {returnOriginal: false});
        //console.log(util);
    }

    res.render('profile', {user, email});
})

app.get('/randompath', check.authenticated, (req,res)=>{
    res.send('randompath')
})

app.get('/logout', check.authenticated, async (req, res)=>{
    
    let user = req.user
    const found = await LoggedInUser.find({"Email": user.email})
        
    if (found.length != 0){
        
        const filter = { Email: user.email };    
        //console.log(user.email)
        const update = { LoggedInFlag: false };

        let doc = await LoggedInUser.findOneAndUpdate(filter, update, {returnOriginal: false});
        //console.log(doc)
    }
    res.clearCookie('session-token');
    //res.render('/', {user, email})
    res.redirect('/')

})



module.exports = app;
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});