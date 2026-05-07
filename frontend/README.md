# Web Application for the Association of Internists
## 📌 Project Description

This project is a web application developed for the Association of Internists.
The application enables management of announcements, membership applications, congress/seminar registrations, and communication between members and administrators.

## 🛠 Technologies Used
### Frontend
- React
- React Router
- Axios
- Tailwind CSS / CSS
### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
### Database
- PostgreSQL
## ✨ Functionalities
### 1. Announcements Page

A page where users and members can view:

- Congress announcements
- Seminars
- News
- Regulations and legal documents

Administrators can create, edit, and delete announcements.

### 2. Administrator Dashboard

A separate page accessible only to administrators where they can:

- Manage announcements
- Upload images
- Edit public information
- Review membership applications
### 3. Membership Application Page

A page where new members can apply for membership by submitting:

- Personal information
- License number

### 4. Authentication System

The application supports login functionality for:

- Members
- Administrators

Authentication is implemented using JWT authentication.

### 5.Public Information Page

A public page containing:

- Information about the association
- General details and updates

Only administrators can edit this content.

## 🔐 Security

The backend uses:

- Spring Security
- JWT Authentication
- Role-based authorization

Roles:

- ADMIN
- MEMBER
## 🚀 Running the Project
### Backend (Spring Boot)
Requirements
- Java 17+
- Maven
- PostgreSQL

Steps:

````
git clone https://github.com/EvgenijaSotiroska/medical-association-app
cd backend
````

Configure the database in:

application.properties

Run the backend:

````
mvn spring-boot:run
````

Backend runs on:

http://localhost:8080
### Frontend (React)
Requirements
- Node.js
- npm

Steps:

````
cd frontend
npm install
npm run dev
````

Frontend runs on:

http://localhost:5173

## 📸 Features
- Responsive design
- Authentication & authorization
- Role-based access
- CRUD operations
- Reusable React components
- Backend layered architecture (Controller-Service-Repository)
- Error handling and validation

## 👥 User Roles
### Administrator
- Manage announcements
- Manage applications
- Edit public pages
### Member
- View announcements
- Register for events
- Apply for membership
- View public information

