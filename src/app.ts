/**
 * The main entry point for the Express.js application.
 *
 * This file sets up the Express.js server, configures middleware, and handles error handling.
 * It also synchronizes the Sequelize database connection and starts the server on the specified port.
 */
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import dotenv from 'dotenv';
import sequelize from './config/database';
import routes from './routes';
import { logServerStartup, logServerStartError, logDatabaseSync } from './config/logger'; // Adjust path
import swaggerUi from 'swagger-ui-express';
import docs from './docs/swagger';
import { setupAssociations } from './modules/emails/models/associations';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env['SESSION_SECRET'] as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in production if using HTTPS
  })
);
app.use('/v1', routes);

/**
 * Main Application Entry Point
 * Configures Express application, middleware, and routes
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

/**
 * Global Error Handler
 * Catches and processes all unhandled errors
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});
(async () => {
  try {
    await sequelize.sync();
    logDatabaseSync();

    setupAssociations();
    const port = process.env['API_PORT'] ? parseInt(process.env['API_PORT'], 10) : 4000;
    app.listen(port, () => {
      logServerStartup(port);
    });
  } catch (error) {
    logServerStartError(error);
  }
})();

export { app };
