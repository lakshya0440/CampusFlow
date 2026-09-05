# CampusFlow 🎓

### Smart Campus Management Portal

CampusFlow is a full-stack Smart Campus Management Portal designed to provide a centralized platform for students, faculty, and administrators to manage and access important campus information and services.

The system provides role-based dashboards, campus content management, service-request workflows, authentication, and centralized data management through a modern web interface.

---

## 🚀 Project Overview

Managing campus activities often involves multiple disconnected systems for notices, assignments, courses, events, timetables, and student service requests.

**CampusFlow** brings these activities together into a single web-based platform.

The system follows a role-based architecture where each user receives access according to their account privileges:

- 👨‍🎓 **Student** — View academic and campus information and submit service requests.
- 👨‍🏫 **Faculty** — Manage academic and campus content.
- 🛡️ **Admin** — Full administrative control over the campus portal and user management.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- Secure user login using email and password
- Automatic role detection from the user's account
- JWT-based authentication
- Role-based access control
- Protected backend APIs
- Secure password handling
- Student and faculty registration
- Admin-controlled user management

### 👨‍🎓 Student Features

Students can:

- View their personalized dashboard
- View courses
- View assignments
- View notices
- View upcoming events
- View timetable
- Submit campus service requests
- Track submitted requests
- Update their profile
- Switch between light and dark themes

### 👨‍🏫 Faculty Features

Faculty members can:

- Access the faculty dashboard
- Add campus content
- Edit existing records
- Delete records
- Manage courses
- Manage assignments
- Manage notices
- Manage events
- Manage timetable entries
- View and process campus requests

### 🛡️ Admin Features

Administrators have the highest level of access.

Admins can:

- Access the admin dashboard
- Manage users
- Activate/deactivate users
- Manage courses
- Manage assignments
- Manage notices
- Manage events
- Manage timetable
- View campus service requests
- Resolve requests
- Decline requests
- Keep pending requests pending
- Manage campus information across the system

### 📋 Campus Request Workflow

CampusFlow provides a controlled request lifecycle:

```text
Student submits request
        ↓
     PENDING
        ↓
 ┌──────┼───────┐
 ↓      ↓       ↓
Keep   Resolve Decline
       Pending
 ↓       ↓       ↓
PENDING RESOLVED DECLINED
        │         │
        └────┬────┘
             ↓
        STATUS LOCKED
