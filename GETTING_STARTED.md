# Getting Started with TaskFlow API

## Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Stripe account (for payments)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/taskflow-api.git
cd taskflow-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and fill in your configuration:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_this

DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskflow
DB_USER=postgres
DB_PASSWORD=postgres

STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
```

### 4. Database Setup

#### Option A: Using Docker Compose (Recommended)
```bash
docker-compose up -d
```

This will:
- Start PostgreSQL container
- Start the TaskFlow API container
- Run all migrations automatically

#### Option B: Manual Setup
```bash
# Create database
creatdb taskflow -U postgres

# Run migrations
npm run migrate
```

### 5. Start Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Project Structure

```
taskflow-api/
├── src/
│   ├── index.js              # App entry point
│   ├── config/               # Configuration files
│   │   └── database.js
│   ├── models/               # Database models
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   ├── teams.js
│   │   ├── users.js
│   │   └── payments.js
│   └── middleware/           # Custom middleware
│       ├─��� auth.js
│       └── errorHandler.js
├── migrations/               # Database migrations
├── tests/                    # Test files
├── docker-compose.yml        # Docker configuration
├── package.json              # Dependencies
└── .env.example              # Environment template
```

## Quick API Test

### 1. Register User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

Copy the returned `token` for next requests.

### 3. Create Team
```bash
curl -X POST http://localhost:3000/api/v1/teams \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Team",
    "description": "My awesome team"
  }'
```

### 4. Create Task
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build landing page",
    "description": "Create the initial landing page",
    "teamId": 1,
    "priority": "high",
    "dueDate": "2024-12-31"
  }'
```

## Running Tests

```bash
npm test
```

## Building for Production

### Docker Build
```bash
docker build -t taskflow-api:latest .
docker run -p 3000:3000 taskflow-api:latest
```

### Manual Build
```bash
npm run build
npm start
```

## Configuration Guide

### Database
Edit `src/config/database.js` to change connection settings.

### Stripe Integration
See [STRIPE_SETUP.md](./STRIPE_SETUP.md) for detailed setup instructions.

### JWT Secret
Generate a strong secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Deployment

### Heroku
```bash
heroku create taskflow-api
git push heroku main
heroku config:set JWT_SECRET=your_secret_here
```

### Docker
```bash
docker push yourusername/taskflow-api:latest
```

## Troubleshooting

### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Make sure PostgreSQL is running and `.env` has correct credentials.

### Token Expired
```
Error: Invalid or expired token
```
**Solution**: Login again to get a fresh token. Tokens expire after 24 hours.

### Database Not Found
```
Error: database "taskflow" does not exist
```
**Solution**: Run `npm run migrate` or create database manually:
```bash
creatdb taskflow -U postgres
```

## Next Steps

1. ✅ Setup Stripe for payments - see [STRIPE_SETUP.md](./STRIPE_SETUP.md)
2. 📚 Read the [API Documentation](./API.md)
3. 🧪 Write tests for your endpoints
4. 🚀 Deploy to production
5. 📊 Setup monitoring and analytics

## Support & Contribution

For issues and feature requests, please open a GitHub issue.

For contributions, fork the repository and submit a pull request.

## License

MIT License - see LICENSE file for details.

---

**Questions?** Check the documentation or open an issue! 🚀