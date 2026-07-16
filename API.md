# TaskFlow API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### Authentication

#### Register
- **POST** `/auth/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "secure_password",
    "name": "John Doe"
  }
  ```
- **Response**: `201 Created`

#### Login
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "secure_password"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGc...",
    "user": { "id": 1, "email": "...", "name": "..." }
  }
  ```

---

### Tasks

#### Create Task
- **POST** `/tasks` (Protected)
- **Body**:
  ```json
  {
    "title": "Design homepage",
    "description": "Create mockups for the homepage",
    "teamId": 1,
    "priority": "high",
    "dueDate": "2024-12-31"
  }
  ```
- **Response**: `201 Created`

#### Get Team Tasks
- **GET** `/tasks/team/:teamId` (Protected)
- **Response**: `200 OK` - Array of tasks

#### Get Task
- **GET** `/tasks/:taskId` (Protected)
- **Response**: `200 OK` - Task object

#### Update Task
- **PUT** `/tasks/:taskId` (Protected)
- **Body**:
  ```json
  {
    "title": "Updated title",
    "status": "in-progress",
    "priority": "medium"
  }
  ```
- **Response**: `200 OK`

#### Delete Task
- **DELETE** `/tasks/:taskId` (Protected)
- **Response**: `200 OK`

#### Assign Task
- **POST** `/tasks/:taskId/assign/:userId` (Protected)
- **Response**: `200 OK`

---

### Teams

#### Create Team
- **POST** `/teams` (Protected)
- **Body**:
  ```json
  {
    "name": "Development Team",
    "description": "Backend development team"
  }
  ```
- **Response**: `201 Created`

#### Get My Teams
- **GET** `/teams` (Protected)
- **Response**: `200 OK` - Array of teams

#### Add Team Member
- **POST** `/teams/:teamId/members` (Protected)
- **Body**:
  ```json
  {
    "userId": 2
  }
  ```
- **Response**: `200 OK`

---

### Users

#### Get Profile
- **GET** `/users/me` (Protected)
- **Response**: `200 OK` - User object

#### Update Profile
- **PUT** `/users/me` (Protected)
- **Body**:
  ```json
  {
    "name": "New Name"
  }
  ```
- **Response**: `200 OK`

#### Get User
- **GET** `/users/:userId` (Protected)
- **Response**: `200 OK` - User object

---

### Payments

#### Subscribe
- **POST** `/payments/subscribe` (Protected)
- **Body**:
  ```json
  {
    "plan": "pro",
    "paymentMethodId": "pm_..."
  }
  ```
- **Response**: `200 OK`

#### Get Invoices
- **GET** `/payments/invoices` (Protected)
- **Response**: `200 OK` - Array of invoices

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

- Free plan: 100 requests/hour
- Pro plan: 1000 requests/hour
- Enterprise: Unlimited

---

## Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Server Error |