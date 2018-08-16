import express from "express";
import bodyParser from "body-parser";
import data from "../data/data";
const router = express.Router();

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
    res.send(data);
});

//GET Specific Question
router.get("/questions/:id", (req, res)=>{
    let dataId = req.params.id;
    data.forEach(item=>{
       if(item.id == dataId)
            res.send(item)
    });
    res.send("Data not found!");
});


export default router;