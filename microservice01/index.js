const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const app = express();
const ATL = require("./models/ATL_Model.js");

app.use(cors());

// Connect Database
connectDB();

app.get("/home", async (req, res) => {
  const output = await ATL.find({}, "-_id");
  res.json(output);
});
app.listen(3000, () => {
  console.log("listening live at 3000");
});
