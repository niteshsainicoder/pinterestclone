import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { dbconnect } from "./db/index.db.js";
import { signupRoutes } from "./routes/signup.routes.js";
import { loginRoutes } from "./routes/login.routes.js";
app.use("/api", signupRoutes);
app.use("/api", loginRoutes);
const PORT = process.env.PORT || 5000;
const mongodb = await dbconnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`the server is running on : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`the error is ${err}`);
  });
