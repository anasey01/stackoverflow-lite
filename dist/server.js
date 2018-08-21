"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _route = require("./routes/route");

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//USE ROUTES
app.use("/api/v1", _route2.default);

//Set Up PORT
app.set('port', process.env.PORT || 8080);

//FIRE Up Server to listen on PORT
app.listen(app.get("port"), function () {
    console.log("Action happening on port " + app.get("port"));
});

exports.default = app;
//# sourceMappingURL=server.js.map