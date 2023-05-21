import dotenv from "dotenv";
dotenv.config();

import app from "./core/app";
import {connectToMongodb} from "./core/db";
connectToMongodb();

// Server connected
app.listen(4000, ()=>{
    console.log("Server on live");
});