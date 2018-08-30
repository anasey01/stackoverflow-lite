import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

let should  = chai.should();

let validToken = '';

chai.use(chaiHttp);

describe('/POST', () => {
  it('signup a new user', (done) => {
    chai.request(server)
      .post('/auth/signup')
      .send({
        fullname: 'Janet Doe',
        gender: 'F',
        username: 'janet_Doe',
        password: 'password',
        email: 'janet_doe@email.com',
      })
      .end((err, res) => {
        console.log('sign up users TEST', res.body)
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
      .post('/auth/login')
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
        title: 'Using R to create a data table',
        content: 'I have something I would like to do in R but I don\'t even know how to begin. I want to create a data table, let\'s say 8 columns wide. I want to set conditions for each column i.e. Maximum of column value 10, 70, 100, 100, 100, 100, 100, 100 Minimum of column value 0, 0, 0, 0, 0, 0, 0, 20 Sum of the row = 100 Steps of say 5. The idea is that each column steps down until the row = 100 and then it moves to the next row.',
      })
      .end((err, res) => {
        console.log('Add a question from test', res.body);
        res.body.should.have.property('id');
        res.body.should.have.property('title');
        res.body.should.have.property('content');
        done();
      });
  });
});

describe('/GET', () => {
  it('fetch all questions', (done) => {
    chai.request(server)
      .get('/api/v1/questions')
      .end((err, res) => {
        console.log('Fetch all question TEST', res.body);
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('title');
        res.body[0].should.have.property('content');
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
        console.log('Fetch a specific Question TEST', res.body);
        res.should.have.status(200);
        res.body.should.have.property('id');
        res.body.should.have.property('title');
        res.body.should.have.property('content');
        done();
      });
  });
});


describe('/POST', () => {
  it('add an answer to a specific question', (done) => {
    const id = 1;
    chai.request(server)
      .post(`/api/v1/questions/${id}/answers`)
      .set('content-type', 'application/json')
      .set('x-auth-token', validToken)
      .send({
        answer: 'Here is an answer for this question comming from the TEST file',
      })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.have.property('id');
        res.body.should.have.property('answers');
        done();
      });
  });
});
