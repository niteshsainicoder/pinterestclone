import { asynchandler } from "../utils/asynchandler.js";

import { Users } from "../models/user.models.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { uploading } from "../utils/cloudinary.js";

const signupcontroller = asynchandler(async (req, res) => {
  // step 1: get all the data from request
  const { firstName, lastName, userName, eMail, password } = req.body;
  console.log(firstName, lastName, userName, eMail, password, req.body);
  //  step 2: check the data is complete or not
  if (
    [firstName, lastName, userName, eMail, password].some((feild) => {
      feild?.trim() === "";
    })
  ) {
    throw new ApiError(400, "all feilds are requred");
  }

  // step3 : check if user is not already existed with this email or username
  const checkuser = await Users.findOne({ $or: [{ userName }, { eMail }] });
  if (checkuser) {
    throw new ApiError(401, "user is present");
  }

  // step 4 : reading the flies from request of user and checking if they are not empty

  const avatarlocalpath = req.files?.avatar?.[0]?.path;
  const coverImagelocalpath = req.files?.coverImage?.[0]?.path;

  if (!avatarlocalpath) {
    throw new ApiError(400, "pictures is must needed");
  }
  // step 5 : uploading the  received image to cloudinary and print their urls

  const upavatr = await uploading(avatarlocalpath);
  const upcoverImage = await uploading(coverImagelocalpath);

  const usercreated = await Users.create({
    firstName,
    lastName,
    userName,
    eMail: eMail,
    password,
    avatar: upavatr.url,
    coverImage: upcoverImage.url,
  });

  // for save the refreshtoken with  creating a user database
  usercreated.refreshToken = usercreated.generateRefreshToken();
  usercreated.accessToken = usercreated.generateAccessToken();
  await usercreated.save();

  const createduser = await Users.findById(usercreated._id).select(
    "-password -refreshToken"
  );
  if (!createduser) {
    throw new ApiError(500, "something went wrong while registering a user");
  }

  console.log(`user created details ${usercreated}`);

  return res
    .cookie("access_token", usercreated.accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    })
    .status(201)
    .json(new ApiResponse(200, createduser, "User Registered successfully"));
});

export { signupcontroller };
