import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { isUser, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (isUser) return <Navigate to="/my-bookings" replace />;

  const submit = (e) => {
    e.preventDefault();
    const res = signup(form);
    if (!res.ok) return setError(res.error);
    navigate("/my-bookings");
  };

  return (
    <>
      <PageHero title="Create Your Account">Sign up to book events and keep track of your booking history.</PageHero>
      <section>
        <div className="container">
          <div className="auth-layout">
            <div className="auth-card">
              <h3>Sign Up</h3>
              <div role="alert" className={"form-error" + (error ? " show" : "")}>{error}</div>
              <form onSubmit={submit}>
                <div className="form-group"><label htmlFor="su-name">Full Name</label><input type="text" id="su-name" placeholder="Your full name" value={form.name} onChange={set("name")} required /></div>
                <div className="form-group"><label htmlFor="su-email">Email</label><input type="email" id="su-email" placeholder="you@example.com" value={form.email} onChange={set("email")} required /></div>
                <div className="form-group"><label htmlFor="su-phone">Phone Number</label><input type="tel" inputMode="numeric" id="su-phone" placeholder="10-digit mobile number" value={form.phone} onChange={set("phone")} required /></div>
                <div className="form-group"><label htmlFor="su-password">Password</label><input type="password" id="su-password" minLength={6} placeholder="At least 6 characters" value={form.password} onChange={set("password")} required /></div>
                <button type="submit" className="btn btn-primary btn-block">Create Account</button>
              </form>
              <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
