# Survey Service

This is a microservice for managing surveys and survey responses. It provides endpoints for creating surveys, retrieving surveys, and submitting responses.

## Features

- Create surveys with different types of questions (single choice, multiple choice, text)
- Get all surveys or a specific survey by ID
- Submit responses to surveys
- Input validation using Zod
- Authentication using JWT
- MongoDB integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/survey-form
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

### Surveys

- `POST /api/surveys` - Create a new survey (requires authentication)
- `GET /api/surveys` - Get all surveys
- `GET /api/surveys/:id` - Get a specific survey by ID
- `POST /api/surveys/:surveyId/responses` - Submit a response to a survey

## Error Handling

The service includes comprehensive error handling for:
- Invalid input data
- Authentication failures
- Database errors
- Not found resources

## Testing

Run tests:
```bash
npm test
``` 