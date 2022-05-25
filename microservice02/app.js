require('dotenv').config()

const express = require('express');

const app =express()
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

app.get('/profile', check.authenticated, (req, res)=>{
    let user = req.user;
    res.render('profile', {user});
})

app.get('/randompath', check.authenticated, (req,res)=>{
    res.send('randompath')
})

app.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')

})



module.exports = app;
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});