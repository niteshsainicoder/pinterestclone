// import { Users } from "../models/user.models.js";
// import { asynchandler } from "../utils/asynchandler.js";

// const forgetpasscontroller = asynchandler(async (req, res) => {
//   const { firstName, userName, eMail, password } = req.body;
//   const checkuser = await Users.findOne({
//     $and: [{ firstName }, { userName }, { eMail }],
//   });

//   if (checkuser) {
//     const passowordupdate = await Users.updateOne(
//       { _id: checkuser._id },
//       { $set: { password } }
//     ).then(() => {
//      return res.send("password is updated");
//     }).catch((err)=>{ return res.send(`the error is ${err}`)});
//   }
//   else{
//     console.log(checkuser);
//     return res.send("user is not find")
//   }
// });
// export {forgetpasscontroller};

import { Users } from "../models/user.models.js";
import { asynchandler } from "../utils/asynchandler.js";
import bcrypt from "bcrypt";

const forgetpasscontroller = asynchandler(async (req, res) => {
  const { firstName, userName, eMail, password } = req.body;

  // Validate incoming data here...

  try {
    const checkUser = await Users.findOne({
      $and: [{ firstName }, { userName }, { eMail }],
    });

    if (checkUser) {
      // Hash the password before updating
      // Replace 'password' with the hashed value
      checkUser.password = await bcrypt.hash(password, 10);
     await checkUser.save()
     .then(()=>{  return res.send("Password is updated");})
     .catch((err)=>{throw new Error("Failed to update password");})


     
    
    } else {
      console.log(checkUser); // Log for debugging purposes
      return res.send("User not found");
    }
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    return res.status(500).send("Internal Server Error");
  }
});

export { forgetpasscontroller };
