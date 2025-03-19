/**
 * Roles API Documentation
 * Swagger/OpenAPI specifications for roles endpoints
 */
export const roleDocs = {
  '/roles': {
    get: {
      tags: ['Roles'],
      description: 'Get all roles',
      responses: {
        200: {
          description: 'List of roles',
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 1,
                },
                roles: {
                  type: 'integer',
                  example: 1,
                },
                permissions: {
                  type: 'string',
                  example: '["read","write"]',
                },
                updated_at: {
                  type: 'string',
                  format: 'date-time',
                },
              },
            },
          },
        },
      },
    },
  },
};
