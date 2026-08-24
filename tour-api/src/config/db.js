import mongoose from "mongoose";
import env from "./env.js";

const connectToDatabase = async () => {
  await mongoose.connect(env.databaseUrl);

  console.log("Database connected ✅");
};

export default connectToDatabase;
