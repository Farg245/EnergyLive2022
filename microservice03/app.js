const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const app = express();
const ATL = require("./models/ATL_Model.js");
const Countries = require("./models/Country_code_Model.js");

app.use(cors());

//set view engine 
app.set('view engine', 'ejs');

// Connect Database
connectDB();
//listen localhost 
app.listen(3000);
//
app.use(express.static("public"))

app.get("/", async (req, res) => {
  res.render("index")
});


app.get("/CrossBorderFlow",async (req,res)=>{
  const country_codes = await Countries.find({}, "-_id");
  const start =req.query.startDate +" "+req.query.startTime +":00.000"
  const end =req.query.endDate+" "+req.query.endTime+":00.000"
  const GenerationType = req.query.GenerationType;
  const DestionationCountry = req.query.DestionationCountry;


  // mock dates and values untill we create the quury for the databsae
  const date_labels = ["a","b","c","d"]
  const values = [4,3,2,1]
  res.render("CrossBorderFlow", { country_codes: country_codes, date_labels: date_labels, values:values })
})

app.get("/AggregatedGenerationperType",async (req,res)=>{
  const country_codes = await Countries.find({}, "-_id");
  const start =req.query.startDate +" "+req.query.startTime +":00.000"
  const end =req.query.endDate+" "+req.query.endTime+":00.000"
  const GenerationType = req.query.GenerationType;
  const SelectedMapCode = req.query.MapCode;


  // mock dates and values untill we create the quury for the databsae
  const date_labels = ["a","b","c","d"]
  const values = [1,2,3,4]
  res.render("AggregatedGenerationperType", { country_codes: country_codes, date_labels: date_labels, values:values })
})


app.get("/ActualTotalLoad", async (req, res) => {
  const country_codes = await Countries.find({}, "-_id");
  const start =req.query.startDate +" "+req.query.startTime +":00.000"
  const end =req.query.endDate+" "+req.query.endTime+":00.000"
  const SelectedMapCode = req.query.MapCode;


  //actual query
  const ATL_data = await ATL.find({ "MapCode": SelectedMapCode,"DateTime": {"$gte": start, "$lte": end}}, "TotalLoadValue  DateTime -_id").sort('DateTime');
  //console.log(ATL_data)

  var date_to_values_map = {};
  if (typeof ATL_data !== undefined) {
    ATL_data.forEach(data => {
      if (date_to_values_map[data['DateTime']] === undefined) {
        date_to_values_map[data['DateTime']] = data['TotalLoadValue'];
      }
      else {
        date_to_values_map[data['DateTime']] = date_to_values_map[data['DateTime']] + data['TotalLoadValue'];
      }
    })
  }

  const date_labels = Object.keys(date_to_values_map)
  const values = Object.values(date_to_values_map)

  res.render("ActualTotalLoad", { country_codes: country_codes, date_labels: date_labels, values:values })
});




app.use((req, res) => {
  res.status(404).render('404');
}) 