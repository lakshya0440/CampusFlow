# CampusFlow Frontend - Final

## Run

```powershell
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:8080

## Final role experience

### Student
- Dashboard
- Service Requests
- Courses
- Assignments
- Notices & Holidays
- Events
- Timetable
- Profile
- Can raise and track service requests

### Faculty
- Dashboard
- Service Requests
- Courses
- Assignments
- Notices & Holidays
- Events
- Timetable
- Profile
- Can raise service requests
- Can add/manage campus academic information exposed by the backend

### Admin
- Dashboard
- Service Requests
- Courses
- Assignments
- Notices & Holidays
- Events
- Timetable
- Profile
- Accounts
- Can view and manage all service requests
- Can keep, resolve or decline requests
- Cannot raise service requests


Dark/light mode and full-screen controls are available on the home/auth pages and authenticated dashboard.


## CampusFlow data storage

The frontend does not connect directly to MongoDB.
It communicates with the Spring Boot backend at:

http://localhost:8080

The backend stores registration, login-account, admin, and campus-management data in MongoDB database `campusflow`.

MongoDB Compass connection label:
CampusFlow Local

MongoDB server:
mongodb://localhost:27017

Database:
campusflow
