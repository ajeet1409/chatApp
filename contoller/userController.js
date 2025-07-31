import userModel from "../model/userModel.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { generateToken } from "../jwt/generateToken.js";

const app = express.Router();



export const signup = async (req, res) => {
  console.log(req.body);
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ password: "password do not match confirmpassword" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user already register" });
    }

    //* *********** hashing password
    // const hash = await bcrypt.hash(password, 10);

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const newUser = new userModel({
          username,
          email,
          password: hash,
        });

        await newUser.save().then(() => {
          console.log(newUser);

          if (newUser) {
            generateToken(newUser._id, res); // newUser id send to generate token
            res
              .status(200)
              .json({ message: "user register successfully", newUser });
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

// ! *******************     login *****************

export const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not find" });
    }

    // const isMatch =  bcrypt.compare(password, user.password);
    
    // if (!isMatch) {
    //   return res.status(400).json({ message: "password not match" });
    // }
 
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        generateToken(user._id, res);
        // const token = jwt.sign(
        //   { email: user.email, userId: user._id },
        //   "secret",
        //   { expiresIn: "1hr" }
        // );

        // res.cookie("token", token, {
        //   httpOnly: true,
        //   secure: true,
        // });
        return res.status(200).json({
          message: "user login successfully",
          user: {
            userId: user._id,
            username: user.username,
            email: user.email,
          },
        });
      } else {
        return res.status(500).json({ message: "invalid user or  password" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal servel error" });
  }
};


//! ************* logout *****************


export const logout=(req,res)=>{
  try {
    res.clearCookie("token")
    res.status(200).json({"message":"user logout successfully"})
  } catch (error) {
  console.log(error);
   res.status(500).json({"message":"server error"})
     
  }
}
//!  ************** get all data ***********
 export const getUserInfo =async (req,res)=>{

   try {

    const isLoggedUser = req.user._id
// ! **jo user login hai vo show nahi karegaa
    const allUsers= await  userModel.find({_id:{$ne:isLoggedUser}}).select("-password")

   res.status(201).json({allUsers})
  
   } catch (error) {
     console.log("error in all user controller"+error);
     
    res.status(401).json({ message: "data not found" });
    
   }
  


}






