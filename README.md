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
- **frontend/**: React application responsible for frontend interactivity
- \***\*pycache**/\*\*: Python cache files
- **migrations/**: Database migration files
- **static/**: Static assets used by the application
- **index.html**: Placeholder index file (not actively used in the application)
- **manage.py**: Django command-line utility for administrative tasks
- **db.sqlite3**: SQLite database file used by the application

### Django Application Files (`api/`)

- \***\*init**.py\*\*: Marks the directory as a Python package
- **admin.py**: Registers models for access via the Django admin interface
- **apps.py**: Application configuration
- **models.py**: Defines database models for the application
- **tests.py**: Contains automated tests
- **urls.py**: Defines API endpoint routes
- **utils.py**: Helper and utility functions
- **views.py**: View functions that handle backend logic and API responses

### React Application (`frontend/`)

- **node_modules/**: Installed frontend dependencies
- **public/**: Public assets such as images
- **src/**: Contains application source code, assets, and React components

#### Assets

- **assets/images/**: Image assets used in the application

#### Components

The `components/` directory contains all React components responsible for UI rendering and frontend logic.  
Each component has a corresponding CSS file used for styling.

- **Dashboard.jsx**: Main dashboard component responsible for rendering and managing notes
- **EmptyNotes.jsx**: Displays a placeholder when no notes are available
- **FilteredNotes.jsx**: Displays notes filtered by tags or folders
- **FolderList.jsx**: Renders the list of user folders
- **Header.jsx**: Displays the current view title and page heading
- **Login.jsx**: Handles user authentication (login)
- **Logo.jsx**: Displays the application logo
- **Modal.jsx**: Handles modal rendering and confirmation logic for actions such as creating folders, archiving, restoring, or deleting notes
- **NavBar.jsx**: Navigation bar for small screen devices
- **NavItem.jsx**: Navigation buttons used to switch views on smaller screens
- **NoteActions.jsx**: Provides action buttons for creating folders, archiving, restoring notes, and navigating back on small screens
- **NoteForm.jsx**: Handles creating and updating notes, and displays note content
- **NoteList.jsx**: Renders the list of notes (all notes or filtered notes)
- **Notes.jsx**: Parent component that manages the notes list and new note creation
- **Notification.jsx**: Displays notification messages to the user
- **NotificationContext.jsx**: Provides global notification state across components using React Context
- **Search.jsx**: Handles searching notes by title, tags, or content
- **Settings.jsx**: Displays user settings such as username and logout functionality
- **Sidebar.jsx**: Contains navigation filters, folders, and tags
- **Signup.jsx**: Handles user registration
- **TagList.jsx**: Displays a list of all user tags
- **View.jsx**: Controls dynamic view switching and conditional rendering on small screens

#### Root Files

- **App.jsx**: Main application component that controls page rendering (login, signup, dashboard) and handles view switching
- **App.css**: Global styles for the application
- **index.css**: CSS reset and global CSS variables
- **main.jsx**: Application entry point
- **index.html**: Root HTML file used to mount the React application
- **package.json**: Frontend dependencies and scripts
- **package-lock.json**: Locked dependency versions
- **vite.config.js**: Vite configuration file
- **eslint.config.js**: ESLint configuration generated by Vite
- **.gitignore**: Files and directories ignored by Git
- **README.md**: Frontend documentation

### Django Project Configuration (`notes/`)

- \***\*pycache**/\*\*: Python cache files
- \***\*init**.py\*\*: Marks the directory as a Python package
- **asgi.py**: ASGI configuration for asynchronous server support
- **settings.py**: Main Django settings file (installed apps, middleware, database configuration, etc.)
- **urls.py**: Root URL configuration for the Django project
- **wsgi.py**: WSGI configuration for deployment
