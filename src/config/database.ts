import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database Configuration
 * Configures Sequelize ORM connection to the database
 */

/**
 * Database Configuration Interface
 * Defines the structure of the database configuration
 */
interface DatabaseConfig {
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  dialectOptions: object;
}

/**
 * Database Configuration Object
 * Uses environment variables for database credentials and settings
 */
const dbConfig: DatabaseConfig = {
  DB_NAME: process.env['DB_NAME'] as string,
  DB_USER: process.env['DB_USER'] as string,
  DB_PASSWORD: process.env['DB_PASSWORD'] as string,
  DB_HOST: process.env['DB_HOST'] as string,
  dialectOptions: {
    charset: 'utf8mb4',
  },
};

/**
 * Sequelize instance configuration
 * Uses environment variables for database credentials and settings
 */
const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: 'mysql',
  dialectOptions: dbConfig.dialectOptions,
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
