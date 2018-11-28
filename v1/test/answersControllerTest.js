import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import users from './questionControllerTest';

const should = chai.should();
chai.use(chaiHttp);
const userTwo= {};

describe('Answer Routes', () => {
    it('should return 200 for adding an answer to a question', (done) => {
        chai.request(server)
        .post(`/api/v1/questions/${users.userThreeDetails.questionId}/answers`)
        .set('x-auth-token', users.userTwoDetails.token)
        .send({
            answer: 'This is an answer to your question'
        })
        .end((err, response) => {
            if(err) done(err);
            response.should.have.status(200);
            response.body.message.should.equal('successfully added your answer');
            response.body.should.have.property('answerInfo');
            userTwo.answerNumber = response.body.answerInfo.answer_number;
            done();
        })
    });
    it('should return 400 for providing invalid params', (done) => {
        const invalidParams = 'three';
        chai.request(server)
        .post(`/api/v1/questions/${invalidParams}/answers`)
        .set('x-auth-token', users.userThreeDetails.token)
        .send({
            answer: 'This is an answer to your question'
        })
        .end((err, response) => {
            if(err) done(err);
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.success.should.be.equal(false);
            response.body.message.should.equal('invalid parameter passed! Params for question should be a number');
            done();
        })
    });

    it('should return 404 for non existing question', (done) => {
        const nonExistingQuestion = 10000;
        chai.request(server)
        .post(`/api/v1/questions/${nonExistingQuestion}/answers`)
        .set('x-auth-token', users.userThreeDetails.token)
        .send({
            answer: 'This is an answer to your question'
        })
        .end((err, response) => {
            if(err) done(err);
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.success.should.be.equal(false);
            response.body.message.should.equal('question does not exisit');
            done();
        })
    });

    it('should return 403 for authors answering their question', (done) => {
        chai.request(server)
        .post(`/api/v1/questions/${users.userThreeDetails.questionId}/answers`)
        .set('x-auth-token', users.userThreeDetails.token)
        .send({
            answer: 'This is an answer to your question'
        })
        .end((err, response) => {
            if(err) done(err);
            response.should.have.status(403);
            response.body.should.be.a('object');
            response.body.success.should.be.equal(false);
            response.body.message.should.equal('sorry, you\'re not allowed to answer your question!');
            done();
        })
    });

    it('should return 200 for successfully editing answer', (done) =>{
        chai.request(server)
        .put(`/api/v1/questions/${users.userThreeDetails.questionId}/answers/${userTwo.answerNumber}`)
        .set('x-auth-token', users.userTwoDetails.token)
        .send({
            answer: 'An upsated answer',
        })
        .end((err, response) => {
            if(err) done(err);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.success.should.be.equal(true);
            response.body.message.should.equal('answer successfully updated.');
            done();
        });
    });

    it('should return 400 for invalid parameters', (done) =>{
        const invalidParams = 'three';
        chai.request(server)
        .put(`/api/v1/questions/${invalidParams}/answers/${userTwo.answerNumber}`)
        .set('x-auth-token', users.userTwoDetails.token)
        .send({
            answer: 'An upsated answer',
        })
        .end((err, response) => {
            if(err) done(err);
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.success.should.be.equal(false);
            response.body.message.should.equal('invalid parameter passed! Params for question should be a number');
            done();
        });
    });

    it('should return 400 for invalid parameters', (done) =>{
        const invalidParams = 'three';
        chai.request(server)
        .put(`/api/v1/questions/${users.userThreeDetails.questionId}/answers/${invalidParams}`)
        .set('x-auth-token', users.userTwoDetails.token)
        .send({
            answer: 'An upsated answer',
        })
        .end((err, response) => {
            if(err) done(err);
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.success.should.be.equal(false);
            response.body.message.should.equal('invalid parameter passed! params for answer should be a number');
            done();
        });
    });

    it('should return 404 for no question found', (done) =>{
        const nonExistingQuestion = 10000;
        chai.request(server)
        .put(`/api/v1/questions/${nonExistingQuestion}/answers/${userTwo.answerNumber}`)
        .set('x-auth-token', users.userTwoDetails.token)
        .send({
            answer: 'An upsated answer',
        })
        .end((err, response) => {
            if(err) done(err);
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.success.should.be.equal(false);
            response.body.message.should.equal('question does not exisit');
            done();
        });
    });

    it('should return 404 for no question found', (done) =>{
        const nonExistingAnswer = 10000;
        chai.request(server)
        .put(`/api/v1/questions/${users.userThreeDetails.questionId}/answers/${nonExistingAnswer}`)
        .set('x-auth-token', users.userTwoDetails.token)
        .send({
            answer: 'An upsated answer',
        })
        .end((err, response) => {
            if(err) done(err);
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.success.should.be.equal(false);
            response.body.message.should.equal('sorry, answer you requested for was not found');
            done();
        });
    });

    it('should return 200 for successfully editing answer', (done) =>{
        chai.request(server)
        .put(`/api/v1/questions/${users.userThreeDetails.questionId}/answers/${userTwo.answerNumber}`)
        .set('x-auth-token', users.userThreeDetails.token)
        .send({
            answer: 'An updated answer',
        })
        .end((err, response) => {
            if(err) done(err);
            response.should.have.status(403);
            response.body.should.be.a('object');
            response.body.success.should.be.equal(false);
            response.body.message.should.equal('not autorized to perform any operation on this answer');
            done();
        });
    });
});