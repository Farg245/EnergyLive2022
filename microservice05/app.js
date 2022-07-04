const express = require("express");
//const connectDB = require("./config/db");
const path = require("path");
//const cors = require("cors");
const app = express();
const fs = require("fs");
const consume = require("./consume")
//const lol = require("../module/microservice03/app.js")
//const ATL = require("./models/ATL_Model.js");
//const AGPT = require("./models/AGPT_Model.js");
//const FF = require("./models/FF_Model.js");
//const Countries = require("./models/Country_code_Model.js");

//app.use(cors());

//set view engine 
app.set('view engine', 'ejs');
app.use(express.json());



// Connect Database
//connectDB();
//listen localhost 
app.listen(7004);
//
app.use(express.static("public"))

app.get("/", async (req, res) => {
  res.render("index")
});
//junk
//const check =require("./utils/checkAuthenticated")
//const cookieParser = require('cookie-parser')
//app.use(cookieParser());

//console.log(lol.FFDownload)\


consume().catch((err) => {
    console.error("error in consumer: ", err)
})


/**fs.readFile("./lol.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  console.log("File data:", jsonString);
});**/

module.exports = app;

/** 

const PORT = process.env.PORT || 7004;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});**/