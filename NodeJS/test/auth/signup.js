process.env.NODE_ENV = 'test';

const expect = require('chai').expect
const request = require('supertest')

const app = require('../../app')
const conn = require('../../database');

describe('PUT /auth/signup', () =>{
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    })
    
    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    })

    it('OK, creating a new note works', (done) => {
        request(app).put('/auth/signup')
          .send({ email: 'vinhthanh.ute@gmail.com', password: "123456", name : 'aaa' })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('userId');
            
            done();
          })
          .catch((err) => done(err));
      });
})