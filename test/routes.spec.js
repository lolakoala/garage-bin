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

  describe('GET /api/v1/garageItems/:id', () => {
    it('should return item with matching id', () => {
      return chai.request(server)
        .get('/api/v1/garageItems/1')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
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

    it('should return 404 if no item found', () => {
      return chai.request(server)
        .get('/api/v1/garageItems/10987')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('No items with the id of 10987 found.');
        });
    });
  });

  describe('POST /api/v1/garageItems', () => {
    it('should add new garage item and return 204', () => {
      return chai.request(server)
        .post('/api/v1/garageItems')
        .send({
          name: 'suitcase full of cotton balls',
          reasonForLingering: 'I am a bit eccentric',
          itemCleanliness: 'Sparkling',
          id: 5
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
        })
        .catch(error => { throw error; });
    });

    it('should return 422 if you are missing parameters', () => {
      return chai.request(server)
        .post('/api/v1/garageItems')
        .send({
          name: 'suitcase full of cotton balls',
          reasonForLingering: 'I am a bit eccentric',
          id: 5
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
        })
        .catch(error => { throw error; });
    });
  });

  describe('PATCH /api/v1/garageItems/:id', () => {
    it('should update item and send 204 status', () => {
      return chai.request(server)
        .patch('/api/v1/garageItems/2')
        .send({
          name: 'dirty socks'
        })
        .then(response => {
          response.should.have.status(204);
        })
        .catch(error => { throw error; });
    });

    it('should send 404 if no item matches id', () => {
      return chai.request(server)
        .patch('/api/v1/garageItems/10987')
        .send({
          name: 'dirty socks'
        })
        .then(response => {
          response.should.have.status(404);
          response.body.should.be.a('object');
          response.body.error.should.contain(`Cannot find an item with the id of 10987.`);
        })
        .catch(error => { throw error; });
    });
  });
});
