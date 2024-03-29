# Todo List API

The Todo List API is a RESTful service that allows users to manage their todo lists. It provides endpoints for creating, updating, deleting, and retrieving tasks in todo lists for multiple users. The API uses MySQL as the backend database for storing user information and their associated tasks.

## Features

- User authentication and authorization
- Create, read, update, and delete operations for tasks
- Support for multiple users
- Persistent storage using MySQL
  
## Prerequisites
Docker
<br />
## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/matej-tomik/todo-list
    ```

2. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```
3. **Install MySQL Image**:
    Log in using the command line:

    ```bash
    docker login
    ```
    After logging in, download the MySQL image:
   
    ```bash
    docker run --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:8.0
    ```
5. **Set up the MySQL database:**

    - At the start of the API, it will automatically generate a new MySQL database and table if they do not already exist

## Usage

### Test run

To start an API, you can use the following command in the command line:
```bash
 uvicorn main:app --reload 
```
Then, open the browser with the [specified URL](http://127.0.0.1:8000/docs)

### Authentication

To use the API, users need to authenticate using their credentials.

### Endpoints

- **GET /list-tasks:** Retrieve all tasks for the authenticated user.
- **PUT /create-task:** Create a new task for the authenticated user.
- **GET /get-task/:id:** Retrieve a specific task by ID.
- **PUT /update-task/:id:** Update a specific task by ID.
- **DELETE /delete-task/:id:** Delete a specific task by ID.


## Contact

For any inquiries or support, please contact [Matěj Tomík](mailto:mtomik.work@gmail.com).
