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