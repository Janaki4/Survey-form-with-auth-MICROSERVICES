# Survey Form Microservices

A microservices-based survey form application with authentication and survey management.

## Services

### Auth Service (Port 3000)

Handles authentication for admin users only. Regular survey users remain anonymous for privacy, while admins require authentication to manage surveys and view responses.

**APIs:**

- **POST** `/api/auth/register`
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **POST** `/api/auth/login`
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **POST** `/api/auth/refresh` - Refresh access token using refresh token

- **GET** `/api/auth/validate` - Validate access token

### Survey Service (Port 3001)

Manages surveys and responses.

**APIs:**

- **POST** `/api/surveys` - Create a new survey (requires auth)
  ```json
  {
    "title": "string",
    "description": "string",
    "questions": [
      {
        "text": "string",
        "type": "single_choice|multiple_choice|text",
        "options": ["string"],
        "required": boolean
      }
    ]
  }
  ```

- **GET** `/api/surveys/:id` - Get a specific survey

- **POST** `/api/surveys/:surveyId/responses` - Submit a survey response
  ```json
  {
    "answers": [
      {
        "questionId": "string",
        "value": "string | array"
      }
    ]
  }
  ```

- **GET** `/api/surveys` - Get all surveys

## Running with Docker

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Stop all services:**
   ```bash
   docker-compose down
   ```

## Environment Variables

### Auth Service

- `PORT=3000`
- `DB_HOST=postgres`
- `DB_PORT=5432`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=postgres`
- `DB_NAME=survey_form`
- `JWT_SECRET=your-secret-key`

### Survey Service

- `PORT=3001`
- `MONGODB_URI=mongodb://mongodb:27017/survey-form`
- `JWT_SECRET=your-secret-key`

## Note

⚠️ **For development purposes only.** Production deployment requires proper security measures.
