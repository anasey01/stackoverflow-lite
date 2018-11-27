import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Signup a user', () => {
  it('Should ask for a valid fullname', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Jo3n Doe',
        gender: 'M',
        username: 'John_Doe',
        password: 'password12',
        email: 'johndoe@email.com',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Enter your fullname in this format John Doe');
        done();
      });
  });

  it('Should ask for a valid gender', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'John Doe',
        gender: 'Some other gender',
        username: 'John_Doe',
        password: 'password12',
        email: 'johndoe@email.com',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Invalid gender declaration');
        done();
      });
  });

  it('Should ask for a valid username', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'John Doe',
        gender: 'M',
        username: '',
        password: 'password12',
        email: 'johndoe@email.com',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Enter a valid username');
        done();
      });
  });

  it('Should ask for a valid password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'John Doe',
        gender: 'M',
        username: 'John_Doe',
        password: 'password12231',
        email: 'johndoe@email.com',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('password must be 5 - 10 characters long, start with a letter and contain at least one number. No special characters');
        done();
      });
  });

  it('Should ask for a valid email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'John Doe',
        gender: 'M',
        username: 'John_Doe',
        password: 'password12231',
        email: 'johndoe@email',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('password must be 5 - 10 characters long, start with a letter and contain at least one number. No special characters');
        done();
      });
  });

  it('Should successfully register a user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'John Doe',
        gender: 'M',
        username: 'John_Doe',
        password: 'password12',
        email: 'johndoe@email.com',
      })
      .end((error, response) => {
        console.log(response.body);
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('succesfully registered');
        done();
      });
  });

  it('Should successfully register a new user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Janet Doe',
        gender: 'F',
        username: 'janet_Doe',
        password: 'password12',
        email: 'janet_doe@email.com',
      })
      .end((error, response) => {
        console.log(response.body);
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('succesfully registered');
        done();
      });
  });

  it('should successfully register a new user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Mike Smith',
        gender: 'M',
        username: 'smithMike1',
        password: 'password12',
        email: 'Mike_smith@email.com',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('succesfully registered');
        done();
      });
  });

  it('Should return 400 for user already exists', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'John Doe',
        gender: 'M',
        username: 'John_Doe',
        password: 'password12',
        email: 'johndoe@email.com',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(409);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('User already exists');
        done();
      });
  });

  it('Should ask for valid username', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 56566,
        password: 'password12',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Enter a valid username');
        done();
      });
  });

  it('Should return 200 on successful login', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'John_Doe',
        password: 'password12',
      })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.success.should.equal(true);
        response.body.message.should.equal('Successfully logged in, Welcome back');
        done();
      });
  });
});
