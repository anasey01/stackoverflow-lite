import express from "express";
import bodyParser from "body-parser";
import { runInNewContext } from "vm";
const router = express.Router();

const sampleData = [{ id: 1, title: 'Title 1', content: 'Here\'s a content' }];

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Stackoverflow-lite API',
  });
});

router.get('/questions', (req, res) => {
  res.status(200).json(sampleData);
});

router.get('/questions/:id', (req, res) => {
  let dataId = Number(req.params.id);
  let existing = 'Data Not Found!';
  sampleData.forEach((item) => {
    if (item.id === dataId) {
      existing = item;
    }
  });

  if(existing === "Data Not Found!"){
    res.status(404).json(existing);
  }else{
    res.status(200).json(existing);
  }
});


router.post("/questions", (req, res)=>{
  let id = sampleData.length + 1;
  let newQuestion = {
    id,
    title: req.body.title,
    content: req.body.content,
  };
  sampleData.push(newQuestion);
  res.status(200).json(sampleData[sampleData.length - 1]);
});


router.post('/questions', (req, res) => {
  let id = sampleData.length + 1;
  let newQuestion = {
    id,
    title: req.body.title,
    content: req.body.content,
  };
  sampleData.push(newQuestion);
  res.status(200).json(sampleData[sampleData.length - 1]);
});

router.post('/questions/:id/answers', (req, res) => {
  let dataId = Number(req.params.id);
  let existing = 'Data Not Found!';
  sampleData.forEach((item) => {
    if (item.id === dataId) {
      existing = item;
    }
  });
  if (existing === 'Data Not Found!') {
    return res.status(400).json(existing);
  } else if (!existing["answers"]){
    existing.answers = [req.body.answers]
    return res.status(200).json(existing);
  } else {
    existing.answers.push(req.body.answers);
    return res.status(200).json(existing);
  }
});

router.get('*', (req, res) => res.status(400).json({
  status: false,
  message: 'Bad Request! Incorrect Address!',
}));

export default router;

