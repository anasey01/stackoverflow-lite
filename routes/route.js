import express from "express";
import bodyParser from "body-parser";
import { runInNewContext } from "vm";
const router = express.Router();

//Simulate DataBase in Memory
let sampleData = [{"id": 1, "title": "Title 1", "content" : "Here's a content"}];

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
router.get("/questions/:id", (req, res, next)=>{
    let dataId = req.params.id;
    let existing = "Data Not Found!";
    sampleData.forEach(item=>{
        if(item.id == dataId){
            existing = item;
        }
     });

     if(existing === "Data Not Found!"){
        res.status(404).json(existing);
     }else{
        res.status(200).json(existing);
     }
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
    res.status(200).json(sampleData[sampleData.length - 1]);
});

//POST an answer
router.post("/questions/:id/answers", (req, res)=>{
    let dataId = req.params.id;
    let existing = "Data Not Found!";
    sampleData.forEach(item=>{
        if(item.id == dataId){
            existing = item;
        }
     });
     if(existing === "Data Not Found!"){
        return res.status(400).json(existing);
     }else if(!existing["answers"]){
        existing.answers = [req.body.answers]
        return res.json(existing);
     }else{
        existing.answers.push(req.body.answers);
        return res.json(existing);
     }
});

//Any other routes
router.get("*", (req, res) => {
    return res.json("API URL NOT CORRECT!");
});
export default router;