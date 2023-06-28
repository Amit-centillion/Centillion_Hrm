import mongoose from "mongoose";
import config from "../config";

export default async () => {
  mongoose.set('strictQuery', true);
  return await mongoose.connect(
    `${config.database.host}${config.database.name}?authSource=admin`
  );
};
