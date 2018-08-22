import server from "../../server";
import chai from "chai";
import chaiHttp from "chai-http";

let should  = chai.should();


chai.use(chaiHttp);


describe('/GET', () => {
    it('fetch all questions', (done) => {
        chai.request(server)
            .get('/api/v1/questions')
            .end((err, res) => {
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
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('content');
                done();
            });
    });
});

describe('/POST', () => {
    it('add a question', (done) => {
       chai.request(server)
            .post('/api/v1/questions/')
            .set('content-type', 'application/json')
            .send({
                'title' : 'Help rectify this error',
                'content' : 'This is the nature of the error'
            })
            .end((err, res) => {
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('content');
                done();
            });
    });
});

describe('/POST', () => {
    it('add an answer to a specific question', (done) => {
      chai.request(server)
            .post('/api/v1/questions/1/answers')
            .set('content-type', 'application/json')
            .send({
                'answer' : 'Answer to question'
            })
            .end((err, res) => {
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('content');
                res.body.should.have.property('answers');
                done();
            });
    });
});