import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import { connectDB } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js"
import projectRoutes from "./routes/project.routes.js"
import { verifyUser  } from "./middlewares/auth.middleware.js";
import taskRoutes from "./routes/task.routes.js"
import inviteRoutes  from "./routes/invite.routes.js"

const app = express(); //creates express application instance
app.use(bodyParser.json()); //apply bodyparser middleware to parse JSON request bodies to make information available in req.body
app.use(cors()); //apply cors middleware to allow cross origin requests
app.get("/", (req,res)=>{
    res.send("hello world"); //basic health check endpoint
})

//Route configuration
app.use("/auth", authRoutes) //mounting authentication route under auth prefix. /auth/login /auth/register become available
app.use("/project", verifyUser, projectRoutes)
app.use("/task", verifyUser, taskRoutes)
app.use("/invite", verifyUser, inviteRoutes)
app.get("/fetchDetails",verifyUser,(req,res)=>{
    return res.status(200).json(req.user);
})

connectDB().then(()=>{
    app.listen(5001, ()=>{
        console.log("server listening on port 5001")
    })
})
