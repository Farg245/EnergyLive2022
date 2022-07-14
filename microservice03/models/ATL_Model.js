const mongoose = require("mongoose");

const ATL_data_schema = new mongoose.Schema({
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
  TotalLoadValue: {
    type: Number,
    required: true,
  },
  UpdateTime: {
    type: String,
    required: true,
  },
  _id: false,
  _v: false,
});

module.exports = mongoose.model("ATL_datas", ATL_data_schema);
