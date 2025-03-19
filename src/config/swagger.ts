import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Sample API',
      version: '1.0.0',
      description: 'API Documentation for Sample API',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local server',
      },
      {
        url: 'https://brainytech-2.0.vercel.app',
        description: 'Staging server',
      },
      {
        url: 'https://brainytech-2.0-git-main-brainytech-2-0.vercel.app',
        description: 'Production server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export default specs;
