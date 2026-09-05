# CampusFlow Backend - Final

CampusFlow is a Spring Boot + MongoDB backend for a smart campus portal focused on campus service-request management and academic/campus information.

## Run

```powershell
cd backend
mvn clean spring-boot:run
```

Backend: http://localhost:8080/
MongoDB: mongodb://localhost:27017/campusflow

## Roles

- STUDENT: view campus information and raise/track own service requests.
- FACULTY: student capabilities plus manage courses, assignments, notices, events and timetable.
- ADMIN: highest authority; view all requests, change request status, manage accounts and campus records. Admin cannot create service requests.

## Request workflow

1. Student or faculty submits department, location/place, category, subject and description.
2. Request is stored in `campus_requests` with `PENDING` status.
3. Admin sees all requests.
4. Admin can keep `PENDING`, mark `RESOLVED`, or mark `DECLINED`, with an optional admin comment.
5. Student/faculty can view their request status.

## MongoDB

Database: `campusflow`

Collections:
- users
- courses
- assignments
- notices
- events
- timetable
- campus_requests

Attendance is intentionally not part of the final CampusFlow feature set.

## Default admin

Email: `admin@campusflow.local`
Password: `Admin@123`

## Security

Passwords are stored with BCrypt. JWT is used for API authentication. CORS allows the local Vite/React frontend on port 5173.


## MongoDB / Compass setup

Use a NEW MongoDB Compass connection with the label:

CampusFlow Local

Connection URI:

mongodb://localhost:27017

The Spring Boot application connects specifically to:

mongodb://localhost:27017/campusflow

At startup, CampusFlow explicitly creates these collections if they do not exist:

- users
- courses
- assignments
- notices
- events
- timetable
- campus_requests

All student and faculty registrations are saved in `users`.
The built-in admin is also saved in `users`.
Service requests are saved in `campus_requests`.
Courses, assignments, notices, events and timetable records are saved in their respective collections.

The password stored in `users.password` is a BCrypt hash. The API never returns the password/hash in JSON responses.

Default admin:
admin@campusflow.local
Admin@123
