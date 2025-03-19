/**
 * Authentication API Documentation
 * Swagger/OpenAPI specifications for auth endpoints
 */
export const authDocs = {
  '/auth/login': {
    post: {
      tags: ['Authentication'],
      summary: 'User Login',
      description: 'Authenticate user and return JWT token',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'brainytech@yopmail.com',
                },
                password: {
                  type: 'string',
                  format: 'password',
                  example: 'Admin@1234',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'success',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      token: {
                        type: 'string',
                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                      },
                      user: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'number',
                            example: 1,
                          },
                          email: {
                            type: 'string',
                            example: 'brainytech@yopmail.com',
                          },
                          display_name: {
                            type: 'string',
                            example: 'BrainyTech Admin',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Invalid credentials',
        },
      },
    },
  },
  '/auth/register': {
    post: {
      tags: ['Authentication'],
      summary: 'User Registration',
      description: 'Register a new user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: [
                'username',
                'email',
                'password',
                'display_name',
                'gender',
                'date_of_birth',
                'contact_no',
                'driving_licance',
              ],
              properties: {
                username: {
                  type: 'string',
                  example: 'brainytech_user',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'user@example.com',
                },
                password: {
                  type: 'string',
                  example: 'Password@123',
                },
                first_name: {
                  type: 'string',
                  example: 'John',
                },
                last_name: {
                  type: 'string',
                  example: 'Doe',
                },
                display_name: {
                  type: 'string',
                  example: 'John Doe',
                },
                gender: {
                  type: 'string',
                  enum: ['male', 'female', 'other', 'prefer_not_to_say'],
                  example: 'male',
                },
                date_of_birth: {
                  type: 'string',
                  format: 'date',
                  example: '1990-01-01',
                },
                contact_no: {
                  type: 'string',
                  example: '9876543210',
                },
                driving_licance: {
                  type: 'string',
                  example: 'DL123456',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User registered successfully',
        },
        409: {
          description: 'Email or username already exists',
        },
      },
    },
  },
  '/auth/forgot-password': {
    post: {
      tags: ['Authentication'],
      summary: 'Forgot Password',
      description: 'Send password reset instructions to email',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'user@example.com',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Password reset instructions sent',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
  '/auth/reset-password': {
    post: {
      tags: ['Authentication'],
      summary: 'Reset Password',
      description: 'Reset user password using token',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['token', 'password'],
              properties: {
                token: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
                password: {
                  type: 'string',
                  format: 'password',
                  example: 'NewPass@123',
                  description:
                    'Minimum 8 characters, must contain uppercase, number and special character',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Password reset successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'success',
                  },
                  message: {
                    type: 'string',
                    example: 'Password reset successful',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid input or expired token',
        },
        500: {
          description: 'Server error',
        },
      },
    },
  },
  'auth/verify-email': {
    post: {
      tags: ['Authentication'],
      summary: 'Verify Email',
      description: 'Verify user email using token',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'otp'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'user@example.com',
                },
                otp: {
                  type: 'string',
                  example: '123456',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Email verified successfully',
        },
        400: {
          description: 'Invalid input or expired token',
        },
        500: {
          description: 'Server error',
        },
      },
    },
  },
};
