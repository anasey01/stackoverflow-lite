import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

const should = chai.should();

const fakeToken = 'xhyheuihdkhhf.jgjiughbjnberibg.nkgjnoign1jinjifn';
const userOneDetails = {};
const userTwoDetails = {};
const userThreeDetails = {};

chai.use(chaiHttp);

describe('Question Routes', () => {
  it('/GET should return 404 for no questions in the database', (done) => {
    chai.request(server)
      .get('/api/v1/questions')
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('No question from in the database');
        done();
      });
  });

  it('/GET should return 401 for not logged in user', (done) => {
    chai.request(server)
      .get('/api/v1/questions/1')
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Access denied. No token provided.');
        done();
      });
  });

  it('/GET should return 401 for invalid token provided', (done) => {
    chai.request(server)
      .get('/api/v1/questions/1')
      .set('x-auth-token', fakeToken)
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Invalid token.');
        done();
      });
  });

  it('/POST USER should login a user 1 to get a token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'smithMike1',
        password: 'password12',
      })
      .end((error, response) => {
        console.log(response.body);
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('Successfully logged in, Welcome back');
        userOneDetails.token = response.header['x-auth-token'];
        userOneDetails.userId = response.body.userId;
        done();
      });
  });

  it('/POST USER should login a user 2 to get a token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'John_Doe',
        password: 'password12',
      })
      .end((error, response) => {
        console.log(response.body);
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('Successfully logged in, Welcome back');
        userTwoDetails.token = response.header['x-auth-token'];
        userTwoDetails.userId = response.body.userId;
        done();
      });
  });

  it('/POST USER should login a user 3 to get a token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'janet_Doe',
        password: 'password12',
      })
      .end((error, response) => {
        console.log(response.body);
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('Successfully logged in, Welcome back');
        userThreeDetails.token = response.header['x-auth-token'];
        userThreeDetails.userId = response.body.userId;
        done();
      });
  });

  it('/POST should return 400 for invalid question title', (done) => {
    chai.request(server)
      .post('/api/v1/questions')
      .set('x-auth-token', userOneDetails.token)
      .set('content-type', 'application/json')
      .send({
        questionTitle: '      ',
        questionContent: 'I have something I would like to do in R but I don\'t even know how to begin. I want to create a data table, let\'s say 8 columns wide. I want to set conditions for each column i.e. Maximum of column value 10, 70, 100, 100, 100, 100, 100, 100 Minimum of column value 0, 0, 0, 0, 0, 0, 0, 20 Sum of the row = 100 Steps of say 5. The idea is that each column steps down until the row = 100 and then it moves to the next row.',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('invalid question title type entered');
        done();
      });
  });

  it('/POST should return 400 for invalid question content', (done) => {
    chai.request(server)
      .post('/api/v1/questions')
      .set('x-auth-token', userOneDetails.token)
      .set('content-type', 'application/json')
      .send({
        questionTitle: 'Using R to create a data table',
        questionContent: '   ',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('invalid question content entered');
        done();
      });
  });

  it('/POST should return 400 for invalid token', (done) => {
    chai.request(server)
      .post('/api/v1/questions')
      .set('x-auth-token', fakeToken)
      .set('content-type', 'application/json')
      .send({
        questionTitle: 'Using R to create a data table',
        questionContent: 'I have something I would like to do in R but I don\'t even know how to begin. I want to create a data table, let\'s say 8 columns wide. I want to set conditions for each column i.e. Maximum of column value 10, 70, 100, 100, 100, 100, 100, 100 Minimum of column value 0, 0, 0, 0, 0, 0, 0, 20 Sum of the row = 100 Steps of say 5. The idea is that each column steps down until the row = 100 and then it moves to the next row.',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Invalid token.');
        done();
      });
  });

  it('/POST should return 200 on successful post for user 1', (done) => {
    chai.request(server)
      .post('/api/v1/questions')
      .set('x-auth-token', userOneDetails.token)
      .set('content-type', 'application/json')
      .send({
        questionTitle: 'Using R to create a data table',
        questionContent: 'I have something I would like to do in R but I don\'t even know how to begin. I want to create a data table, let\'s say 8 columns wide. I want to set conditions for each column i.e. Maximum of column value 10, 70, 100, 100, 100, 100, 100, 100 Minimum of column value 0, 0, 0, 0, 0, 0, 0, 20 Sum of the row = 100 Steps of say 5. The idea is that each column steps down until the row = 100 and then it moves to the next row.',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('Question posted successfully');
        response.body.should.have.property('question');
        response.body.question.should.have.property('user_id');
        response.body.question.should.have.property('question_id');
        response.body.question.should.have.property('question_title');
        response.body.question.should.have.property('question_content');
        response.body.question.user_id.should.equal(userOneDetails.userId);
        userOneDetails.questionId = response.body.question.question_id;
        done();
      });
  });

  it('/POST should return 200 on successful post for user 2', (done) => {
    chai.request(server)
      .post('/api/v1/questions')
      .set('x-auth-token', userTwoDetails.token)
      .set('content-type', 'application/json')
      .send({
        questionTitle: 'Element after other Element higher on page?',
        questionContent: 'I can\'t get an element to go where I want it to. I am only having this problem because of the way I did my header. I applied position: absoluteProin eu lacus vel nisl vulputate bibendum quis a tortor. Pellentesque imperdiet eu massa ac gravida. Nunc eu metus id elit pulvinar consectetur. Sed vitae elit nec enim molestie lacinia. Donec pellentesque quam sit amet nulla fermentum, nec ornare sem maximus. Proin sit amet lectus varius libero fringilla feugiat et scelerisque urna. Quisque ut porttitor tellus, rhoncus vestibulum nisl. Donec in ornare tellus. Donec sed neque at felis fringilla volutpat. Sed in purus sed velit tempus blandit a eu nisl.',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('Question posted successfully');
        response.body.should.have.property('question');
        response.body.question.should.have.property('user_id');
        response.body.question.should.have.property('question_id');
        response.body.question.should.have.property('question_title');
        response.body.question.should.have.property('question_content');
        response.body.question.user_id.should.equal(userTwoDetails.userId);
        userTwoDetails.questionId = response.body.question.question_id;
        done();
      });
  });

  it('/POST should return 200 on successful post for user 2', (done) => {
    chai.request(server)
      .post('/api/v1/questions')
      .set('x-auth-token', userThreeDetails.token)
      .set('content-type', 'application/json')
      .send({
        questionTitle: 'How can I make a card flip with css click-event using an input box?',
        questionContent: 'I\'m trying to make a card-flip with CSS click-event using an input type that is hidden in the box that every time the user clicks the tile the box will flip and display the content on the back and when the user clicks the back tile it will flip again to the front tile. Cras ornare, lectus et viverra faucibus, neque sapien placerat tortor, eu varius diam ipsum a augue. Fusce sit amet nisl elit. Nullam rutrum eleifend erat, sed iaculis tortor iaculis id. Cras commodo mi et ultrices vulputate. Sed elementum facilisis turpis, ut semper urna laoreet at. Sed id pretium nunc. Aliquam eleifend lectus vel lacus blandit pulvinar. Etiam elementum sem sit amet dolor euismod, id congue lorem blandit. Aliquam fringilla venenatis libero id tincidunt. Quisque id nisi nibh. Aliquam neque nibh, commodo vel ligula vel, placerat blandit diam.',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('Question posted successfully');
        response.body.should.have.property('question');
        response.body.question.should.have.property('user_id');
        response.body.question.should.have.property('question_id');
        response.body.question.should.have.property('question_title');
        response.body.question.should.have.property('question_content');
        response.body.question.user_id.should.equal(userThreeDetails.userId);
        userThreeDetails.questionId = response.body.question.question_id;
        done();
      });
  });

  it('/GET should return 400 for invalid parameter type', (done) => {
    chai.request(server)
      .get('/api/v1/questions/one')
      .set('x-auth-token', userThreeDetails.token)
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('invalid parameter passed! Params for question should be a number');
        done();
      });
  });

  it('/GET should return 404 for question not found', (done) => {
    const id = 100000;
    chai.request(server)
      .get(`/api/v1/questions/${id}`)
      .set('x-auth-token', userThreeDetails.token)
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('No question Found');
        done();
      });
  });

  it('/GET should retieve user 1\'s question successfully', (done) => {
    const id = userOneDetails.questionId;
    chai.request(server)
      .get(`/api/v1/questions/${id}`)
      .set('x-auth-token', userThreeDetails.token)
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('Question retrieved');
        response.body.single.should.have.property('question');
        response.body.single.should.have.property('answer');
        response.body.single.question.should.have.property('user_id');
        response.body.single.question.should.have.property('question_id');
        response.body.single.question.should.have.property('question_title');
        response.body.single.question.should.have.property('question_content');
        response.body.single.question.user_id.should.equal(userOneDetails.userId);
        done();
      });
  });

  it('/DELETE should return 400 for invalid token', (done) => {
    const id = userOneDetails.questionId;
    chai.request(server)
      .delete(`/api/v1/question/${id}`)
      .set('x-auth-token', fakeToken)
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Invalid token.');
        done();
      });
  });

  it('/DELETE should return 400 for invalid parameter passed', (done) => {
    chai.request(server)
      .delete('/api/v1/question/two')
      .set('x-auth-token', userTwoDetails.token)
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('invalid parameter passed! Params for question should be a number');
        done();
      });
  });

  it('/DELETE should return 404 for question not found', (done) => {
    const id = 1000;
    chai.request(server)
      .delete(`/api/v1/question/${id}`)
      .set('x-auth-token', userTwoDetails.token)
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('question does not exisit');
        done();
      });
  });

  it('/DELETE should return 401 for unauthorized to delete a question not yours', (done) => {
    const id = userOneDetails.questionId;
    chai.request(server)
      .delete(`/api/v1/question/${id}`)
      .set('x-auth-token', userTwoDetails.token)
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('you are not the author of this question');
        done();
      });
  });

  it('/DELETE should return 200 for successful delete', (done) => {
    const id = userOneDetails.questionId;
    chai.request(server)
      .delete(`/api/v1/question/${id}`)
      .set('x-auth-token', userOneDetails.token)
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('Question successfully deleted');
        done();
      });
  });
});

export default {
  userOneDetails,
  userThreeDetails,
};
