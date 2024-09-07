# Aristto: Research Papers Management System

This repository contains a full-stack application for managing research papers. It includes a React frontend and a FastAPI backend. The application allows users to search for research papers, save them, and manage their saved papers.

## Table of Contents

- [Project Overview](#project-overview)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)

## Project Overview

The Research Papers Management System consists of two main components:

1. **Frontend:** Built with React, Material UI, Axios this provides the user interface for searching and managing research papers.
2. **Backend:** Built with FastAPI, this provides RESTful APIs for saving, retrieving, and removing research papers.

### Features

- **Search Papers:** Users can search for research papers using keywords.
- **Save Papers:** Users can save papers to their profile.
- **View Saved Papers:** Users can view a list of their saved papers.
- **Remove Papers:** Users can remove papers from their saved list.

## Frontend Setup

The frontend is built with React and uses Material-UI for styling. Follow these steps to set up the frontend:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/research-papers-frontend.git
cd aristto-client
```

### 2. Install Dependencies

Install the required npm packages:

```bash
bun install (install bun if not installed already)
```

### 3. Start the Development Server

Run the React development server:

```bash
bun run start
```

The frontend will be available at `http://localhost:3000`.

## Backend Setup

The backend is built with FastAPI and uses Uvicorn as the ASGI server. Follow these steps to set up the backend:

### 1. go to the server folder

```bash
cd Server
```

### 2. Create a Virtual Environment

Create a virtual environment in your project directory:

```bash
python -m venv .venv
```

### 3. Activate the Virtual Environment

Activate the virtual environment:

- **On Windows:**

  ```bash
  .\.venv\Scripts\activate
  ```

- **On macOS/Linux:**

  ```bash
  . .venv/bin/activate
  ```

### 4. Install Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

### 5. Start the FastAPI Server

Run the FastAPI application using Uvicorn:

```bash
uvicorn main:app --reload
```

The backend server will be available at `http://127.0.0.1:8000`.

## Running the Application

1. Start the backend server by following the [Backend Setup](#backend-setup) instructions.
2. Start the frontend server by following the [Frontend Setup](#frontend-setup) instructions.

Make sure the backend server is running before starting the frontend server. The frontend will make API requests to the backend server.

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

## Frontend Features

- **Search Page:** Allows users to search for research papers by keyword.
- **Search Results:** Displays a list of papers based on the search query.
- **Saved Papers Page:** Shows the list of papers saved by the user with options to remove them.

## Backend Features

- **FastAPI:** Provides RESTful APIs for managing research papers.
- **In-Memory Storage:** Stores papers in memory (data is lost on server restart).
- **CORS Middleware:** Configured to allow requests from the frontend server.
