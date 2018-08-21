"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _vm = require("vm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//Simulate DataBase in Memory
var sampleData = [{ "id": 1, "title": "Title 1", "content": "Here's a content" }];

// parse application/x-www-form-urlencoded
router.use(_bodyParser2.default.urlencoded({ extended: false }));

// parse application/json
router.use(_bodyParser2.default.json());

//GET API homepage
router.get("/", function (req, res) {
    res.send("<h1>Welcome to API homepage</h1>");
});

//GET All Questions
router.get("/questions", function (req, res) {
    res.send(sampleData);
});

//GET Specific Question
router.get("/questions/:id", function (req, res, next) {
    var dataId = req.params.id;
    var existing = "Data Not Found!";
    sampleData.forEach(function (item) {
        if (item.id == dataId) {
            existing = item;
        }
    });

    if (existing === "Data Not Found!") {
        res.status(404).json(existing);
    } else {
        res.status(200).json(existing);
    }
});

//POST a Question
router.post("/questions", function (req, res) {
    var id = sampleData.length + 1;
    var newQuestion = {
        id: id,
        title: req.body.title,
        content: req.body.content
    };
    sampleData.push(newQuestion);
    res.status(200).json(sampleData[sampleData.length - 1]);
});

//POST an answer
router.post("/questions/:id/answers", function (req, res) {
    var dataId = req.params.id;
    var existing = "Data Not Found!";
    sampleData.forEach(function (item) {
        if (item.id == dataId) {
            existing = item;
        }
    });
    if (existing === "Data Not Found!") {
        return res.status(400).json(existing);
    } else if (!existing["answers"]) {
        existing.answers = [req.body.answers];
        return res.json(existing);
    } else {
        existing.answers.push(req.body.answers);
        return res.json(existing);
    }
});

//Any other routes
router.get("*", function (req, res) {
    return res.json("API URL NOT CORRECT!");
});
exports.default = router;
//# sourceMappingURL=route.js.map