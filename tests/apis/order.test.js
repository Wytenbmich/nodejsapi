require('dotenv').config();

const request = require('supertest');

// Set up server
const startServer = require('../../src/config/server');
const app = startServer();

// Start database
const connectToDb = require('../../src/config/database');
const mongoose = require('mongoose');
const database_url = process.env.DATABASE_URL_PRODUCTION;

// Model
const Order = require('../../src/models/order')

//Seed data
const exampleOrder = {
    "id": 1,
    "title": "New Order",
    "date": "20121004",
    "type": "Iphone",
    "customer": "Jimmy"
  }

const exampleOrder2 = {
  "id": 2,
  "title": "New Order",
  "date": "20121004",
  "type": "Iphone",
  "customer": "Sarah"
  }

describe('Orders API', () => {
  beforeAll(async () => {
    await connectToDb(database_url);
  })

  beforeEach(async () => {
    await Order.deleteMany({});
    await Order.create(exampleOrder);
    await Order.create(exampleOrder2);
  })

  afterAll(() => {
    mongoose.connection.close();
  })

  describe('Get /', () => {
    it('should return an array of orders', () => {
      return request(app)
      .get('/orders')      
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expect.arrayContaining([
          expect.objectContaining({})
        ])
        )
      })
    })
  })

  describe('GET /orders/:id', () => {
    describe('when order exists', () => {
      it('should return JSON representation of Order', () => {
        return request(app)
        .get('/orders/1')
        .expect(200)
        .then(response => {
          expect(response.body).toEqual(expect.objectContaining(exampleOrder))
          })
      })
    })

    describe('when order does not exist', () => {
      it('should return 404', () => { 
        return request(app)
        .get('/orders/999999')      
        .expect(404)
      })
    })
  })

  describe('GET /orders/:type/:date', () => {
    describe('when order exists', () => {
      it('should return list of orders belonging to customer', () => {
        return request(app)
        .get('/orders/Iphone/20121004')
        .expect(200)
        .then(response => {
          expect.objectContaining({
            "type": expect.any(String),
            "count": expect.any(Number),
            "orders": expect.arrayContaining([expect.any(String)]),
            "related_customers": expect.arrayContaining([expect.any(String)])
          })
        })
      })
    })

    describe('when order does not exists', () => {
      it('should return 404', () => {
        return request(app)
        .get('/orders/nill/99999999')
        .expect(404)
      })
    })
  })

  describe('POST /', () => {
    it('should create new order', () => {
      return request(app)
      .post('/orders')
      .send({
        "id": 3,
        "title": "New Order",
        "date": "20121004",
        "type": "Iphone",
        "customer": "Sarah"
      })
      .expect(201)
      .then(response => {
        expect.objectContaining({
          "type": expect.any(String),
          "count": expect.any(Number),
          "orders": expect.arrayContaining([expect.any(String)]),
          "related_customers": expect.arrayContaining([expect.any(String)])
        })
      })
    })
  })
})
