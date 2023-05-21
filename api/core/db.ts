import mongoose from "mongoose";

export async function connectToMongodb() {
    try{
        let connection:string = process.env.MONGO_URI as string;
        await mongoose.connect(connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as any);
        console.log("Database connected");
    }catch(e){
        console.log("Could not connect to database: " + e);
    }
}