import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n Mongodb Connected !!! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Mongodb Connection Failed :", error);
    process.exit(1);
  }
};

export default connectToDB;
