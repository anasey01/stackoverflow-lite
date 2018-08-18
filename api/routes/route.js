import express from "express";
import bodyParser from "body-parser";
const router = express.Router();

//Simulate DataBase in Memory
let sampleData = [{"id": 1, "title": "Title 1", "content" : "Here's a content"}];

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

//GET API homepage
router.get("/", (req, res)=>{
    res.json("<h1>Welcome to API homepage</h1>");
});

//GET All Questions
router.get("/questions", (req, res)=>{
    res.send(sampleData);
});

//GET Specific Question
router.get("/questions/:id", (req, res)=>{
    let dataId = req.params.id;
    sampleData.forEach(item=>{
        if(item.id == dataId){
            res.json(item);
        }
     });
     res.status(400).json('Data Not Found!');
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
    res.status(200).json('Question added Successfully!');
});

//POST an answer
router.post("/questions/:id/answers", (req, res)=>{
    let dataId = req.params.id;
    sampleData.forEach(item=>{
        if(item.id == dataId){
           if(!item["answer"]){
                item.answer = [req.body.answer];
                res.json("Your answer has been added!")
           }else{
               item["answer"].push(req.body.answer);
               res.json("Your answer has been added!")
           }
        }
     });
     res.status(400).json('Data Not Found!');
});

export default router;