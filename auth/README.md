# Auth Service

This is a microservice for handling user authentication and authorization. It provides endpoints for user registration, login, and token validation.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- PostgreSQL database integration with TypeORM
- Input validation using Zod

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=survey_form
JWT_SECRET=your-secret-key
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Build the project:
```bash
npm run build
```

3. Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with username and password
- `GET /api/auth/validate` - Validate a JWT token

## Error Handling

The service includes comprehensive error handling for:
- Invalid input data
- Authentication failures
- Database errors
- Duplicate usernames

## Testing

Run tests:
```bash
npm test
``` 