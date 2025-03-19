# Node Sample API

## Prerequisites

- Node.js (v20 or higher)
- MySQL
- npm

## Local Setup

1. Clone the repository

```bash
git clone https://github.com/s2lieberman/node-sample-apis.git
cd node-sample-apis
```

2. Install dependencies

```bash
npm install
```

3. Create .env file in root directory

```env
PORT=4000
HOST=localhost

# Database Configuration
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
```

4. Database Setup

- Create a MySQL database with the name specified in your .env
- The application will handle table creation and synchronization

5. Start Development Server

```bash
npm run dev
```

6. Start Production Server

```bash
npm run start
```

## API Documentation

Swagger documentation is available at:

- UI: http://localhost:4000/api-docs
- JSON: http://localhost:4000/api-docs.json

## Available Scripts

- `npm run dev`: Starts development server with hot reload
- `npm run start`: Starts production server
- `npm run swagger-autogen`: Generates Swagger documentation

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── docs/          # API documentation
├── models/        # Database models
├── routes/        # API routes
└── app.ts       # Application entry point
```

## Health Check

Test the API health:

```bash
curl http://localhost:4000/v1/healthcheck
```

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request
