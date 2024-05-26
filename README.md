<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# KeyVault Microservices Architecture

This project implements a microservices architecture using NestJS. The architecture is designed to handle multiple services with robust error handling, logging, authentication, and rate limiting. PostgreSQL is used as the database and is shared across all the microservices.

## Project Structure

The project is organized into several modules and services to maintain a modular structure. The main services include:

- **KeyVault**: The main service handling key management.
- **Key Master Service**: Manages the keys and their associated operations.
- **Token Info Service**: Handles token information and validation.

## Features

- **Microservices Architecture**: Using HTTP for communication between services.
- **Centralized Error Handling**: All errors from microservices are propagated to the main route service (BFF - Backend For Frontend) using custom filters and exceptions.
- **Logging**: Winston is used for logging across all services.
- **Modular Structure**: Separate modules for OAuth, database, and logging, which can be imported into any microservice.
- **Dockerized**: The entire application is containerized using Docker for easy deployment.
- **Rate Limiting**: Applied to API endpoints to prevent abuse.
- **PostgreSQL**: Used as the database and shared across all microservices.
- **Authentication**: Implemented for admin routes, ensuring secure access.
- **Zero Trust Policy**: Strict security measures ensuring services with protected endpoints can only be accessed through proper authentication.
- **Shared Contexts**: Contexts and authentication are shared across all services.

## Getting Started

### Prerequisites

- Node.js
- Yarn
- Docker

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/neeraj1bh/keyvault.git
   cd keyvault
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root and all other directories where there is a `.env.example` and add the necessary environment variables.

4. Build the application:

   ```bash
   yarn build
   ```

### Running the Application

#### Development

To run the application in development mode:

```bash
yarn start:dev
```

#### Production

To run the application in production mode:

```bash
yarn start:prod
```

### Docker under progress

To run the application using Docker:

1. Build the Docker images and start the services:

   ```bash
   docker-compose up --build
   ```

### Scripts

- `yarn build`: Build all libraries and applications.
- `yarn format`: Format the code using Prettier.
- `yarn start`: Start the NestJS application.
- `yarn lint`: Run ESLint to lint the code.

## Modules

### Auth Module

Handles authentication and authorization using JWT.

### Logger Module

Provides logging functionality using Winston, and can be imported into any service.

### Database Module

Configures TypeORM and provides a connection to the PostgreSQL database.

## Error Handling

Custom filters and exceptions are used to propagate errors from all microservices to the main route service (BFF). The following files handle error responses:

- **ValidationExceptionFilter**: Handles validation errors.
- **ThrottlerExceptionFilter**: Handles rate limiting errors.
- **HttpErrorInterceptor**: Intercepts HTTP errors and formats them for consistent responses.

## Rate Limiting

Rate limiting is applied to API endpoints using the `@nestjs/throttler` package. This prevents abuse and ensures fair usage of the API.

## Security

- **Authentication**: Admin routes are protected and require valid JWT tokens.
- **Zero Trust Policy**: Ensures that services with protected endpoints can only be accessed through proper authentication.

## Database

- **PostgreSQL**: Used as the primary database and shared across all microservices.
