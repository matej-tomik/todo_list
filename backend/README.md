# Task Manager API

The **Task Manager API** is a RESTful backend service for managing tasks in the Task Manager App.  
It provides endpoints for creating, retrieving, updating, and deleting tasks with persistent storage using MySQL.

For development, the database runs in Docker while the API can be started locally from the command line to allow faster iteration and easier debugging.

---

## Technologies Used

- Python
- FastAPI
- MySQL
- Docker (database container)

---

## Prerequisites

- Docker
- Python
- pip

---

## Development Setup

### 1. Start the Database (Docker)

From the **project root directory**, start only the database container:

```bash
docker compose up -d
```

### 2. Stop the Backend Container (If Running)

If the backend is already running in Docker, stop it to run locally:

```bash
docker compose stop backend
```

### 3. Install Python Dependencies

Install the required Python packages using pip:

```bash
pip install -r requirements.txt
```

### 4. Run the API Locally

Start the FastAPI server locally:

```bash
uvicorn main:app --reload
```

The API will be available at:

```bash
http://localhost:8000
```

Swagger UI documentation:

```bash
http://localhost:8000/docs
```

### API Endpoints

- **GET /list-tasks:** Retrieve all tasks for the authenticated user.
- **PUT /create-task:** Create a new task for the authenticated user.
- **GET /get-task/:id:** Retrieve a specific task by ID.
- **GET /get-task** Retrieve a all tasks.
- **PUT /update-task/:id:** Update a specific task by ID.
- **DELETE /delete-task/:id:** Delete a specific task by ID.
- **DELETE /delete-completed** Delete all completed tasks.

### 5. Stopping the Containers

To stop the containers, run:

```bash
docker compose down
```
