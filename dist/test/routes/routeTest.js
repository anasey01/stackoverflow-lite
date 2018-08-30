'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();

var validToken = '';

_chai2.default.use(_chaiHttp2.default);

describe('/POST', function () {
  it('signup a new user', function (done) {
    _chai2.default.request(_server2.default).post('/auth/signup').send({
      fullname: 'Janet Doe',
      gender: 'F',
      username: 'janet_Doe',
      password: 'password',
      email: 'janet_doe@email.com'
    }).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.success.should.equal(true);
      res.body.message.should.equal('user succesfully registered');
      done();
    });
  });
});

describe('/POST', function () {
  it('Login a user and issue a valid TOKEN', function (done) {
    _chai2.default.request(_server2.default).post('/auth/login').send({
      username: 'janet_Doe',
      password: 'password'
    }).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.success.should.equal(true);
      res.body.message.should.equal('Successfully logged in');
      validToken = res.header['x-auth-token'];
      done();
    });
  });
});

describe('/POST', function () {
  it('add a question', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/questions/').set('x-auth-token', validToken).set('content-type', 'application/json').send({
      title: 'Using R to create a data table',
      content: 'I have something I would like to do in R but I don\'t even know how to begin. I want to create a data table, let\'s say 8 columns wide. I want to set conditions for each column i.e. Maximum of column value 10, 70, 100, 100, 100, 100, 100, 100 Minimum of column value 0, 0, 0, 0, 0, 0, 0, 20 Sum of the row = 100 Steps of say 5. The idea is that each column steps down until the row = 100 and then it moves to the next row.'
    }).end(function (err, res) {
      res.body.should.have.property('id');
      res.body.should.have.property('title');
      res.body.should.have.property('content');
      done();
    });
  });
});

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
    _chai2.default.request(_server2.default).get('/api/v1/questions/1').set('x-auth-token', validToken).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('id');
      res.body.should.have.property('title');
      res.body.should.have.property('content');
      done();
    });
  });
});

describe('/POST', function () {
  it('add an answer to a specific question', function (done) {
    var id = 1;
    _chai2.default.request(_server2.default).post('/api/v1/questions/' + id + '/answers').set('content-type', 'application/json').set('x-auth-token', validToken).send({
      answer: 'Here is an answer for this question comming from the TEST file'
    }).end(function (err, res) {
      res.body.should.have.property('id');
      res.body.should.have.property('answers');
      done();
    });
  });
});
//# sourceMappingURL=routeTest.js.map