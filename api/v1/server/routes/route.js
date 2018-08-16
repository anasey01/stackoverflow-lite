import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
const router = express.Router();

//Simulate DataBase in Memory
let sampleData = [];

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

//GET API homepage
router.get("/", (req, res)=>{
    res.send("<h1>Welcome to API homepage</h1>");
});

//GET All Questions
router.get("/questions", (req, res)=>{
    res.send(sampleData);
});

//GET Specific Question
router.get("/questions/:id", (req, res)=>{
    let dataId = req.params.id;
    sampleData.forEach(item=>{
        if(item.id == dataId)
             res.send(item)
     });
     res.send("Data not found!");
});

//POST a Question
router.post("/questions", (req, res)=>{
    let id = sampleData.length + 1;
    let newQuestion = {
        id : id,
        title : req.body.title,
        content : req.body.content
    }
    sampleData.push(newQuestion);
    res.send("Successfully added!");
});

export default router;