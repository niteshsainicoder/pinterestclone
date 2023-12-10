import express from "express";
import {logincontroller} from "../controllers/login.controller.js"
import { authentication } from "../middlewere/authentication.middlewere.js";
const loginRoutes = express.Router();

loginRoutes.route("/login").get( (req, res) => {
  res.render("login");
}).post(logincontroller);
loginRoutes.route("/login/api",).get(authentication,(req,res)=>{
  res.send("middlewere is working");
})
export { loginRoutes };
