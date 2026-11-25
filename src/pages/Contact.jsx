import { validPhone, validEmail } from "../utils/validation.js";
import { useState } from "react";
import PageHero from "../components/PageHero.jsx";

const EMPTY = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(false);
    if (!form.name.trim() || !form.message.trim()) return setError("Please enter your name and a message.");
    if (!validEmail(form.email.trim())) return setError("Please enter a valid email address.");
    if (!validPhone(form.phone.trim())) return setError("Please enter a valid 10-digit phone number.");
    setError("");
    setSent(true);
    setForm(EMPTY);
  };

  return (
    <>
      <PageHero title="Contact Us">Have a question about a package or your booking? We'd love to hear from you.</PageHero>
      <section>
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info-card">
              <h3>Get In Touch</h3>
              <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 28, fontSize: 14.5 }}>Reach out to our team for package details, custom requirements or booking support.</p>
              <div className="contact-info-item"><div className="icon-box">✉️</div><span>eventhub@example.com</span></div>
              <div className="contact-info-item"><div className="icon-box">📞</div><span>+91 98765 43210</span></div>
              <div className="contact-info-item"><div className="icon-box">📍</div><span>Vijayawada, Andhra Pradesh</span></div>
            </div>
            <div className="contact-form-card">
              <h3>Send Us a Message</h3>
              {sent && <div className="form-success show">Message form completed. This demo does not send email.</div>}
              {error && <div role="alert" className="form-error show">{error}</div>}
              <form onSubmit={submit}>
                <div className="form-group"><label htmlFor="contact-name">Name</label><input type="text" id="contact-name" value={form.name} onChange={set("name")} required /></div>
                <div className="form-group"><label htmlFor="contact-email">Email</label><input type="email" id="contact-email" value={form.email} onChange={set("email")} required /></div>
                <div className="form-group"><label htmlFor="contact-phone">Phone</label><input type="tel" inputMode="numeric" id="contact-phone" value={form.phone} onChange={set("phone")} required /></div>
                <div className="form-group"><label htmlFor="contact-message">Message</label><textarea id="contact-message" rows="5" value={form.message} onChange={set("message")} required></textarea></div>
                <button type="submit" className="btn btn-primary btn-block">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
