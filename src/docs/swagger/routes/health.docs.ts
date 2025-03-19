/**
 * Heathcheck API Documentation
 * Swagger/OpenAPI specifications for healthcheck endpoints
 */
export const healthCheckDocs = {
  '/healthcheck': {
    get: {
      tags: ['Health'],
      description: 'Endpoint to check the health of the API and database connection',
      responses: {
        200: {
          description: 'API is running and database connection is successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'API is running and connected to the database.',
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Database connection error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Error connecting to the database.',
                  },
                  error: {
                    type: 'object',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
