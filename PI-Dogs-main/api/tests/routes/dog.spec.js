/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height: '12',
  weight: '18',
  life_span: '15',
};

const newDog = {
  name: 'Chihuahua',
  height: '10 - 14',
  weight: '8 - 15',
  life_span: '16',
};

const newDogWithoutHeight = {
  name: 'Shiba',
  weight: '7 - 12',
  life_span: '18',
};

describe('Dogs routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () => agent.get('/dogs').expect(200));
  });
});

describe('Routes', () => {
  describe('GET /dogs', () => {
    it('expecting 200 as response', () => agent.get('/dogs').expect(200));
  });

  describe('GET /dogs?name=terrier', () => {
    it('expecting 200 when terrier is the name searched', () =>
      agent.get('/dogs?name=terrier').expect(200));
  });

  describe('GET /dogs?name=nonExistingName', () => {
    it('expecting 404 when the name searched doesnt exist', () =>
      agent.get('/dogs?name=nonExistingName').expect(404));
  });

  describe('GET /dogs/:id', () => {
    it('expecting 200 when the id searched exists', () => agent.get('/dogs/4').expect(200));
  });

  describe('GET /dogs/:id', () => {
    it('expecting 404 when the id searched doesnt exist', () => agent.get('/dogs/304').expect(404));
  });

  describe('GET /temperament', () => {
    it('expecting 200 as response', () => agent.get('/temperament').expect(200));
  });

  describe('GET /nonExistingRoute', () => {
    it('expecting 404 as response', () => agent.get('/nonExistingRoute').expect(404));
  });

  describe('POST /dog', () => {
    it('expecting 200 as response with a successful post', () =>
      agent.post('/dog').send(newDog).expect(200));
  });

  describe('POST /dog', () => {
    it('expecting 400 as response with a unsuccessful post', () =>
      agent.post('/dog').send(newDogWithoutHeight).expect(400));
  });
});
