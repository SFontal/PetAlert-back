import createDebug from "debug";
import mongoose from "mongoose";
import debugMessage from "../tools/debugMessage.js";

const debug = createDebug("petAlert!:connectDB");

const connectDatabase = async (url: string): Promise<void> => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);

    debug(debugMessage("Connected to the database"));
  } catch (error) {
    debug(debugMessage("Error connecting to the database"));
  }
};

export default connectDatabase;
