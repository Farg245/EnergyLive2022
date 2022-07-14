const mongoose = require("mongoose");

const ATL_country_code_schema = new  mongoose.Schema({
  Country: {
        type: String,
        required: true,
      },
      MapCode: {
        type: String,
        required: true,
      },
})

module.exports = mongoose.model("country_codes", ATL_country_code_schema);
