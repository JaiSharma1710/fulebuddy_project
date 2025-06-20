# Fulebuddy

Fulebuddy is a full-stack task management application built with the MERN stack, containerized with Docker, and authenticated with JWT (stored in cookies).

## Features

-   User authentication with JWT (email and password)
-   Create, read, update, and delete tasks
-   Share tasks with other users
-   Filter tasks by "All Tasks," "My Tasks," and "Shared Tasks"

## Technologies Used

-   **Frontend**: Vite, React, TypeScript
-   **Backend**: Node.js, Express, TypeScript
-   **Database**: MongoDB
-   **Authentication**: JWT (with cookies)
-   **Containerization**: Docker, Docker Compose

## Project Structure

The project is set up as a monorepo with the following structure:

```
/
|-- docker-compose.yml
|-- package.json
|-- packages/
|   |-- backend/
|   |   |-- Dockerfile
|   |   |-- package.json
|   |   |-- src/
|   |-- frontend/
|   |   |-- Dockerfile
|   |   |-- package.json
|   |   |-- src/
|-- schema.dbml
```

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm (v8 or higher)
-   Docker
-   Docker Compose

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/fulebuddy.git
    cd fulebuddy
    ```

2.  Install dependencies for all packages:

    ```bash
    npm install
    cd packages/frontend && npm install && cd ../..
    cd packages/backend && npm install && cd ../..
    ```

### Environment Variables

Create a `.env` file in the `packages/backend` directory and add the following:

```
# JWT Secret
JWT_SECRET=your_jwt_secret

# MongoDB
MONGODB_URI=mongodb://mongo:27017/fulebuddy
```

No environment variables are required for the frontend.

### Running the Application

To run the application, use the following command from the root directory:

```bash
npm run dev
```

This will start the following services:

-   **Frontend**: `http://localhost:5173`
-   **Backend**: `http://localhost:5001`
-   **MongoDB**: `mongodb://localhost:27017`

To stop the application, run:

```bash
npm run stop
```

## DBML

The database schema is defined in the `schema.dbml` file. You can use a tool like [dbdiagram.io](https://dbdiagram.io) to visualize the schema. 