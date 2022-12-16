import mongoose from "mongoose";

const connection = {}

const connect = async()=>{
    if(connection.isConnected){
        return
    }
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/FusionHR")
    connection.isConnected = db.connections[0].readyState
}
export default connect