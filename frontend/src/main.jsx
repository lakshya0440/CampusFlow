import React, { useEffect, useState } from "react"; import { createRoot } from "react-dom/client"; import { BrowserRouter, useNavigate, useLocation } from "react-router-dom"; import { api } from "./api"; import { LayoutDashboard, FileText, CalendarDays, BookOpen, Megaphone, CalendarClock, UserRound, Users, LogOut, Sun, Moon, Maximize2, Minimize2, Menu, X, Plus, MapPin, Clock, ShieldCheck, CheckCircle2, AlertCircle, ChevronRight, Search, Power } from "lucide-react"; import "./style.css";

const App = () => {
  const nav = useNavigate(),
    loc = useLocation();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cf_user") || "null");
    } catch {
      return null;
    }
  });

  const [theme, setTheme] = useState(
    localStorage.getItem("cf_theme") || "light"
  );

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("cf_theme", theme);
  }, [theme]);

  const login = d => {
    localStorage.setItem("cf_token", d.token);
    localStorage.setItem("cf_user", JSON.stringify(d));
    setUser(d);
    nav("/app/dashboard");
  };
  
  const [showPassword, setShowPassword] = useState(false);

  const logout = () => {
    localStorage.removeItem("cf_token");
    localStorage.removeItem("cf_user");
    setUser(null);
    nav("/login", { replace: true });
  };

  if (!user && loc.pathname.startsWith("/app")) {
    return <Login login={login} />;
  }

  if (loc.pathname === "/login") {
    return <Login login={login} />;
  }

  if (loc.pathname === "/register") {
    return <Register />;
  }

  if (!loc.pathname.startsWith("/app")) {
    return (
      <Landing
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  return (
    <Shell
      user={user}
      logout={logout}
      theme={theme}
      setTheme={setTheme}
      mobile={mobile}
      setMobile={setMobile}
    />
  );
};

function HomeFullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(
    !!document.fullscreenElement
  );

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  return (
    <button
      type="button"
      className="home-fullscreen"
      onClick={toggleFullscreen}
      title={isFullscreen ? "Exit full screen" : "Enter full screen"}
      aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
    >
      {isFullscreen ? <Minimize2 /> : <Maximize2 />}
      <span>{isFullscreen ? "Exit" : "Full screen"}</span>
    </button>
  );
}
function HomeThemeButton({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      type="button"
      className="home-theme"
      onClick={toggleTheme}
      title={
        theme === "light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
      aria-label={
        theme === "light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}

function Landing({ theme, setTheme }) {
  const n = useNavigate();

  return (
    <div className="landing">
      <nav>
        <HomeThemeButton theme={theme} setTheme={setTheme} />
        <HomeFullscreenButton />
        <Brand />

        <div className="navlinks">
          <button onClick={() => n("/login")}>Sign in</button>

          <button
            className="primary"
            onClick={() => n("/register")}
          >
            Get started
          </button>
        </div>
      </nav>

      <main className="hero">
        <div>
          <span className="eyebrow">
            SMART CAMPUS • ONE FLOW
          </span>

          <h1>
            Campus operations, <em>finally connected.</em>
          </h1>

          <p>
            One modern workspace for students, faculty and administrators —
            with academic records, campus services and request management in
            one place.
          </p>

          <div className="actions">
            <button
              className="primary big"
              onClick={() => n("/register")}
            >
              Create account <ChevronRight />
            </button>

            <button onClick={() => n("/login")}>
              Open portal
            </button>
          </div>

          <div className="trust">
            <span>✓ Role-based access</span>
            <span>✓ Request tracking</span>
            <span>✓ Secure JWT</span>
          </div>
        </div>

        <div className="hero-card">
          <div className="mini-top">
            <Brand compact />
            <span>ADMIN VIEW</span>
          </div>

          <div className="mini-stats">
            <i />
            <i />
            <i />
          </div>

          <div className="mini-request">
            <b>Service Requests</b>

            <span className="status pending">
              12 pending
            </span>

            <hr />

            <p>Wi-Fi issue · Library Block</p>
            <p>Classroom repair · CSE Dept.</p>
            <p>ID card correction · Student Affairs</p>
          </div>
        </div>
      </main>

      <section className="features">
        <Feature
          icon={ShieldCheck}
          t="Secure by design"
          d="JWT authentication with role-specific permissions."
        />

        <Feature
          icon={FileText}
          t="Service requests"
          d="Raise, review and resolve campus problems transparently."
        />

        <Feature
          icon={CalendarDays}
          t="Campus at a glance"
          d="Events, holidays, notices, assignments and schedules."
        />

        <Feature
          icon={Users}
          t="Three role experiences"
          d="Distinct student, faculty and admin workflows."
        />
      </section>
    </div>
  );
}
function Feature({ icon: I, t, d }) { return <div className="feature"><I /><h3>{t}</h3><p>{d}</p></div> }
function Brand({ compact = false }) { return <div className="brand"><div className="logo">CF</div>{!compact && <div><b>Campus<span>Flow</span></b><small>Smart Campus Companion</small></div>}</div> }
function Login({ login }) {
  const [n, setN] = useState(""), [p, setP] = useState(""), [err, setErr] = useState(""), [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const submit = async e => {
    e.preventDefault(); setBusy(true); setErr("");
    try { login(await api.login({ email: n, password: p })) }
    catch (x) { setErr(x.message) }
    finally { setBusy(false) }
  };
  return <Auth><div className="auth-card"><Brand /><span className="eyebrow">WELCOME BACK</span><h2>Sign in to CampusFlow</h2><p className="muted">Your workspace is selected automatically from your account.</p>{err && <Alert text={err} />}<form onSubmit={submit}><Field label="Email"><input type="email" required value={n} onChange={e => setN(e.target.value)} placeholder="you@gmail.com" /></Field><Field label="Password"><input type="password" required value={p} onChange={e => setP(e.target.value)} placeholder="••••••••" /></Field><button className="primary full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button></form><p className="auth-foot">New here? <button type="button" onClick={() => nav("/register")}>Create an account</button></p><small className="demo">Demo admin: admin@campusflow.local · Admin@123</small></div></Auth> }
function Register() {
  const nav = useNavigate();

  const [role, setRole] = useState("STUDENT");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    studentId: "",
    employeeId: "",
    department: "CSE",
    year: "3rd Year",
    designation: "Faculty"
  });

  const [errors, setErrors] = useState({});
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  // ---------- VALIDATION ----------

  const validateField = (key, value) => {
    let message = "";

    const v = value.trim();

    if (key === "name") {
      if (!v) {
        message = "Name is required.";
      } else if (!/^[A-Za-z]/.test(v)) {
        message = "Name should begin with a letter.";
      } else if (!/^[A-Za-z][A-Za-z .'-]*$/.test(v)) {
        message = "Name can contain letters, spaces, hyphens and apostrophes only.";
      } else if (v.length < 2) {
        message = "Name must contain at least 2 characters.";
      }
    }

    if (key === "email") {
      if (!v) {
        message = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
        message = "Enter a valid email address.";
      }
    }

    if (key === "password") {
      if (!value) {
        message = "Password is required.";
      } else if (value.length < 6) {
        message = "Password must contain at least 6 characters.";
      } else if (!/[A-Za-z]/.test(value)) {
        message = "Password must contain at least one letter.";
      } else if (!/[0-9]/.test(value)) {
        message = "Password must contain at least one number.";
      }
    }

    if (key === "studentId") {
      if (!v) {
        message = "Student ID is required.";
      } else if (!/^[A-Za-z0-9-]+$/.test(v)) {
        message = "Student ID can contain letters, numbers and hyphens only.";
      }
    }

    if (key === "employeeId") {
      if (!v) {
        message = "Employee ID is required.";
      } else if (!/^[A-Za-z0-9-]+$/.test(v)) {
        message = "Employee ID can contain letters, numbers and hyphens only.";
      }
    }

    if (key === "department") {
      if (!v) {
        message = "Department is required.";
      } else if (!/^[A-Za-z ]+$/.test(v)) {
        message = "Department should contain letters only.";
      }
    }

    if (key === "designation") {
      if (!v) {
        message = "Designation is required.";
      } else if (!/^[A-Za-z][A-Za-z .'-]*$/.test(v)) {
        message = "Enter a valid designation.";
      }
    }

    return message;
  };

  // ---------- INPUT CHANGE ----------

  const ch = key => e => {
    const value = e.target.value;

    setForm(prev => ({
      ...prev,
      [key]: value
    }));

    const message = validateField(key, value);

    setErrors(prev => ({
      ...prev,
      [key]: message
    }));

    // Clear backend error when user starts correcting fields
    setErr("");
  };

  // ---------- FULL FORM VALIDATION ----------

  const validateForm = () => {
    const fieldsToValidate =
      role === "STUDENT"
        ? ["name", "email", "studentId", "department", "password"]
        : ["name", "email", "employeeId", "department", "designation", "password"];

    const newErrors = {};

    fieldsToValidate.forEach(key => {
      const message = validateField(key, form[key]);

      if (message) {
        newErrors[key] = message;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ---------- SUBMIT ----------

  const submit = async e => {
    e.preventDefault();

    setErr("");
    setOk("");

    if (!validateForm()) {
      setErr("Please correct the highlighted fields before creating your account.");
      return;
    }

    try {
      if (role === "STUDENT") {
        await api.student(form);
      } else {
        await api.faculty(form);
      }

      setOk("Registration successful. You can now sign in.");

      setTimeout(() => {
        nav("/login");
      }, 900);

    } catch (x) {
      setErr(x.message);
    }
  };

  // ---------- HELPER FOR FIELD CLASS ----------

  const fieldClass = key => {
    if (!form[key]) return "";

    return errors[key] ? "input-error" : "input-valid";
  };

  return (
    <Auth>

      <div className="auth-card">

        <Brand />

        <span className="eyebrow">
          JOIN CAMPUSFLOW
        </span>

        <h2>Create your account</h2>

        <p className="muted">
          Students and faculty have separate registration paths.
        </p>

        {/* ROLE SELECTION */}

        <div className="role-tabs">

          <button
            type="button"
            className={role === "STUDENT" ? "sel" : ""}
            onClick={() => {
              setRole("STUDENT");
              setErrors({});
              setErr("");
            }}
          >
            Student
          </button>

          <button
            type="button"
            className={role === "FACULTY" ? "sel" : ""}
            onClick={() => {
              setRole("FACULTY");
              setErrors({});
              setErr("");
            }}
          >
            Faculty
          </button>

        </div>

        {err && <Alert text={err} />}

        {ok && (
          <div className="success">
            <CheckCircle2 /> {ok}
          </div>
        )}

        <form onSubmit={submit}>

          {/* NAME + EMAIL */}

          <div className="two">

            <Field label="Full name">

              <input
                required
                type="text"
                value={form.name}
                onChange={ch("name")}
                className={fieldClass("name")}
                placeholder="Enter your full name"
              />

              {errors.name && (
                <small className="field-error">
                  {errors.name}
                </small>
              )}

            </Field>


            <Field label="Email">

              <input
                required
                type="email"
                value={form.email}
                onChange={ch("email")}
                className={fieldClass("email")}
                placeholder="example@email.com"
              />

              {errors.email && (
                <small className="field-error">
                  {errors.email}
                </small>
              )}

            </Field>

          </div>


          {/* ID + DEPARTMENT */}

          <div className="two">

            <Field
              label={
                role === "STUDENT"
                  ? "Student ID"
                  : "Employee ID"
              }
            >

              <input
                required
                value={
                  role === "STUDENT"
                    ? form.studentId
                    : form.employeeId
                }
                onChange={ch(
                  role === "STUDENT"
                    ? "studentId"
                    : "employeeId"
                )}
                className={
                  role === "STUDENT"
                    ? fieldClass("studentId")
                    : fieldClass("employeeId")
                }
                placeholder={
                  role === "STUDENT"
                    ? "Enter student ID"
                    : "Enter employee ID"
                }
              />

              {errors[
                role === "STUDENT"
                  ? "studentId"
                  : "employeeId"
              ] && (
                <small className="field-error">
                  {
                    errors[
                      role === "STUDENT"
                        ? "studentId"
                        : "employeeId"
                    ]
                  }
                </small>
              )}

            </Field>


            <Field label="Department">

              <input
                required
                value={form.department}
                onChange={ch("department")}
                className={fieldClass("department")}
                placeholder="CSE"
              />

              {errors.department && (
                <small className="field-error">
                  {errors.department}
                </small>
              )}

            </Field>

          </div>


          {/* YEAR/DESIGNATION + PASSWORD */}

          <div className="two">

            {role === "STUDENT" ? (

              <Field label="Year">

                <select
                  value={form.year}
                  onChange={ch("year")}
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>

              </Field>

            ) : (

              <Field label="Designation">

                <input
                  required
                  value={form.designation}
                  onChange={ch("designation")}
                  className={fieldClass("designation")}
                  placeholder="Assistant Professor"
                />

                {errors.designation && (
                  <small className="field-error">
                    {errors.designation}
                  </small>
                )}

              </Field>

            )}


            <Field label="Password">

              <input
                required
                type="password"
                value={form.password}
                onChange={ch("password")}
                className={fieldClass("password")}
                placeholder="Minimum 6 characters"
              />

              {errors.password && (
                <small className="field-error">
                  {errors.password}
                </small>
              )}

            </Field>

          </div>


          {/* SUBMIT */}

          <button
            className="primary full"
            type="submit"
            disabled={
              Object.keys(errors).some(
                key => errors[key]
              )
            }
          >
            Create {role.toLowerCase()} account
          </button>

        </form>


        <p className="auth-foot">

          Already registered?

          <button
            type="button"
            onClick={() => nav("/login")}
          >
            Sign in
          </button>

        </p>

      </div>

    </Auth>
  );
}


function Auth({ children }) {
  return (
    <div className="auth">

      <HomeFullscreenButton />

      <div className="auth-visual">

        <Brand />

        <div>

          <span className="eyebrow">
            THE CAMPUS OPERATING LAYER
          </span>

          <h1>
            Less chasing.
            <br />
            <em>More flowing.</em>
          </h1>

          <p>
            From a classroom issue to an administrative
            resolution, every request has one visible journey.
          </p>

        </div>

        <div className="quote">
          “CampusFlow makes campus services feel like a proper product.”
        </div>

      </div>

      <div className="auth-form">

        <button
          className="home"
          onClick={() => location.href = "/"}
        >
          ← Home
        </button>

        {children}

      </div>

    </div>
  );
}
function Field({ label, children }) { return <label>{label}{children}</label> } function Alert({ text }) { return <div className="alert"><AlertCircle /> {text}</div> }

function Shell({ user, logout, theme, setTheme, mobile, setMobile }) { const path = location.pathname.split("/").pop(); const nav = useNavigate(); const isAdmin = user.role === "ADMIN", isFaculty = user.role === "FACULTY"; const [fullscreen, setFullscreen] = useState(!!document.fullscreenElement); useEffect(() => { const f = () => setFullscreen(!!document.fullscreenElement); document.addEventListener("fullscreenchange", f); return () => document.removeEventListener("fullscreenchange", f) }, []); const toggleFullscreen = async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen() } catch { } }; const items = [["dashboard", "Overview", LayoutDashboard], ["requests", "Service Requests", FileText], ["courses", "Courses", BookOpen], ["assignments", "Assignments", FileText], ["notices", "Notices", Megaphone], ["events", "Events", CalendarDays], ["timetable", "Timetable", CalendarClock], ["profile", "My Profile", UserRound]]; if (isFaculty) { } if (isAdmin) items.push(["users", "Accounts", Users]); return <div className="shell"><aside className={mobile ? "open" : ""}><div className="side-brand"><Brand /><button onClick={() => setMobile(false)}><X /></button></div><div className="role-line"><span className={"role-dot " + user.role.toLowerCase()} />{user.role} workspace</div><nav>{items.map(([p, l, I]) => <button key={p} className={path === p ? "active" : ""} onClick={() => { nav("/app/" + p); setMobile(false) }}><I />{l}</button>)}</nav><div className="side-user"><div className="avatar">{(user.name || "U")[0]}</div><div><b>{user.name}</b><small>{user.email}</small></div><button onClick={logout}><LogOut /></button></div></aside><main className="content"><header><button className="menu" onClick={() => setMobile(true)}><Menu /></button><div><b>{title(path)}</b><small>CampusFlow workspace</small></div><div className="head-actions"><button className="top-tool theme-tool" title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? <Moon /> : <Sun />}<span>{theme === "light" ? "Dark" : "Light"}</span></button><button className="top-tool fullscreen-tool" title={fullscreen ? "Exit full screen" : "Enter full screen"} aria-label={fullscreen ? "Exit full screen" : "Enter full screen"} onClick={toggleFullscreen}>{fullscreen ? <Minimize2 /> : <Maximize2 />}<span>{fullscreen ? "Exit" : "Full screen"}</span></button><div className="head-person"><div className="avatar sm">{(user.name || "U")[0]}</div><div><b>{user.name}</b><small>{user.role}</small></div></div></div></header><div className="page">{path === "dashboard" ? <Dashboard user={user} /> : path === "requests" ? <Requests user={user} /> : path === "courses" ? <DataList type="courses" user={user} /> : path === "assignments" ? <DataList type="assignments" user={user} /> : path === "notices" ? <DataList type="notices" user={user} /> : path === "events" ? <DataList type="events" user={user} /> : path === "timetable" ? <DataList type="timetable" user={user} /> : path === "profile" ? <Profile user={user} /> : path === "users" ? <UsersPage /> : <Dashboard user={user} />}</div></main></div> }
function title(x) { return ({ dashboard: "Overview", requests: "Service Requests", courses: "Courses", assignments: "Assignments", notices: "Notices", events: "Events", timetable: "Timetable", profile: "My Profile", users: "Accounts" })[x] || "CampusFlow" }

function Dashboard({ user }) {
  const [d, setD] = useState(null); useEffect(() => { api.dashboard().then(setD).catch(() => setD({ statistics: {} })) }, []);
  const s = d?.statistics || {}; const role = user.role;
  const cards = role === "STUDENT" ? [
    ["My Requests", d?.requests?.length || 0, FileText, "Track service issues"],
    ["Assignments", s.assignments || 0, FileText, "Deadlines to watch"],
    ["Events", s.events || 0, CalendarDays, "Upcoming campus life"],
    ["Courses", s.courses || 0, BookOpen, "Your academic space"]
  ] : role === "FACULTY" ? [
    ["My Requests", d?.requests?.length || 0, FileText, "Service issues raised"],
    ["Assignments", s.assignments || 0, FileText, "Academic workload"],
    ["Events", s.events || 0, CalendarDays, "Campus calendar"],
    ["Courses", s.courses || 0, BookOpen, "Subjects in system"]
  ] : [
    ["Pending Requests", s.pendingRequests || 0, FileText, "Needs your decision"],
    ["Students", s.students || 0, Users, "Registered accounts"],
    ["Faculty", s.faculty || 0, UserRound, "Teaching accounts"],
    ["Resolved", s.resolvedRequests || 0, CheckCircle2, "Completed services"]
  ];
  return <div><div className="page-title"><div><span className="eyebrow">{role} DASHBOARD</span><h1>{greeting(user.name)}</h1><p>{role === "ADMIN" ? "See the whole campus and act where decisions are needed." : role === "FACULTY" ? "Teach, publish, manage and raise service requests from one workspace." : "Keep up with your academics and get campus issues resolved."}</p></div>{role !== "ADMIN" && <button className="primary" onClick={() => nav("/app/requests")}><Plus /> Raise a request</button>}</div><div className="stats">{cards.map(([l, v, I, dsc]) => <div className="stat" key={l}><div className="stat-icon"><I /></div><div><span>{l}</span><b>{v}</b><small>{dsc}</small></div></div>)}</div><div className="dash-grid"><div className="panel"><div className="panel-head"><div><span className="eyebrow">WHAT'S NEXT</span><h2>Campus pulse</h2></div><span className="online"><i /> Backend online</span></div><div className="pulse">{(d?.events || []).slice(0, 3).map(e => <div className="pulse-row" key={e.id}><div className="date-box">{String(e.eventDate || "").slice(5, 10)}</div><div><b>{e.title}</b><p>{e.venue} · {e.category}</p></div><ChevronRight /></div>)}{!(d?.events?.length) && <Empty text="Campus events will appear here." />}</div></div><div className="panel"><div className="panel-head"><div><span className="eyebrow">REQUESTS</span><h2>{role === "ADMIN" ? "Needs attention" : "Your requests"}</h2></div></div>{(d?.requests || []).slice(0, 4).map(r => <div className="request-mini" key={r.id}><span className={"status " + r.status.toLowerCase()}>{r.status}</span><div><b>{r.subject}</b><small>{r.department} · {r.location}</small></div></div>)}{!(d?.requests?.length) && <Empty text={role === "ADMIN" ? "No requests yet." : "Raise a service request when you need campus help."} />}</div></div></div>
}
function greeting(n) { return `Good to see you, ${(n || "there").split(" ")[0]}.` }
function Empty({ text }) { return <div className="empty"><AlertCircle /><span>{text}</span></div> }

function Requests({ user }) {
  const [items, setItems] = useState([]), [modal, setModal] = useState(false), [filter, setFilter] = useState("ALL"), [busy, setBusy] = useState(false), [form, setForm] = useState({ department: user.department || "CSE", location: "", category: "Infrastructure", subject: "", description: "" }), [err, setErr] = useState("");
  const load = () => { (user.role === "ADMIN" ? api.requests() : api.mineRequests()).then(setItems).catch(e => setErr(e.message)) }; useEffect(load, []);
  const create = async e => { e.preventDefault(); if (user.role === "ADMIN") return; setBusy(true); try { await api.createRequest(form); setModal(false); setForm({ ...form, location: "", subject: "", description: "" }); load() } catch (x) { setErr(x.message) } finally { setBusy(false) } };
  const update = async (id, status) => { try { await api.requestStatus(id, { status, adminComment: status === "RESOLVED" ? "Resolved by Campus Administration" : status === "DECLINED" ? "Request declined by Campus Administration" : "" }); load() } catch (x) { setErr(x.message) } };
  const shown = items.filter(x => filter === "ALL" || x.status === filter);
  return <div><div className="page-title"><div><span className="eyebrow">CAMPUS SERVICES</span><h1>Service Requests</h1><p>Raise a campus issue or follow its resolution from submission to closure.</p></div>{user.role !== "ADMIN" && <button className="primary" onClick={() => setModal(true)}><Plus /> New request</button>}</div>{err && <Alert text={err} />}<div className="filterbar"><div className="filters">{["ALL", "PENDING", "RESOLVED", "DECLINED"].map(x => <button className={filter === x ? "sel" : ""} onClick={() => setFilter(x)} key={x}>{x}</button>)}</div><span>{shown.length} requests</span></div><div className="request-list">{shown.map(r => <div className="request-card" key={r.id}><div className="request-top"><span className={"status " + r.status.toLowerCase()}>{r.status}</span><small>#{String(r.id).slice(-6)}</small></div><div className="request-main"><div><h3>{r.subject}</h3><p>{r.description}</p><div className="request-meta"><span><Users /> {r.requesterName} · {r.requesterRole}</span><span><MapPin /> {r.department} · {r.location}</span><span><Clock /> {r.category}</span></div></div>{user.role === "ADMIN" && r.status === "PENDING" && <div className="admin-actions"><button className="resolve" onClick={() => update(r.id, "RESOLVED")}>Resolve</button><button className="decline" onClick={() => update(r.id, "DECLINED")}>Decline</button><button className="pending" onClick={() => update(r.id, "PENDING")}>Keep pending</button></div>}{user.role === "ADMIN" && r.status !== "PENDING" && <div className="request-closed"><CheckCircle2 /> Request {r.status.toLowerCase()} — status locked</div>}</div>{r.adminComment && <div className="admin-comment"><ShieldCheck /> <span><b>Admin update:</b> {r.adminComment}</span></div>}</div>)}{!shown.length && <div className="panel"><Empty text="No requests match this filter." /></div>}</div>{modal && <Modal title="Raise a campus service request" close={() => setModal(false)}><form onSubmit={create}><div className="two"><Field label="Department"><input required value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} /></Field><Field label="Problem location / place"><input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Library Block, Room 204" /></Field></div><div className="two"><Field label="Category"><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option>Infrastructure</option><option>IT / Wi-Fi</option><option>Academic</option><option>Hostel</option><option>Library</option><option>Transport</option><option>Administration</option><option>Other</option></select></Field><Field label="Subject"><input required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Short description of the issue" /></Field></div><Field label="Describe the problem"><textarea required minLength="5" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Explain what happened and what service you need." /></Field><button className="primary full" disabled={busy}>{busy ? "Submitting…" : "Submit request"}</button></form></Modal>}</div>
}

const cfg = {
  courses: { title: "Courses", icon: BookOpen, load: api.courses, can: "faculty", deleteKey: "deleteCourse", fields: ["code", "name", "department", "semester", "credits", "facultyName"], labels: ["Code", "Course", "Department", "Semester", "Credits", "Faculty"] },
  assignments: { title: "Assignments", icon: FileText, load: api.assignments, can: "faculty", deleteKey: "deleteAssignment", fields: ["courseName", "title", "description", "dueDate"], labels: ["Course", "Title", "Description", "Due date"] },
  notices: { title: "Notices & Holidays", icon: Megaphone, load: api.notices, can: "faculty", deleteKey: "deleteNotice", fields: ["title", "category", "content", "audience"], labels: ["Title", "Category", "Details", "Audience"] },
  events: { title: "Campus Events", icon: CalendarDays, load: api.events, can: "faculty", deleteKey: "deleteEvent", fields: ["title", "eventDate", "venue", "category"], labels: ["Event", "Date", "Venue", "Category"] },
  timetable: { title: "Timetable", icon: CalendarClock, load: api.timetable, can: "faculty", deleteKey: "deleteTimetable", fields: ["day", "startTime", "endTime", "courseName", "room", "facultyName"], labels: ["Day", "Start", "End", "Course", "Room", "Faculty"] }
};
function DataList({ type, user }) {
  const c = cfg[type];
  const [items, setItems] = useState([]), [modal, setModal] = useState(null), [q, setQ] = useState(""), [err, setErr] = useState("");
  const can = user.role === "ADMIN" || user.role === "FACULTY";
  const load = async () => {
    try { const x = await c.load(); setItems(Array.isArray(x) ? x : []); setErr(""); }
    catch (e) { setErr(e.message); }
  };
  useEffect(() => { load(); }, [type]);
  const remove = async item => {
    if (!window.confirm(`Delete this ${c.title.replace(/s$/, "").toLowerCase()}? This action cannot be undone.`)) return;
    try { await api[c.deleteKey](item.id); await load(); } catch (e) { setErr(e.message); }
  };
  return <div><div className="page-title"><div><span className="eyebrow">CAMPUS DATA</span><h1>{c.title}</h1><p>{type === "events" ? "Events and upcoming campus activities." : type === "notices" ? "Important notices, holidays and announcements." : "Current campus records."}</p></div>{can && <button className="primary" onClick={() => setModal({ mode: "add", item: {} })}><Plus /> Add</button>}</div>{err && <Alert text={err} />}<div className="panel"><div className="table-tools"><div className="search"><Search /><input placeholder="Search records…" value={q} onChange={e => setQ(e.target.value)} /></div><span>{items.length} records</span></div><div className="table-wrap"><table><thead><tr>{c.labels.map(x => <th key={x}>{x}</th>)}{can && <th>Actions</th>}</tr></thead><tbody>{items.filter(x => JSON.stringify(x).toLowerCase().includes(q.toLowerCase())).map(x => <tr key={x.id}>{c.fields.map(k => <td key={k}>{String(x[k] ?? "—")}</td>)}{can && <td><div className="record-actions"><button className="small-btn" onClick={() => setModal({ mode: "edit", item: x })}>Edit</button><button className="small-btn danger" onClick={() => remove(x)}>Delete</button></div></td>}</tr>)}</tbody></table>{!items.length && <Empty text="No records yet." />}</div></div>{modal && <RecordModal type={type} mode={modal.mode} initial={modal.item} close={() => setModal(null)} onSaved={load} />}</div>
}
function RecordModal({ type, mode, initial, close, onSaved }) {
  const [form, setForm] = useState(initial || {}), [err, setErr] = useState(""), [busy, setBusy] = useState(false);
  const fields = { courses: [["code", "Course code"], ["name", "Course name"], ["department", "Department"], ["semester", "Semester"], ["credits", "Credits"], ["facultyName", "Faculty name"]], assignments: [["courseId", "Course ID"], ["courseName", "Course name"], ["title", "Title"], ["description", "Description"], ["dueDate", "Due date"]], notices: [["title", "Title"], ["content", "Content"], ["category", "Category"], ["audience", "Audience"]], events: [["title", "Title"], ["description", "Description"], ["venue", "Venue"], ["eventDate", "Date"], ["category", "Category"]], timetable: [["day", "Day"], ["startTime", "Start time"], ["endTime", "End time"], ["courseId", "Course ID"], ["courseName", "Course"], ["room", "Room"], ["facultyName", "Faculty"], ["department", "Department"], ["year", "Year"]] }[type];
  const apiFns = { courses: ["addCourse", "editCourse"], assignments: ["addAssignment", "editAssignment"], notices: ["addNotice", "editNotice"], events: ["addEvent", "editEvent"], timetable: ["addTimetable", "editTimetable"] }[type];
  const save = async e => { e.preventDefault(); setBusy(true); setErr(""); try { const payload = type === "courses" ? { ...form, credits: Number(form.credits || 0) } : form; const x = mode === "add" ? await api[apiFns[0]](payload) : await api[apiFns[1]](initial.id, payload); await onSaved(); close(); } catch (x) { setErr(x.message) } finally { setBusy(false) } };
  return <Modal title={`${mode === "edit" ? "Edit" : "Add"} ${cfg[type].title}`} close={close}>{err && <Alert text={err} />}<form onSubmit={save}><div className="two">{fields.map(([k, l]) => <Field key={k} label={l}>{k === "description" || k === "content" ? <textarea required value={form[k] || ""} onChange={e => setForm({ ...form, [k]: e.target.value })} /> : <input required value={form[k] || ""} onChange={e => setForm({ ...form, [k]: e.target.value })} />}</Field>)}</div><button className="primary full" disabled={busy}>{busy ? "Saving…" : mode === "edit" ? "Save changes" : "Save record"}</button></form></Modal>
}
function Profile({ user }) { const [f, setF] = useState(user), [msg, setMsg] = useState(""); const save = async e => { e.preventDefault(); try { const x = await api.updateProfile({ name: f.name, department: f.department, year: f.year, designation: f.designation }); localStorage.setItem("cf_user", JSON.stringify({ ...user, ...x })); setMsg("Profile saved") } catch (x) { setMsg(x.message) } }; return <div><div className="page-title"><div><span className="eyebrow">ACCOUNT</span><h1>My Profile</h1><p>Your account information.</p></div></div><div className="profile-grid"><div className="panel profile-hero"><div className="avatar xl">{user.name[0]}</div><div><h2>{user.name}</h2><span className="role-badge">{user.role}</span><p>{user.email}</p></div></div><div className="panel"><form onSubmit={save}><div className="two"><Field label="Name"><input value={f.name || ""} onChange={e => setF({ ...f, name: e.target.value })} /></Field><Field label="Department"><input value={f.department || ""} onChange={e => setF({ ...f, department: e.target.value })} /></Field></div><div className="two"><Field label="Year"><input value={f.year || ""} onChange={e => setF({ ...f, year: e.target.value })} /></Field><Field label="Designation"><input value={f.designation || ""} onChange={e => setF({ ...f, designation: e.target.value })} /></Field></div><button className="primary">Save profile</button>{msg && <p className="muted">{msg}</p>}</form></div></div></div> }
function UsersPage() { const [u, setU] = useState([]); const load = () => api.users().then(setU).catch(() => { }); useEffect(load, []); return <div><div className="page-title"><div><span className="eyebrow">ADMIN CONTROL</span><h1>Accounts</h1><p>View registered students, faculty and administrators.</p></div><button className="primary" onClick={load}><Users /> Refresh</button></div><div className="panel table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>ID</th><th>Status</th><th>Action</th></tr></thead><tbody>{u.map(x => <tr key={x.id}><td>{x.name}</td><td>{x.email}</td><td><span className="role-badge">{x.role}</span></td><td>{x.department || "—"}</td><td>{x.studentId || x.employeeId || "—"}</td><td>{x.active ? "Active" : "Disabled"}</td><td><button className="small-btn" onClick={async () => { await api.toggleUser(x.id, !x.active); load() }}><Power /> {x.active ? "Disable" : "Enable"}</button></td></tr>)}</tbody></table></div></div> }
function Modal({ title, close, children }) { return <div className="modal-bg"><div className="modal"><div className="modal-head"><h2>{title}</h2><button onClick={close}><X /></button></div>{children}</div></div> }
createRoot(document.getElementById("root")).render(<BrowserRouter><App /></BrowserRouter>);
