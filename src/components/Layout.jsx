import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { EVENTS } from "../data/events.js";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait a tick so the target section has rendered
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 50);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const { isUser, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  useEffect(() => setOpen(false), [pathname, hash]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="logo">Event<span>Hub</span></Link>
        <nav id="main-navigation" aria-label="Main navigation" className={"nav-links" + (open ? " mobile-open" : "")}>
          <NavLink to="/" end>Home</NavLink>
          <Link to="/#events">Events</Link>
          <Link to="/#how-it-works">How It Works</Link>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="nav-cta">
          <Link to="/#events" className="btn btn-primary">Book an Event</Link>
          <div className="auth-nav">
            {isAdmin && (
              <>
                <Link to="/admin/dashboard" className="auth-link">Admin Panel</Link>
                <button type="button" className="btn btn-secondary auth-btn" onClick={handleLogout}>Logout</button>
              </>
            )}
            {isUser && (
              <>
                <Link to="/my-bookings" className="auth-link">My Bookings</Link>
                <span className="auth-username">Hi, {user ? user.name.split(" ")[0] : "Account"}</span>
                <button type="button" className="btn btn-secondary auth-btn" onClick={handleLogout}>Logout</button>
              </>
            )}
            {!isUser && !isAdmin && (
              <>
                <Link to="/login" className="auth-link">Login</Link>
                <Link to="/signup" className="btn btn-secondary auth-btn">Sign Up</Link>
              </>
            )}
          </div>
          <button type="button" className="nav-toggle" aria-controls="main-navigation" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen((o) => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4 style={{ color: "white", fontSize: 22 }}>EventHub</h4>
            <p>Plan Your Perfect Event. We Take Care of Everything. EventHub helps you choose, customize and book complete event packages with ease.</p>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/#how-it-works">How It Works</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/admin/login">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h4>Events</h4>
            <ul>
              {EVENTS.slice(0, 3).map((e) => (
                <li key={e.key}><Link to={`/events/${e.key}`}>{e.title.replace(/^\S+\s/, "")}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>eventhub@example.com<br />+91 98765 43210<br />Vijayawada, Andhra Pradesh</p>
          </div>
        </div>
        <div className="footer-bottom">© 2026 EventHub. All rights reserved. Built as a college project demonstration.</div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
