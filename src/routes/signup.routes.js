import express from "express";
import { signupcontroller } from "../controllers/signup.controller.js";
import { upload } from "../middlewere/multer.middlewere.js";

const uplods = upload.fields([
  {
    name: "avatar",
    maxCount: 1,
  },
  {
    name: "coverImage",
    maxCount: 1,
  },
]);
const signupRoutes = express.Router();

signupRoutes
  .route("/index")
  .get((req, res) => {
    res.render("index");
  })
  .post(uplods, signupcontroller);

export { signupRoutes };
