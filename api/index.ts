import dotenv from "dotenv";
dotenv.config();

import app from "./core/app";
import {connectToMongodb} from "./core/db";
connectToMongodb();

// Server connected
app.listen(process.env.PORT || 4000, ()=>{
    console.log("Server on live " + process.env.PORT);
});