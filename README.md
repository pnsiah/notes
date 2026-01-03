# CS50 Web Capstone Project

## Overview

This is a Notes App built with Django, React, and CSS that allows users to efficiently create, edit, and delete notes. The app uses Django as the backend to provide APIs and React on the frontend for dynamic interactivity. The database is implemented with SQLite, with its structure defined using Django models. Users can organize their notes into folders, add tags, and filter notes by both tags and folders. The app also supports archiving and restoring notes, providing a simple way to manage active and archived content. Designed with a fully responsive interface, the app works seamlessly on both desktop and mobile devices, offering an intuitive and user-friendly experience for note management.

## Distinctiveness and Complexity

This project is distinct from other projects in this course due to both its architectural decisions and feature complexity. The backend is implemented using Django without additional dependencies, and all APIs are built manually without using frameworks such as Django REST Framework. Data serialization is handled explicitly to enable structured communication between the Django backend and the React frontend.

The application supports advanced note management features, including creating, archiving, restoring, and deleting notes, as well as organizing notes using folders and tags. Users can search and filter notes based on tags, folders, and note content, which requires coordinated state management and dynamic updates on the frontend.

On the frontend, React is used to provide a highly interactive user experience, including real-time updates, modal-based confirmations, and conditional rendering based on application state. The user interface is built with CSS only, without external styling frameworks, and follows a mobile-first responsive design approach, with layout adjustments based on screen size to ensure usability across different devices.



