import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

const should = chai.should();

let firstUserValidToken = '';
let secondUserValidToken = '';
let thirdUserValidToken = '';

chai.use(chaiHttp);

describe('/POST', () => {
  it('Signup User 1', (done) => {
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
  it('Signup User 2', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Mike Smith',
        gender: 'M',
        username: 'smithMike1',
        password: 'password',
        email: 'Mike_smith@email.com',
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
  it('Signup User 3', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Oluseyi Michael',
        gender: 'M',
        username: 'anasey001',
        password: 'password',
        email: 'anasey@email.com',
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
  it('Login User 1 and issue a valid TOKEN', (done) => {
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
        firstUserValidToken = res.header['x-auth-token'];
        done();
      });
  });
});

describe('/POST', () => {
  it('Login User 2 and issue a valid TOKEN', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'smithMike1',
        password: 'password',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
        res.body.message.should.equal('Successfully logged in');
        secondUserValidToken = res.header['x-auth-token'];
        done();
      });
  });
});

describe('/POST', () => {
  it('Login User 3 and issue a valid TOKEN', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'anasey001',
        password: 'password',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
        res.body.message.should.equal('Successfully logged in');
        thirdUserValidToken = res.header['x-auth-token'];
        done();
      });
  });
});

describe('/POST', () => {
  it('Add a question by User 1', (done) => {
    chai.request(server)
      .post('/api/v1/questions/')
      .set('x-auth-token', firstUserValidToken)
      .set('content-type', 'application/json')
      .send({
        questionTitle: 'Using R to create a data table',
        questionContent: 'I have something I would like to do in R but I don\'t even know how to begin. I want to create a data table, let\'s say 8 columns wide. I want to set conditions for each column i.e. Maximum of column value 10, 70, 100, 100, 100, 100, 100, 100 Minimum of column value 0, 0, 0, 0, 0, 0, 0, 20 Sum of the row = 100 Steps of say 5. The idea is that each column steps down until the row = 100 and then it moves to the next row.',
      })
      .end((err, res) => {
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        res.body.should.have.property('success');
        res.body.message.should.equal('question successfully created');
        res.body.should.have.property('userId');
        res.body.should.have.property('questionId');
        res.body.should.have.property('questionTitle');
        res.body.should.have.property('questionContent');
        done();
      });
  });
});

describe('/POST', () => {
  it('Add a question by User 2', (done) => {
    chai.request(server)
      .post('/api/v1/questions/')
      .set('x-auth-token', secondUserValidToken)
      .set('content-type', 'application/json')
      .send({
        questionTitle: 'Element after other Element higher on page?',
        questionContent: 'I can\'t get an element to go where I want it to. I am only having this problem because of the way I did my header. I applied position: absolute',
      })
      .end((err, res) => {
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        res.body.should.have.property('success');
        res.body.message.should.equal('question successfully created');
        res.body.should.have.property('userId');
        res.body.should.have.property('questionId');
        res.body.should.have.property('questionTitle');
        res.body.should.have.property('questionContent');
        done();
      });
  });
});

describe('/POST', () => {
  it('Add a question by User 3', (done) => {
    chai.request(server)
      .post('/api/v1/questions/')
      .set('x-auth-token', thirdUserValidToken)
      .set('content-type', 'application/json')
      .send({
        questionTitle: 'How can I make a card flip with css click-event using an input box?',
        questionContent: 'I\'m trying to make a card-flip with CSS click-event using an input type that is hidden in the box that every time the user clicks the tile the box will flip and display the content on the back and when the user clicks the back tile it will flip again to the front tile.',
      })
      .end((err, res) => {
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        res.body.should.have.property('success');
        res.body.message.should.equal('question successfully created');
        res.body.should.have.property('userId');
        res.body.should.have.property('questionId');
        res.body.should.have.property('questionTitle');
        res.body.should.have.property('questionContent');
        done();
      });
  });
});


describe('/GET', () => {
  it('Fetch All Questions', (done) => {
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
  it('User 1 Fetch A Specific Question - Question 2', (done) => {
    chai.request(server)
      .get('/api/v1/questions/2')
      .set('x-auth-token', firstUserValidToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('userId');
        res.body.should.have.property('questionId');
        res.body.should.have.property('createdAt');
        res.body.should.have.property('questionTitle');
        res.body.should.have.property('questionContent');
        done();
      });
  });
});


describe('/POST', () => {
  it('User 1 Add an Answer to Specific Question - User 2 Question', (done) => {
    const questionId = 2;
    chai.request(server)
      .post(`/api/v1/questions/${questionId}/answers`)
      .set('content-type', 'application/json')
      .set('x-auth-token', firstUserValidToken)
      .send({
        answer: 'A simple solution to this issue is to remove the position: fixed; top: 0; and adjust the margin-top and margin-bottom of the page. ',
      })
      .end((err, res) => {
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        res.body.answerInfo.should.have.property('answerid');
        res.body.answerInfo.should.have.property('accepted');
        res.body.answerInfo.should.have.property('upvotes');
        res.body.answerInfo.should.have.property('downvotes');
        res.body.answerInfo.should.have.property('questionid');
        res.body.answerInfo.should.have.property('userid');
        res.body.should.have.property('message');
        res.body.message.should.equal('Your answer has been successfully added');
        res.body.should.have.property('answerInfo');
        done();
      });
  });
});

describe('/PUT', () => {
  it('User 1 Updates Answer to User 2\'s Question', (done) => {
    const questionId = 2;
    const answerNumber = 1;
    chai.request(server)
      .put(`/api/v1/questions/${questionId}/answers/${answerNumber}`)
      .set('content-type', 'application/json')
      .set('x-auth-token', firstUserValidToken)
      .send({
        answer: 'UPDATED - A simple solution to this issue is to remove the position: fixed; top: 0; and adjust the margin-top and margin-bottom of the page.',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.success.should.equal(true);
        res.body.message.should.equal('Your answer has been updated');
        done();
      });
  });
});

describe('PUT', () => {
  it('User 2 marks User 1 answer as approved', (done) => {
    const questionId = 2;
    const answerNumber = 1;
    chai.request(server)
      .put(`/api/v1/questions/${questionId}/answers/${answerNumber}`)
      .set('content-type', 'application/json')
      .set('x-auth-token', secondUserValidToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        res.body.should.have.property('message');
        res.body.message.should.equal('Answer marked as approved!');
        done();
      });
  });
});

describe('/DELETE', () => {
  it('User 3 Deletes his/her Question', (done) => {
    const questionId = 3;
    chai.request(server)
      .delete(`/api/v1/questions/${questionId}`)
      .set('content-type', 'application/json')
      .set('x-auth-token', firstUserValidToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.success.should.equal(true);
        res.body.message.should.equal('Question deleted!');
        done();
      });
  });
});
