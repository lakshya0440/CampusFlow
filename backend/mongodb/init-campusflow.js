// CampusFlow MongoDB initialization script for mongosh.
// Run this while connected to: mongodb://localhost:27017
// Compass connection label: CampusFlow Local

use("campusflow");

const collections = [
  "users",
  "courses",
  "assignments",
  "notices",
  "events",
  "timetable",
  "campus_requests"
];

collections.forEach((name) => {
  if (!db.getCollectionNames().includes(name)) {
    db.createCollection(name);
  }
});

db.users.createIndex({ email: 1 }, { unique: true });

print("CampusFlow database initialized.");
print("Database: " + db.getName());
print("Collections:");
printjson(db.getCollectionNames());
