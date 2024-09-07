Here’s a complete `README.md` file with detailed setup instructions, usage, and commands:

# FastAPI Research Papers Server

This repository contains a FastAPI application for managing research papers. The server provides endpoints to save, retrieve, and remove research papers.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Notes](#notes)
- [License](#license)

## Setup Instructions

### 1. Create a Virtual Environment

Create a virtual environment in your project directory:

```bash
python -m venv .venv
```

### 2. Activate the Virtual Environment

Activate the virtual environment:

- **On Windows:**

  ```bash
  .\.venv\Scripts\activate
  ```

- **On macOS/Linux:**

  ```bash
  . .venv/bin/activate
  ```

### 3. Install Dependencies

Install the required Python packages using `pip`:

```bash
pip install -r requirements.txt
```

### 4. Start the FastAPI Server

Run the FastAPI application using Uvicorn:

```bash
uvicorn main:app --reload
```

- **`main:app`** refers to the `app` instance in the `main.py` file.
- The `--reload` option enables auto-reloading for development.

## API Endpoints

### 1. Save a Paper

- **Endpoint:** `POST /api/save`
- **Description:** Save a new research paper to the in-memory storage.
- **Request Body:**

  ```json
  {
    "id": "10.59948/osou4.2023.02",
    "title": "Research Paper Title",
    "authors": "Author Name",
    "year": 2023,
    "citations": 15
  }
  ```

- **Response:**

  ```json
  {
    "id": "10.59948/osou4.2023.02",
    "title": "Research Paper Title",
    "authors": "Author Name",
    "year": 2023,
    "citations": 15
  }
  ```

### 2. Retrieve Saved Papers

- **Endpoint:** `GET /api/saved`
- **Description:** Retrieve a list of all saved research papers.
- **Response:**

  ```json
  [
    {
      "id": "10.59948/osou4.2023.02",
      "title": "Research Paper Title",
      "authors": "Author Name",
      "year": 2023,
      "citations": 15
    }
  ]
  ```

### 3. Remove a Paper

- **Endpoint:** `DELETE /api/remove`
- **Description:** Remove a research paper by its ID from the in-memory storage.
- **Request Body:**

  ```json
  {
    "paper_id": "10.59948/osou4.2023.02"
  }
  ```

- **Response:**

  ```json
  {
    "detail": "Paper removed successfully"
  }
  ```

## Notes

- The server uses in-memory storage for saved papers, meaning that data will be lost when the server restarts.
- Ensure that your frontend application is running on `http://localhost:3000` or adjust the `allow_origins` setting in `main.py` accordingly.
- The `requirements.txt` file should be generated with all the necessary dependencies for this project.
