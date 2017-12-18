const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {

  it.skip('should return the homepage with text', () => {
    return chai.request(server)
      .get('/')
      .then(response => {
        response.should.have.status(200);
        response.should.be.html;
      })
      .catch(error => {
        throw (error);
      });
  });

  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
      .get('/sad')
      .then(response => {
        response.should.have.status(404);
      })
      .catch(error => {
        throw (error);
      });
  });
});

describe('API Routes', done => {
  before((done) => {
    knex.migrate.latest()
      .then(() => done())
      .catch(error => { throw error; });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => done())
      .catch(error => { throw error; });
  });

  describe('GET /api/v1/garageItems', () => {
    it('should return all garage items', () => {
      return chai.request(server)
        .get('/api/v1/garageItems')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('id');
          response.body[0].name.should.equal('test-basketball');
          response.body[0].should.have.property('reasonForLingering');
          response.body[0].reasonForLingering.should.equal('momento from highschool games');
          response.body[0].should.have.property('itemCleanliness');
          response.body[0].itemCleanliness.should.equal('Dusty');
        })
        .catch(error => { throw error; });
    });
  });
});
