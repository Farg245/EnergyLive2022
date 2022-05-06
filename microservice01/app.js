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

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
