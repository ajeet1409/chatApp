import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    confirmPassword: {
      type: String,
      require: true,
    },

    
    
  },

  {
    timestamps: true, // createAt && updateAt
  }
);

 const userModel = mongoose.model("user", userSchema);
export default userModel;
