import mongoose from "mongoose";

//Mongoose Configurations
mongoose.set("debug",true);
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
  }
};

export default InitiateMongoServer;