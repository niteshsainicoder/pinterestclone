import express from "express";
import { logincontroller } from "../controllers/login.controller.js";
import { authentication } from "../middlewere/authentication.middlewere.js";
const loginRoutes = express.Router();

loginRoutes
  .route("/login")
  .get(authentication, (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.render("login");
    }
  })
  .post(logincontroller);
export { loginRoutes };
