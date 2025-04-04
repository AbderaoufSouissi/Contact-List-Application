# Contact List Application

## Overview

The Contact List Application is a full-stack web application that allows users to add, update, and manage contacts. It is built using **Spring Boot** for the backend, **React with TypeScript** for the frontend, and **PostgreSQL** as the database. The application runs in a **Docker Compose** environment for easy database management.

## Features

- Add new contacts
- Update existing contacts
- View contact list
- RESTful API for backend operations
- Notification system with **React Toastify**

## Tech Stack

### Backend

- **Spring Boot 3** (Java 21)
- **Spring Data JPA**
- **PostgreSQL**

### Frontend

- **React** (Vite + TypeScript)
- **React Hooks**
- **Axios** (for API calls)
- **React Toastify** (for notifications)

### Database

- **PostgreSQL** (running inside a Docker container)
- **pgAdmin** (for database management, included in Docker Compose)

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- Docker & Docker Compose
- Node.js & npm (or yarn)
- Java 21+

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd contact-api
   ```
2. Build and run the Spring Boot application:
   ```sh
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd contact-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```

### Running the Database with Docker Compose

To start PostgreSQL and pgAdmin using Docker Compose:

```sh
docker-compose up -d
```

This will start the PostgreSQL database and pgAdmin for easy database management.

## Configuration

### Environment Variables

Ensure you configure the following environment variables before running the app:

```
DATABASE_URL=jdbc:postgresql://localhost:5432/contacts
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
```

> The `.env` file for Docker and `application-dev.yml` for Spring Boot are included in `.gitignore` and must be configured manually.

## API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /contacts      | Get all contacts  |
| POST   | /contacts      | Add a new contact |
| PUT    | /contacts/{id} | Update a contact  |

## Deployment

You can deploy the application using Docker on any cloud service that supports containerized applications (AWS, DigitalOcean, Railway, etc.).

## Contribution

Feel free to fork this repository, open issues, or submit pull requests for improvements.

## License

This project is open-source and available under the **MIT License**.

---


