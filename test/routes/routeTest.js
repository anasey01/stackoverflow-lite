import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

let should  = chai.should();

let validToken = '';

chai.use(chaiHttp);

describe('/POST', () => {
  it('signup a new user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Janet Doe',
        gender: 'F',
        username: 'janet_Doe',
        password: 'password',
        email: 'janet_doe@email.com',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
        res.body.message.should.equal('user succesfully registered');
        done();
      });
  });
});

describe('/POST', () => {
  it('Login a user and issue a valid TOKEN', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'janet_Doe',
        password: 'password',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
        res.body.message.should.equal('Successfully logged in');
        validToken = res.header['x-auth-token'];
        done();
      });
  });
});

describe('/POST', () => {
  it('add a question', (done) => {
    chai.request(server)
      .post('/api/v1/questions/')
      .set('x-auth-token', validToken)
      .set('content-type', 'application/json')
      .send({
        questionTitle: 'Using R to create a data table',
        questionContent: 'I have something I would like to do in R but I don\'t even know how to begin. I want to create a data table, let\'s say 8 columns wide. I want to set conditions for each column i.e. Maximum of column value 10, 70, 100, 100, 100, 100, 100, 100 Minimum of column value 0, 0, 0, 0, 0, 0, 0, 20 Sum of the row = 100 Steps of say 5. The idea is that each column steps down until the row = 100 and then it moves to the next row.',
      })
      .end((err, res) => {
        res.body.should.have.property('userid');
        res.body.should.have.property('questionid');
        res.body.should.have.property('questiontitle');
        res.body.should.have.property('questioncontent');
        done();
      });
  });
});

describe('/GET', () => {
  it('fetch all questions', (done) => {
    chai.request(server)
      .get('/api/v1/questions')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.questions[0].should.have.property('userid');
        res.body.questions[0].should.have.property('questionid');
        res.body.questions[0].should.have.property('questiontitle');
        res.body.questions[0].should.have.property('questioncontent');
        res.body.questions[0].should.have.property('createdat');
        done();
      });
  });
});

describe('/GET', () => {
  it('fetch a specific question', (done) => {
    chai.request(server)
      .get('/api/v1/questions/1')
      .set('x-auth-token', validToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('userId');
        res.body.should.have.property('questionId');
        res.body.should.have.property('createdAt');
        res.body.should.have.property('questionTitle');
        res.body.should.have.property('answers');
        res.body.should.have.property('questionContent');
        done();
      });
  });
});


describe('/POST', () => {
  it('add an answer to a specific question', (done) => {
    const questionId = 1;
    chai.request(server)
      .post(`/api/v1/questions/${questionId}/answers`)
      .set('content-type', 'application/json')
      .set('x-auth-token', validToken)
      .send({
        answer: 'Here is an answer for this question comming from the TEST file',
      })
      .end((err, res) => {
        console.log(res.body)
        res.body.should.have.property('questionId');
        res.body.should.have.property('userId');
        res.body.should.have.property('answers');
        done();
      });
  });
});
