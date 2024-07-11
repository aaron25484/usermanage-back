import express, { Application } from "express";
import mongoose from "mongoose";
import config from "./config/config";
import userRouter from "./routes/user.routes";
import cors from "cors"


const app: Application = express()
app.use(express.json())

const corsOptions = {
    origin: ['http://localhost:5173','https://user-manage-front.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
app.use(cors(corsOptions))

const mongoUri = config.app.MONGO_DB_URL;

console.log("MONGO_DB_URL:", mongoUri);


if (!mongoUri) {
    throw new Error("MONGO_DB_URL is not defined in the environment variables");
  }

mongoose.connect(
    config.app.MONGO_DB_URL!)
    .then(()=> console.log("connected to MongoDB"))

    app.use("/", userRouter)

    app.get("/", (req,res)=>{
        res.status(200).json({message: "This is my User Manage backend"})
      })
export default app