import express from "express";
import { Users } from "../models/user.models.js";
const signup = express.Router();

signup.get("/login", (req, res) => {
  res.send("you are on login");
});
signup.post("/", async (req, res) => {

});

export { signup };
