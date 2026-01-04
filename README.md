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

- node_modules/: node modules
- public/ : image
- src/: assets and component directories
- assets/
  -- images/: contains images
- components/
  - Auth.css
  - Dashboard.jsx: main logic and render the dashboard for notes
  - EmptyNotes.jsx: empty notes components
  - FilteredNotes.css
  - FilteredNotes.jsx: filteredNotes by type based on whether it is filtered by tags or folders
  - FolderList.css
  - FolderList.jsx: list user folders
  - Header.css
  - Header.jsx: header component that tells the heading of the page on small screen or what is being clicked on big screen
  - Login.jsx: handling login of users
  - Logo.css
  - Logo.jsx: logo of the notes app
  - Modal.css
  - Modal.jsx: handles modal body and confirm function or what the modal open does whether create folder, arhive notes or restore notes.
  - NavBar.css
  - NavBar.jsx: contains the nav items on small screen
  - NavItem.css
  - NavItem.jsx : buttons that switches views on small screen like showing user the selected note, all notes list and archive notes list, filtered notes.
  - NoteActions.css
  - NoteActions.jsx: buttons to call open modals to create folder, archive and restore notes and navigate back on small screen
  - NoteForm.css
  - NoteForm.jsx: Handles the creating and updating notes. also show notes
  - NoteList.css
  - NoteList.jsx: List notes whether filtered or all notes
  - Notes.css
  - Notes.jsx: house noteslist and create new notes button
  - Notification.css
  - Notification.jsx: handles display notifcations
  - NotificationContext.jsx: handles context to have notes available for all components.
  - Search.css
  - Search.jsx: handles searching notes by title, tags, or content.
  - Settings.css
  - Settings.jsx: handles showing username and logging out.
  - SideBar.css
  - Sidebar.jsx: contains logo and notes filters, tags and folders
  - Signup.jsx: handles registering a new user
  - TagList.css
  - TagList.jsx: list all user note tags,
  - View.css
  - View.jsx: responsible for switching the view or dynamically showing different content on small screen
  - dashboard.css
- App.css
- App.jsx: handles what the users see whether the login page,sign up pages or dashboard. setts page something like router or switching between pages that give the illusion of loading different pages

- index.css
- main.jsx
- .gitignore
- README.md
- eslint.config.js
- index.html
- package-lock.json
- package.json
- vite.config.js
