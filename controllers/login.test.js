/*
Condition:
1. A successful response should have a status code 200.
2. The response should return a token.
3. The response should return an object with two fields: email and subscription with the data type String.
*/

import mongoose from 'mongoose';
import request from 'supertest';

import authController from './auth-controller.js';
import app from '../app.js';

import 'dotenv/config';

const { DB_HOST, PORT } = process.env;
const { login } = authController;

describe('test login controller', () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test('should respond with status code 200 and return a token and user object', async () => {
    const response = await request(app).post('/users/login', login).send({
      email: 'example@example.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });
});
