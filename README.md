# Simple Payment Gateway

A NestJS-based payment gateway application with MongoDB integration.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose

## Quick Start with Docker

### 1. Start the Database Services

Run MongoDB and Mongo Express using Docker Compose:

```bash
docker-compose up -d
```

This will start:
- **MongoDB** on port `27017`
- **Mongo Express** (MongoDB web interface) on port `8081`

**MongoDB Credentials:**
- Username: `root`
- Password: `pass123`

**Mongo Express Credentials:**
- Username: `admin`
- Password: `adminsecret`
- Access: http://localhost:8081

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run start:prod
```

The application will be available at `http://localhost:3000`

### 4. Start Swagger Documentation Server

In a separate terminal, start the Swagger documentation server:

```bash
# Start Swagger server on port 4000
npm run swagger

# Or start with auto-reload during development
npm run swagger:dev
```

The Swagger documentation will be available at `http://localhost:4000/docs`

## Development Setup

### 1. Environment Setup

Make sure MongoDB is running (either via Docker or locally):

```bash
# Using Docker (recommended)
docker-compose up -d mongodb

# Or start MongoDB locally if installed
mongod
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Commands

```bash
# Start in development mode with hot reload
npm run start:dev

# Start in debug mode
npm run start:debug

# Build the project
npm run build

# Start production build
npm run start:prod
```

### 4. Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Generate test coverage report
npm run test:cov
```

### 5. Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Docker Services

### MongoDB
- **Port**: 27017
- **Username**: root
- **Password**: pass123
- **Database**: payment_gateway (default)

### Mongo Express
- **Port**: 8081
- **Username**: admin
- **Password**: adminsecret
- **URL**: http://localhost:8081

## Project Structure

```
src/
├── db-config/           # Database configuration and schemas
│   ├── repositories/    # Data access layer
│   └── schemas/         # MongoDB schemas
├── guards/              # Authentication and authorization guards
├── interceptors/        # Response handling interceptors
├── modules/             # Feature modules
│   ├── auth/           # Authentication module
│   ├── merchant/       # Merchant management
│   ├── transaction/    # Transaction processing
│   └── user/           # User management
└── pipes/              # Validation pipes
```

## API Documentation

The application provides comprehensive API documentation through Swagger UI:

- **Swagger UI**: http://localhost:4000/docs
- **API Base URL**: http://localhost:3000/api

### Available Endpoints

The API includes the following main modules:

#### Authentication
- `POST /api/auth/login` - User login

#### Users
- `POST /api/user` - Create user (JWT required)
- `GET /api/user` - List users (JWT required)

#### Merchants
- `POST /api/merchant` - Create merchant (Admin only)
- `GET /api/merchant/list` - List merchants (JWT required)
- `GET /api/merchant/:id` - Get merchant details (JWT required)
- `PATCH /api/merchant/:id` - Update merchant (Admin only)

#### Transactions
- `POST /api/transaction` - Create transaction (JWT required)
- `POST /api/transaction/approve` - Approve transaction (Admin only)
- `POST /api/transaction/decline` - Decline transaction (Admin only)
- `GET /api/transaction` - List transactions (Admin only)

### Authentication

Most endpoints require JWT authentication. To authenticate:

1. Use the login endpoint to get a JWT token
2. Include the token in the Authorization header: `Bearer <your-token>`
3. Admin-only endpoints require a user with 'admin' role

## Stopping Services

```bash
# Stop all Docker services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure ports 3000, 27017, and 8081 are available
2. **MongoDB connection failed**: Ensure MongoDB container is running with `docker-compose ps`
3. **Dependencies issues**: Delete `node_modules` and run `npm install` again

### Logs

```bash
# View Docker logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f mongodb
docker-compose logs -f mongo-express
```

## License

This project is licensed under the MIT License.