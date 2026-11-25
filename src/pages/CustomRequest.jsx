import { localToday, validPhone, validEmail, validEventDate, validGuestCount } from "../utils/validation.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { KEYS, read, write, newRequestId } from "../utils/storage.js";

const EMPTY = { name: "", phone: "", email: "", date: "", title: "", guests: "", budget: "", description: "" };

export default function CustomRequest() {
  const { session } = useAuth();
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()]));
    if (!f.name || !f.phone || !f.email || !f.title || !f.description) {
      return setError("Please fill in your name, phone, email, event title and description.");
    }
    if (!validPhone(f.phone)) return setError("Please enter a valid 10-digit phone number.");
    if (!validEmail(f.email)) return setError("Please enter a valid email address.");
    if (f.date && !validEventDate(f.date)) return setError("Choose today or a future event date.");
    if (f.guests && !validGuestCount(f.guests)) return setError("Please enter a positive whole number of guests.");
    setError("");
    const request = {
      requestId: newRequestId(),
      customerName: f.name,
      phone: f.phone,
      email: f.email,
      preferredDate: f.date || null,
      title: f.title,
      guests: f.guests || null,
      budget: f.budget || null,
      description: f.description,
      status: "New",
      userEmail: session?.type === "user" ? session.email : null,
      createdAt: new Date().toISOString(),
    };
    if (!write(KEYS.requests, [request, ...read(KEYS.requests, [])])) {
      return setError("This browser could not save your request. Check that browser storage is available and try again.");
    }
    setRequestId(request.requestId);
  };

  return (
    <>
      <PageHero title="Request a Custom Event">Planning something that doesn't fit one of our packages? Describe it below and our team will get back to you with a custom plan.</PageHero>
      <section>
        <div className="container">
          <div className="request-layout">
            <div className="request-info-card">
              <h3>How It Works</h3>
              {[
                ["Describe your event", "Tell us what you're planning — the more detail, the better."],
                ["We review it", "Our team looks at your request and puts together a custom package and price."],
                ["We get in touch", "You'll hear back by phone or email with a plan tailored to your request."],
              ].map(([t, p], i) => (
                <div className="request-step" key={t}>
                  <span className="step-dot">{i + 1}</span>
                  <div><strong>{t}</strong><p>{p}</p></div>
                </div>
              ))}
              <p className="request-info-note">Prefer to just ask a quick question instead? Use the <Link to="/contact">Contact page</Link>.</p>
            </div>

            <div className="auth-card request-form-card">
              <h3>Describe Your Event</h3>
              {requestId && (
                <div className="form-success show">Thanks! Your request has been received — our team will review it and reach out soon. Your reference ID is <strong>{requestId}</strong>.</div>
              )}
              {!requestId && (
                <form onSubmit={submit} noValidate>
                  <div className="form-row">
                    <div className="form-group"><label htmlFor="req-name">Your Name</label><input type="text" id="req-name" placeholder="Your full name" value={form.name} onChange={set("name")} /></div>
                    <div className="form-group"><label htmlFor="req-phone">Phone Number</label><input type="tel" inputMode="numeric" id="req-phone" placeholder="10-digit mobile number" value={form.phone} onChange={set("phone")} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label htmlFor="req-email">Email</label><input type="email" id="req-email" placeholder="you@example.com" value={form.email} onChange={set("email")} /></div>
                    <div className="form-group"><label htmlFor="req-date">Preferred Date <span className="optional-tag">(optional)</span></label><input type="date" id="req-date" min={localToday()} value={form.date} onChange={set("date")} /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label htmlFor="req-title">Event Type / Title</label><input type="text" id="req-title" placeholder="e.g. Pool Party, Product Launch, Cultural Night" value={form.title} onChange={set("title")} /></div>
                    <div className="form-group"><label htmlFor="req-guests">Approx. Guests <span className="optional-tag">(optional)</span></label><input type="number" id="req-guests" min="1" placeholder="e.g. 50" value={form.guests} onChange={set("guests")} /></div>
                  </div>
                  <div className="form-group"><label htmlFor="req-budget">Estimated Budget <span className="optional-tag">(optional)</span></label><input type="text" id="req-budget" placeholder="e.g. ₹15,000 – ₹20,000" value={form.budget} onChange={set("budget")} /></div>
                  <div className="form-group"><label htmlFor="req-description">Describe Your Event or Request</label><textarea id="req-description" rows="6" placeholder="Tell us about the event — theme, must-haves, venue, anything on your mind..." value={form.description} onChange={set("description")}></textarea></div>
                  <div role="alert" className={"form-error" + (error ? " show" : "")}>{error}</div>
                  <button type="submit" className="btn btn-primary btn-block">Submit Request</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
