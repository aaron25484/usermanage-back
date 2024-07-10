import express, { Application } from "express";
import mongoose from "mongoose";
import config from "./config/config";
import userRouter from "./routes/user.routes";
import cors from "cors"


const app: Application = express()
app.use(express.json())
app.use(cors())

mongoose.connect(
    config.app.MONGO_DB_URL!)
    .then(()=> console.log("connected to MongoDB"))

    app.use("/", userRouter)

    app.get("/", (req,res)=>{
        res.status(200).json({message: "This is my User Manage backend"})
      })
export default app