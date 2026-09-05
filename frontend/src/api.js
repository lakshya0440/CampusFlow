const BASE = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");
async function req(path, opt = {}) {
  const token = localStorage.getItem("cf_token"); const headers = { ...(opt.body ? { "Content-Type": "application/json" } : {}), ...(opt.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  let r; try { r = await fetch(BASE + path, { ...opt, headers }) } catch { throw new Error("Backend unavailable. Start Spring Boot on port 8080.") }
  const type = r.headers.get("content-type") || ""; const data = type.includes("json") ? await r.json().catch(() => ({})) : await r.text();
  if (!r.ok) throw new Error(data.message || data.error || data || "Request failed"); return data;
}
const body = (method, x) => ({ method, body: JSON.stringify(x) });
export const api = {
  login: x => req("/api/auth/login", body("POST", x)), student: x => req("/api/auth/register/student", body("POST", x)), faculty: x => req("/api/auth/register/faculty", body("POST", x)),
  dashboard: () => req("/api/dashboard"), profile: () => req("/api/profile/me"), updateProfile: x => req("/api/profile/me", body("PUT", x)),
  requests: () => req("/api/requests"), mineRequests: () => req("/api/requests/mine"), createRequest: x => req("/api/requests", body("POST", x)), requestStatus: (id, x) => req(`/api/requests/${id}/status`, body("PUT", x)),
  users: () => req("/api/admin/users"), toggleUser: (id, value) => req(`/api/admin/users/${id}/active?value=${value}`, { method: "PUT" }),
  courses: () => req("/api/courses"), addCourse: x => req("/api/courses", body("POST", x)), editCourse: (id, x) => req(`/api/courses/${id}`, body("PUT", x)), deleteCourse: id => req(`/api/courses/${id}`, { method: "DELETE" }),
  assignments: () => req("/api/assignments"), addAssignment: x => req("/api/assignments", body("POST", x)), editAssignment: (id, x) => req(`/api/assignments/${id}`, body("PUT", x)), deleteAssignment: id => req(`/api/assignments/${id}`, { method: "DELETE" }),
  notices: () => req("/api/notices"), addNotice: x => req("/api/notices", body("POST", x)), editNotice: (id, x) => req(`/api/notices/${id}`, body("PUT", x)), deleteNotice: id => req(`/api/notices/${id}`, { method: "DELETE" }),
  events: () => req("/api/events"), addEvent: x => req("/api/events", body("POST", x)), editEvent: (id, x) => req(`/api/events/${id}`, body("PUT", x)), deleteEvent: id => req(`/api/events/${id}`, { method: "DELETE" }),
  timetable: () => req("/api/timetable"), addTimetable: x => req("/api/timetable", body("POST", x)), editTimetable: (id, x) => req(`/api/timetable/${id}`, body("PUT", x)), deleteTimetable: id => req(`/api/timetable/${id}`, { method: "DELETE" }),

};
