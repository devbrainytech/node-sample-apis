/**
 * Product API Documentation
 * Swagger/OpenAPI specifications for product endpoints
 */
export const productDocs = {
  '/products': {
    get: {
      tags: ['Products'],
      description: 'Get all products',
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: {
            type: 'integer',
          },
          description: 'Page number',
        },
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
          },
          description: 'Number of items per page',
        },
        {
          in: 'query',
          name: 'search',
          schema: {
            type: 'string',
          },
          description: 'Search term',
        },
        {
          in: 'query',
          name: 'sort',
          schema: {
            type: 'string',
          },
          description: 'Sort field',
        },
        {
          in: 'query',
          name: 'sortOrder',
          schema: {
            type: 'string',
            enum: ['asc', 'desc'],
          },
          description: 'Sort order',
        },
        {
          in: 'query',
          name: 'status',
          schema: {
            type: 'string',
          },
          description: 'Product status',
        },
        {
          in: 'query',
          name: 'categoryId',
          schema: {
            type: 'integer',
          },
          description: 'Category ID',
        },
        {
          in: 'query',
          name: 'type',
          schema: {
            type: 'string',
          },
          description: 'Product type',
        },
      ],
      responses: {
        200: {
          description: 'List of products',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  products: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product',
                    },
                  },
                  total: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Error fetching products',
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['Products'],
      description: 'Create a new product',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Product created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Error creating product',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/products/{id}': {
    get: {
      tags: ['Products'],
      description: 'Get a product by ID',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
          },
          description: 'Product ID',
        },
      ],
      responses: {
        200: {
          description: 'Product data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
        404: {
          description: 'Product not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Product not found',
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Error fetching product',
                  },
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: ['Products'],
      description: 'Update a product by ID',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
          },
          description: 'Product ID',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Product updated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
        404: {
          description: 'Product not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Product not found',
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Error updating product',
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Products'],
      description: 'Delete a product by ID',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
          },
          description: 'Product ID',
        },
      ],
      responses: {
        200: {
          description: 'Product deleted',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Product deleted successfully',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Product not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Product not found',
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Error deleting product',
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
