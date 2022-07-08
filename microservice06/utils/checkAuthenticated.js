
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '943213374348-nlci0pngntpeshsip11d8f9d1gjo52ls.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

function authenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
     
      verify()
      .then(()=>{
          req.user = user;
          dieuth = user.email;
          next();
      })
      .catch(err=>{
          
          res.redirect('/login')
      })
    

}

module.exports ={ authenticated} ;