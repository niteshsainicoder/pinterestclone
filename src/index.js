import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { dbconnect } from "./db/index.db.js";
import { signup} from "./routes/singup.routes.js";
import { loginRoutes } from "./routes/login.routes.js";
app.use("/",signup)
app.use("/",loginRoutes);
const PORT = process.env.PORT||5000
 const mongodb= await dbconnect().then(()=>{
app.listen(PORT,()=>{
    console.log(`the server is running on : ${PORT}`);
    
})  
})
.catch((err)=>{
    console.log(`the error is ${err}`);
})

