import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const testSequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env['DB_HOST'] || 'localhost',
  username: process.env['DB_USER'] || 'root',
  password: process.env['DB_PASSWORD'] || '',
  database: process.env['DB_NAME'] || 'brainytech_test_db',
  logging: false,
});

export default testSequelize;
