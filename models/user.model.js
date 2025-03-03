import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "O nome do usuário é obrigatório."],
      trim: true,
      minLenght: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "O email do usuário é obrigatório."],
      trim: true,
      lowercase: true,
      unique: true,
      minLenght: 2,
      maxLength: 255,
      match: [/^\S+@\S+\.\S+$/, "Por favor inserir um email válido"],
    },
    password: {
      type: String,
      required: [true, "A senha do usuário é obrigatória"],
      minLenght: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
