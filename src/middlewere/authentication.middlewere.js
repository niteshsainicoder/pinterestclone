import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";

import { ApiError } from "../utils/apierror.js";
import cookieParser from "cookie-parser";
import { Users } from "../models/user.models.js";

const authentication = asynchandler(async (req, res, next) => {
  const accesstoken = req.cookies.access_token;
 
  if (!accesstoken) {
    next();
  }
  console.log(` this is middlwerre  details   :-:->${accesstoken}`);
  const decode = jwt.verify(
    accesstoken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        req.cookies.access_token="";
       // throw new ApiError(400, "error in verifing", err);
      }
     else{ // Token is valid - proceed to the next middleware or route handler
      req.user = decoded;
      console.log(req.user.userName);}
    }
  );
  // Attach decoded token payload to the request object
  if (decode) {
    //next();// Pass control to the next middleware or route handler
    
   
  }
  next();
});

export { authentication };