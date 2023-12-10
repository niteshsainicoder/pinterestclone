import { asynchandler } from "../utils/asynchandler.js";
import { Users } from "../models/user.models.js";
import { ApiError } from "../utils/apierror.js";

import { ApiResponse } from "../utils/apiresponse.js";

const logincontroller = asynchandler(async (req,res)=>{

    const {userName ,password} = req.body;
    const user =await   Users.findOne({userName});
    if (!user) {
        throw new ApiError(400,"user  with this UserName is not find ");
    }
    const ifPassword = user.isPasswordCorrect(password);
    if (!ifPassword) {
        throw new ApiError(401,"password is in correct ");
    }
    const accessToken= user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
   // console.log(accessToken,"                              good                                      ",refreshToken)
    await user.save();
    return res.cookie('access_token', accessToken, { 
        maxAge: 24 * 60 * 60 * 1000, 
        httpOnly: true,
      }).send('check the cookie'); 
    ; 
  
});

export {logincontroller};


