import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminLogin() {
  const { isAdmin, adminLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  if (isAdmin) return <Navigate to="/admin/dashboard" replace />;

  const submit = (e) => {
    e.preventDefault();
    const res = adminLogin(form);
    if (!res.ok) return setError(res.error);
    navigate("/admin/dashboard");
  };

  return (
    <>
      <PageHero title="Admin Login">Sign in to manage EventHub bookings.</PageHero>
      <section>
        <div className="container">
          <div className="auth-layout">
            <div className="auth-card">
              <h3>Admin Sign In</h3>
              <div role="alert" className={"form-error" + (error ? " show" : "")}>{error}</div>
              <form onSubmit={submit}>
                <div className="form-group"><label htmlFor="ad-email">Admin Email</label><input type="email" id="ad-email" placeholder="Enter your admin email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
                <div className="form-group"><label htmlFor="ad-password">Password</label><input type="password" id="ad-password" placeholder="Your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
                <button type="submit" className="btn btn-primary btn-block">Log In to Admin Panel</button>
              </form>
              <p className="auth-switch"><Link to="/login">&larr; Customer login</Link></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
