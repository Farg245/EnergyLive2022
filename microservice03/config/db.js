const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const { MongoClient, ServerApiVersion } = require("mongodb");
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      serverApi: ServerApiVersion.v1,
    });

    console.log("MongoDB atl Connected..");
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
