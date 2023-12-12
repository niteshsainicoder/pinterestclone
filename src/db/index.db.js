import mongoose, { connect } from "mongoose"

const dbconnect = async ()=>
{
    mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

    const connect = await mongoose.connect(`${process.env.MONGO_URL}`,).then(()=>{
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