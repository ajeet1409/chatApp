
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

// If cookies are not being set on the client, possible reasons include:
// 1. The 'secure' flag is set to true, so cookies will only be set over HTTPS. 
//    If you are running your backend locally over HTTP, the cookie will not be set.
//    For local development, you may want to set 'secure' to false:
//    res.cookie("token", token, {
//      httpOnly: true,
//      secure: process.env.NODE_ENV === "production", // only true in production
//      sameSite: "strict"
//    });

// 2. The frontend must send requests with 'credentials: "include"' or 'withCredentials: true' (for axios).
//    Make sure your frontend is configured to send credentials.

// 3. CORS settings on the backend must allow credentials:
//    app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// 4. The domain and path settings for the cookie must match the frontend's expectations.

// 5. If you are testing with tools like Postman, cookies may not be set as expected.

// Solution: To ensure cookies are set correctly when rendering or in your code, follow these steps:
// 1. Always call res.cookie() before sending any response (res.send, res.json, etc).
// 2. For local development, set 'secure' to false; in production, set it to true.
//    Example:
//    res.cookie("token", token, {
//      httpOnly: true,
//      secure: process.env.NODE_ENV === "production",
//      sameSite: "strict"
//    });
// 3. On the frontend, make sure to send requests with credentials (e.g., axios: { withCredentials: true }).
// 4. Backend CORS must allow credentials: app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// 5. Do not send any response before setting the cookie. Always set the cookie first, then send res.json or res.send.