

import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';




 const protectRoutes =async (req, res, next) => {
  const token = req.cookies.token;
  // console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_TOKEN); // 🔐 verify with env secret
     if(!decoded){
         return res.status(403).json({ message: "Token invalid" });
     }
   const user = await userModel.findById(decoded.userId).select('-password')
  if(!user){
    return res.status(404).json({ message: "user not found" });
  }
   req.user = user;

     
    console.log("Decoded user:", req.user);
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(405).json({ message: "server error", error: error.message });
  }
};

export default protectRoutes;