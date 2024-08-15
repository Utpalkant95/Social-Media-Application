import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number;
};

const connection : connectionObject = {};

async function dbConnect() : Promise<void> {
    if (connection.isConnected) {
        console.log("Database is Already connected");
        return;
    }
    
    try {
       const db =  await mongoose.connect(process.env.MONGODB_URI!);
        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected");
    } catch (error) {
        console.log("database connection is faild",error);
        process.exit(1);
    }
}

export default dbConnect