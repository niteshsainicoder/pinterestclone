import express from "express";
import {logincontroller} from "../controllers/login.controller.js"
import { authentication } from "../middlewere/authentication.middlewere.js";
const loginRoutes = express.Router();

loginRoutes.route("/login").get(authentication, (req, res) => {
  res.render("login");}).post(logincontroller);
export { loginRoutes };
