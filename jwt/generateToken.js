
import jwt from 'jsonwebtoken'


 export const generateToken=(userId,res)=>{

    const token = jwt.sign({ userId }, process.env.JWT_TOKEN , { expiresIn: "1hr" });
    
   
        res.cookie("token", token, {
          httpOnly: true, //xss
          secure: true,
          sameSite: "strict"// csrf
        });

          // localStorage.setItem("token",token)
       

}