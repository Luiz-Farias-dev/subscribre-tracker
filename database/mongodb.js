import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Por favor defina a variavel DB_URI dentro  do arquivo .env "
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
  } catch (error) {
    console.error("Error ao conectar com o banco de dados: ", error);
  }
};

export default connectToDatabase;
