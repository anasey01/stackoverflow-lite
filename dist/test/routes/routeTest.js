'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

describe('/GET', function () {
  it('fetch all questions', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/questions').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body[0].should.have.property('id');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('content');
      done();
    });
  });
});

describe('/GET', function () {
  it('fetch a specific question', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/questions/1').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('id');
      res.body.should.have.property('title');
      res.body.should.have.property('content');
      done();
    });
  });
});

describe('/POST', function () {
  it('add a question', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/questions/').set('content-type', 'application/json').send({
      title: 'Help rectify this error',
      content: 'This is the nature of the error'
    }).end(function (err, res) {
      res.body.should.have.property('id');
      res.body.should.have.property('title');
      res.body.should.have.property('content');
      done();
    });
  });
});

describe('/POST', function () {
  it('add an answer to a specific question', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/questions/1/answers').set('content-type', 'application/json').send({
      answer: 'Answer to question'
    }).end(function (err, res) {
      res.body.should.have.property('id');
      res.body.should.have.property('title');
      res.body.should.have.property('content');
      res.body.should.have.property('answers');
      done();
    });
  });
});
//# sourceMappingURL=routeTest.js.map