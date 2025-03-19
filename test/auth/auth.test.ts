import request from 'supertest';
import { app } from '../../src/app';
import { resetDatabase, closeDatabase } from '../helpers/database';

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe('POST /v1/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app).post('/v1/auth/register').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Test@123',
        first_name: 'Test',
        last_name: 'User',
        display_name: 'Test User',
        gender: 'male',
        date_of_birth: '1990-01-01',
        contact_no: '1234567890',
        driving_licance: 'DL123456',
        user_status: '1',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });
});
