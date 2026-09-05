# Quick API checks

GET `/` -> `CampusFlow Backend is running!`

POST `/api/auth/register/student`
```json
{"name":"Test Student","email":"student@example.com","password":"Student@123","studentId":"STU001","department":"CSE","year":"2nd Year"}
```

POST `/api/auth/register/faculty`
```json
{"name":"Test Faculty","email":"faculty@example.com","password":"Faculty@123","employeeId":"FAC001","department":"CSE","designation":"Professor"}
```

POST `/api/auth/login`
```json
{"email":"admin@campusflow.local","password":"Admin@123","role":"ADMIN"}
```

Use the returned JWT as:
`Authorization: Bearer <token>`
