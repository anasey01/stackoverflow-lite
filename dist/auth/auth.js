"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dbManager = require("../model/dbManager");

var _dbManager2 = _interopRequireDefault(_dbManager);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();

// parse application/x-www-form-urlencoded
authRouter.use(_bodyParser2.default.urlencoded({ extended: false }));

// parse application/json
authRouter.use(_bodyParser2.default.json());

//PATHS are pre pended with /auth/
authRouter.get("/", function (req, res) {
    res.json({
        "message": "successful"
    });
});

authRouter.post("/signup", function (req, res, next) {
    //Check if email is valid && Check if password is valid
    if (validUser(req.body)) {
        _dbManager2.default.selectUserByEmail(req.body.email, function (result) {
            if (!result) {
                //Hash Password Here Before Inserting into Database.
                var data = {
                    fullname: req.body.fullname,
                    username: req.body.username,
                    gender: req.body.gender,
                    password: req.body.password,
                    email: req.body.email
                };
                _dbManager2.default.insertUser(req.body.fullname, req.body.username, req.body.gender, req.body.password, req.body.email, function (err, result) {
                    console.log("Error", err, "Result", result);
                    res.json(result);
                });
            } else {
                res.json("Username or Password incorrect!");
            }
        });
    } else {
        next(new Error("Invalid User"));
    }
});

var validUser = function validUser(user) {
    var valideEmail = typeof user.email == 'string' && user.email.trim() != '';
    var validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;
    return valideEmail && validPassword;
};

exports.default = authRouter;
//# sourceMappingURL=auth.js.map