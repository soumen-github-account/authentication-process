

import express from 'express'
import { connectDb } from './config/db.js';
import 'dotenv/config'
import authRouter from "./routes/sessionRoutes/authRoute.js"
import tokenRouter from "./routes/tokenRoutes/authRoute.js";
import cookieRouter from "./routes/cookieRoutes/authRoute.js"
import jwtRouter from "./routes/jwtRoutes/authRoute.js"

import cookieParser from 'cookie-parser';
import session from "express-session"
import MongoStore from "connect-mongo"


const app = express()
const port = 8000;

connectDb()
app.use(express.json())
app.use(cookieParser())
// app.use(
//     session({
//         secret: "secretkey",
//         resave: false,
//         saveUninitialized: false,
//         store: MongoStore.create({
//             mongoUrl: process.env.MONGODB_URI
//         }),
//         cookie: {maxAge: 1000 * 60 * 60}
//     })
// )

app.use(
    session({
        secret: "supersecretkey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            sameSite: "Lax",
            httpOnly: true
        },
    })
)

app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")

app.get('/', (req, res)=>{
    // res.send("Api is working...")
    res.render("authView/register")
})
app.get('/login', (req, res) => {
    res.render("authView/login")
})
app.use("/session", authRouter);
app.use("/token", tokenRouter);
app.use("/cookie", cookieRouter);
app.use("/jwt", jwtRouter);


app.listen(port, ()=>{
    console.log("App started")
})
