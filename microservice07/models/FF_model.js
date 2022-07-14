const mongoose = require("mongoose");

const FF_data_schema = new mongoose.Schema({
  DateTime: {
    type: String,
    required: true,
  },
  ResolutionCode: {
    type: String,
    required: true,
  },
  OutAreaCode: {
    type: String,
    required: true,
  },
  OutAreaTypeCode: {
    type: String,
    required: true,
  },
  OutAreaName: {
    type: String,
    required: true,
  },
  OutMapCode: {
    type: String,
    required: true,
  },
  InAreaCode: {
    type: String,
    required: true,
  },
  InAreaTypeCode: {
    type: String,
    required: true,
  },
  InAreaName: {
    type: String,
    required: true,
  },
  InMapCode: {
    type: String,
    required: true,
  },
  FlowValue: {
    type: Number,
    required: true,
  },
  UpdateTime: {
    type: String,
    required: true,
  },
  versionKey:false

});

module.exports = mongoose.model("ff_datas", FF_data_schema);
