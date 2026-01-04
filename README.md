# CS50 Web Capstone Project

## Overview

This is a Notes App built with Django, React, and CSS that allows users to efficiently create, edit, and delete notes. The app uses Django as the backend to provide APIs and React on the frontend for dynamic interactivity. The database is implemented with SQLite, with its structure defined using Django models. Users can organize their notes into folders, add tags, and filter notes by both tags and folders. The app also supports archiving and restoring notes, providing a simple way to manage active and archived content. Designed with a fully responsive interface, the app works seamlessly on both desktop and mobile devices, offering an intuitive and user-friendly experience for note management.

## Project Distinctiveness and Complexity

This project is distinct from other projects in this course due to both its architectural decisions and feature complexity. The backend is implemented using Django without additional dependencies, and all APIs are built manually without using frameworks such as Django REST Framework. Data serialization is handled explicitly to enable structured communication between the Django backend and the React frontend.

The application supports advanced note management features, including creating, archiving, restoring, and deleting notes, as well as organizing notes using folders and tags. Users can search and filter notes based on tags, folders, and note content, which requires coordinated state management and dynamic updates on the frontend.

On the frontend, React is used to provide a highly interactive user experience, including real-time updates, modal-based confirmations, and conditional rendering based on application state. The user interface is built with CSS only, without external styling frameworks, and follows a mobile-first responsive design approach, with layout adjustments based on screen size to ensure usability across different devices.

## Setup and Usage

### Requirements

- **Python 3.10+**
- **Django 5.2.7**
- **Node.js 18+**
- **React 19.1.1**
- **SQLite** (default Django database)

### Installation and Running the Application

```bash
# Backend setup
cd notes
pip install django==5.2.7
python manage.py makemigrations

python manage.py migrate
python manage.py runserver


# Frontend setup (open a new terminal)

cd frontend
npm install
npm run dev

# Open the link shown in the terminal to access the application
```

<!-- ### Installation and Running the Application -->
<!---->
<!-- 1. Navigate to the backend directory: -->
<!--    `cd notes` -->
<!---->
<!-- 2. Install backend dependencies: -->
<!--    `pip install django==5.2.7` -->
<!---->
<!-- 3. Create and apply database migrations: -->
<!--    `python manage.py makemigrations`   -->
<!--    `python manage.py migrate` -->
<!---->
<!-- 4. Start the Django development server: -->
<!--    `python manage.py runserver` -->
<!---->
<!-- 5. Open a new terminal and navigate to the frontend directory: -->
<!--    `cd frontend` -->
<!---->
<!-- 6. Install frontend dependencies: -->
<!--    `npm install` -->
<!---->
<!-- 7. Start the React development server: -->
<!--    `npm run dev` -->
<!---->
<!-- 8. Open the link displayed in the terminal after the React app starts to access the application in your browser. -->

## Files and Directories

- **final-project/**: Root directory of the project
- **venv/**: Python virtual environment
- **notes/**: Django project directory
- **api/**: Django application containing the backend logic and APIs
- \***\*pycache**/\*\*: Python cache files
- **migrations/**: Database migration files
- **static/**: Static assets used by the application
- **index.html**: Placeholder index file (not actively used in the application)

### Django Application Files (`api/`)

- \***\*init**.py\*\*: Marks the directory as a Python package
- **admin.py**: Registers models for access via the Django admin interface
- **apps.py**: Application configuration
- **models.py**: Defines database models for the application
- **tests.py**: Contains automated tests
- **urls.py**: Defines API endpoint routes
- **utils.py**: Helper and utility functions
- **views.py**: View functions that handle backend logic and API responses
