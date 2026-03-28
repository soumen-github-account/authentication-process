

import express from 'express'
import { connectDb } from './config/db.js';
import 'dotenv/config'
import authRouter from "./routes/authRoute.js"
import session from "express-session"
import MongoStore from "connect-mongo"


const app = express()
const port = 8000;

connectDb()
app.use(express.json())

app.use(
    session({
        secret: "secretkey",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        }),
        cookie: {maxAge: 1000 * 60 * 60}
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
app.use("/auth", authRouter);



app.listen(port, ()=>{
    console.log("App started")
})
