import { authDocs } from './routes/auth.docs';
import { healthCheckDocs } from './routes/health.docs';
import { productDocs } from './routes/products.docs';
import { roleDocs } from './routes/role.docs';

/**
 * Swagger/OpenAPI documentation
 * @description This file contains the Swagger/OpenAPI documentation for the API.
 */
const docs = {
  openapi: '3.0.0',
  info: {
    title: 'Node Sample API',
    version: '1.0.0',
    description: 'API Documentation for Node Sample API',
  },
  servers: [
    {
      url: 'http://localhost:4000/v1/',
      description: 'Local server',
    },
    {
      url: 'https://brainytech-2.0.vercel.app/v1/',
      description: 'Staging server',
    },
    {
      url: 'https://brainytech-2.0-git-main-brainytech-2-0.vercel.app/v1/',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  schemas: {
    Error: {
      type: 'object',
      properties: {
        httpStatusCode: {
          type: 'integer',
          format: 'int32',
        },
        errorCode: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
        status: {
          type: 'integer',
          format: 'int32',
        },
      },
    },
    Delete: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    ...authDocs,
    ...healthCheckDocs,
    ...roleDocs,
    ...productDocs,
  },
};

export default docs;
