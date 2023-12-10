import express from "express";
const loginRoutes = express.Router();

loginRoutes.route("/login").get( (req, res) => {
  res.render("login");
}).post((req,res)=>{
  res.send("happy")
});

export { loginRoutes };
