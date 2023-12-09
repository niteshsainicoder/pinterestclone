import mongoose, { connect } from "mongoose"

const dbconnect = async ()=>
{
    const connect = await mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
console.log(` the server is connect:`)
    }).catch((err)=>{
console.log(   `the error is : ${err}`);
    })
    return connect;
}

/*.on((err)=>{
    console.log(`the error is find on connection ${err}`);
})*/
export {dbconnect}