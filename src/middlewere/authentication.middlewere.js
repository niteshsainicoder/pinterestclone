import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";

import { ApiError  } from "../utils/apierror.js";
import cookieParser from "cookie-parser";
import {Users} from "../models/user.models.js";


const authentication = asynchandler(async (req,res,next)=>{
const    accesstoken = req.cookies.access_token;
console.log( ` this is middlwerre  details   :-:->${accesstoken}`)
if (!accesstoken) {
   next();
}
const decode =   jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new ApiError(400,"error in verifing",err);
    }
    // Token is valid - proceed to the next middleware or route handler
    req.user = decoded; // Attach decoded token payload to the request object
   console.log(req.user.userName);
next(); // Pass control to the next middleware or route handler
  });
  
})


export {authentication}