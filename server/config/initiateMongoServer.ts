const mongoose = require("mongoose");


//Mongoose Configurations
mongoose.set("debug",true);
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;