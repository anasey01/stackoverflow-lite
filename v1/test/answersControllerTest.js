import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import users from './questionControllerTest';

const should = chai.should();
chai.use(chaiHttp);

// describe('Answer Routes', () => {
//     it('should return 200 for adding an answer to a question', (done) => {
//         console.log(users);
//         chai.request(server)
//         .post('/api/v1/questions/${}/answers')
//         .set('x-auth-token', )
//         .send({
//             answer: 'This is an answer to your question'
//         })
//         .end((err, response) => {
//             if(error) done(error);

//         })
//     });
// });