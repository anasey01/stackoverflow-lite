'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var handleError = function () {
  function handleError() {
    _classCallCheck(this, handleError);
  }

  _createClass(handleError, null, [{
    key: 'notFound',
    value: function notFound(req, res, next) {
      var error = new Error('Not found');
      error.status = 404;
      next(error);
    }
  }, {
    key: 'serverError',
    value: function serverError(error, req, res, next) {
      res.status(error.status || 500);
      res.json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }]);

  return handleError;
}();

exports.default = handleError;
//# sourceMappingURL=error.js.map