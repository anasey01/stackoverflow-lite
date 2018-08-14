import express from "express";
const app = express();

//Get Hompage
app.get("/", (req, res)=>{
    res.send("Hello, world!!!");
});