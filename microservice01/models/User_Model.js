const mongoose = require("mongoose");

const User_data_schema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  LastLogin: {
    type: String,
    required: true,
  },
  DaysLeft: {
    type: Number,
    required: true,
  },
  LoggedInFlag: {
    type: Boolean,
    required: true,
  },
  _id: false,
  _v: false,
});

module.exports = mongoose.model("user_datas", User_data_schema);
