import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { isUser, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  if (isUser) return <Navigate to="/my-bookings" replace />;

  const submit = (e) => {
    e.preventDefault();
    const res = login(form);
    if (!res.ok) return setError(res.error);
    navigate("/my-bookings");
  };

  return (
    <>
      <PageHero title="Welcome Back">Log in to view and manage your event bookings.</PageHero>
      <section>
        <div className="container">
          <div className="auth-layout">
            <div className="auth-card">
              <h3>Log In</h3>
              <div role="alert" className={"form-error" + (error ? " show" : "")}>{error}</div>
              <form onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="li-email">Email</label>
                  <input type="email" id="li-email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="li-password">Password</label>
                  <input type="password" id="li-password" placeholder="Your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Log In</button>
              </form>
              <p className="auth-switch">Don't have an account? <Link to="/signup">Sign up</Link></p>
              <p className="auth-switch"><Link to="/admin/login">Admin login &rarr;</Link></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
