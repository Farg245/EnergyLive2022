const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const app = express();
const ATL = require("./models/ATL_Model.js");
const AGPT = require("./models/AGPT_Model.js");
const FF = require("./models/FF_Model.js");
const Countries = require("./models/Country_code_Model.js");
const produce = require("./produce")

app.use(cors());

//set view engine 
app.set('view engine', 'ejs');

// Connect Database
connectDB();
//listen localhost 
app.listen(7002);
//
app.use(express.static("public"))

app.get("/", async (req, res) => {
  res.render("index")
});
//junk
const check =require("./utils/checkAuthenticated")
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser());


//junk end

 


app.get("/CrossBorderFlow",check.authenticated,async (req,res)=>{
  const country_codes = await Countries.find({}, "-_id");
  const start =req.query.startDate +" "+req.query.startTime +":00.000"
  const end =req.query.endDate+" "+req.query.endTime+":00.000"
  const SelectedMapCode = req.query.MapCode;
  const downFlagJson = req.query.DownloadJSON;
  //const downFlagCsv = req.query.DownloadCSV;

  console.log(downFlagJson)
  //console.log(SelectedMapCode);
  const DestionationCountry = req.query.DestionationCountry;

  const FF_data_util = await FF.find({  "DateTime": {"$gte": start, "$lte": end}}, "FlowValue InMapCode OutMapCode DateTime -_id");
  // const FF_data_util = await FF.find({"OutMapCode": SelectedMapCode, "InMapCode": DestionationCountry, "DateTime": {"$gte": start, "$lte": end}}, "FlowValue  InMapCode OutMapCode DateTime -_id").sort('DateTime');
  // console.log(FF_data_util);
  const FF_data = FF_data_util.filter((lol) => SelectedMapCode === lol.InMapCode.substring(0,2) && DestionationCountry === lol.OutMapCode.substring(0,2));
   //console.log(FF_data);
  var date_to_values_map = {};
  if (typeof FF_data !== undefined) {
    FF_data.forEach(data => {
      if (date_to_values_map[data['DateTime']] === undefined) {
        date_to_values_map[data['DateTime']] = data['FlowValue'];
      }
      else {
        date_to_values_map[data['DateTime']] = date_to_values_map[data['DateTime']] + data['FlowValue'];
      }
    })
  } 
   app.locals.FFDownload = date_to_values_map
   if(typeof downFlagJson != "undefined"){
    await produce(date_to_values_map).catch((err) => {
         console.error("error in producer: ", err)
       })
      } 

  
  const date_labels = Object.keys(date_to_values_map)
  const values = Object.values(date_to_values_map)
  
  res.render("CrossBorderFlow", { country_codes: country_codes, date_labels: date_labels, values:values, title: 'Cross-border flows'})
})

app.get("/AggregatedGenerationperType",check.authenticated,async (req,res)=>{
  const country_codes = await Countries.find({}, "-_id");
  const start =req.query.startDate +" "+req.query.startTime +":00.000"
  const end =req.query.endDate+" "+req.query.endTime+":00.000"
  const ProductionType = req.query.ProductionType;
  const SelectedMapCode = req.query.MapCode;//.substring(0,2);
  const downFlagJson = req.query.DownloadButton;
  
  const AGPT_data_util = await AGPT.find({"ProductionType": ProductionType,  "DateTime": {"$gte": start, "$lte": end}}, "ActualGenerationOutput  MapCode DateTime -_id");//.sort('DateTime');
  const AGPT_data = AGPT_data_util.filter((lol) => SelectedMapCode === lol.MapCode.substring(0,2));
  //console.log(AGPT_data);
  
  var date_to_values_map = {};
  if (typeof AGPT_data !== undefined) {
    AGPT_data.forEach(data => {
      if (date_to_values_map[data['DateTime']] === undefined) {
        date_to_values_map[data['DateTime']] = data['ActualGenerationOutput'];
      }
      else {
        date_to_values_map[data['DateTime']] = date_to_values_map[data['DateTime']] + data['ActualGenerationOutput'];
      }
    })
  }
 
 
  const date_labels = Object.keys(date_to_values_map)
  const values = Object.values(date_to_values_map)

  if(typeof downFlagJson != "undefined"){
    await produce(date_to_values_map).catch((err) => {
         console.error("error in producer: ", err)
       })
      } 

  // if(typeof downFlagCsv != "undefined"){
  //   await produce(date_to_values_map).catch((err) => {
  //        console.error("error in producer: ", err)
  //      })
  //     } 

  res.render("AggregatedGenerationperType", { country_codes: country_codes, date_labels: date_labels, values:values, title: 'Generation per type'})
})


app.get("/ActualTotalLoad",check.authenticated, async (req, res) => {
  const country_codes = await Countries.find({}, "-_id");
  const start =req.query.startDate +" "+req.query.startTime +":00.000"
  const end =req.query.endDate+" "+req.query.endTime+":00.000"
  const SelectedMapCode = req.query.MapCode;
  const downFlagJson = req.query.DownloadButton;

  const ATL_data_util = await ATL.find({"DateTime": {"$gte": start, "$lte": end}}, "TotalLoadValue  MapCode DateTime -_id");//.sort('DateTime');
  const ATL_data = ATL_data_util.filter((lol) => SelectedMapCode === lol.MapCode.substring(0,2));
  //const ATL_data = await ATL.find({ "MapCode": SelectedMapCode,"DateTime": {"$gte": start, "$lte": end}}, "TotalLoadValue  DateTime -_id").sort('DateTime');
  //console.log(ATL_data);
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

  if(typeof downFlagJson != "undefined"){
    await produce(date_to_values_map).catch((err) => {
         console.error("error in producer: ", err)
       })
      } 
  app.locals.ATLDownload = date_to_values_map
  res.render("ActualTotalLoad", { country_codes: country_codes, date_labels: date_labels, values:values, title: 'Actual Total Load' })
  //console.log(ATLDownload)
});




app.use((req, res) => {
  res.status(404).render('404');
}) 

// app.get('/', function(req, res) {
//   res.render('downloadButton.ejs');
// });