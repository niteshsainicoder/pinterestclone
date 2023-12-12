import express from "express"
import { forgetpasscontroller } from "../controllers/forgetpass.controller.js";
const forgetpass=express.Router();

forgetpass.route("/index/forgetpass").get((req,res)=>{
    res.render("forgetpass");
}).post(forgetpasscontroller);

export {forgetpass};