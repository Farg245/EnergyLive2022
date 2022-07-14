const mongoose = require("mongoose");

const AGPT_data_schema = new mongoose.Schema({
  DateTime: {
    type: String,
    required: true,
  },
  ResolutionCode: {
    type: String,
    required: true,
  },
  AreaCode: {
    type: String,
    required: true,
  },
  AreaTypeCode: {
    type: String,
    required: true,
  },
  AreaName: {
    type: String,
    required: true,
  },
  MapCode: {
    type: String,
    required: true,
  },
  
  ActualGenerationOutput: {
    type: Number,
    required: true,
  },
  // ActualConsumption:  {
  //   type: Number,
  //   required: true,
  // },
  UpdateTime: {
    type: String,
    required: true,
  },
  ProductionType: {
    type: String,
    required: true,
  },
  versionKey:false
});

module.exports = mongoose.model("agpt_datas", AGPT_data_schema);
