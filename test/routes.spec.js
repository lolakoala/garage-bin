const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);

chai.use(chaiHttp);
