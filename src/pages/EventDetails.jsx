import { localToday, validPhone, validEmail, validEventDate, validGuestCount } from "../utils/validation.js";
import { useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../data/events.js";
import { useAuth } from "../context/AuthContext.jsx";
import { KEYS, read, write, formatRupees, newBookingId } from "../utils/storage.js";
import NotFound from "./NotFound.jsx";

export default function EventDetails() {
  const { key } = useParams();
  const event = getEvent(key);
  if (!event) return <NotFound />;
  // key={...} resets selections + form when switching between events
  return <PackagePage key={event.key} event={event} />;
}

function PackagePage({ event }) {
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const formRef = useRef(null);

  const [selected, setSelected] = useState([]); // add-on ids
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: user?.name ?? "", phone: user?.phone ?? "", email: user?.email ?? "", date: "", location: "", guests: "" });

  const chosen = useMemo(() => event.addons.filter((a) => selected.includes(a.id)), [event, selected]);
  const addonsTotal = chosen.reduce((s, a) => s + a.price, 0);
  const total = event.basePrice + addonsTotal;

  const toggle = (id) => setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openForm = () => {
    setFormOpen(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const submit = (e) => {
    e.preventDefault();
    const v = { name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), date: form.date, location: form.location.trim(), guests: form.guests };
    if (!v.name || !v.phone || !v.email || !v.date || !v.location || !v.guests) {
      return setError("Please fill in all fields before confirming your booking.");
    }
    if (!validPhone(v.phone)) {
      return setError("Please enter a valid 10-digit phone number.");
    }
    if (!validEmail(v.email)) return setError("Please enter a valid email address.");
    if (!validEventDate(v.date)) return setError("Choose today or a future event date.");
    if (!validGuestCount(v.guests)) return setError("Please enter a positive whole number of guests.");
    setError("");

    const booking = {
      bookingId: newBookingId(),
      customerName: v.name,
      phone: v.phone,
      email: v.email,
      eventDate: v.date,
      location: v.location,
      guests: v.guests,
      eventKey: event.key,
      eventName: event.name,
      basePrice: event.basePrice,
      addons: chosen.map((a) => a.label),
      addonsTotal,
      totalPrice: total,
      status: "Pending",
      userEmail: session?.type === "user" ? session.email : null,
      createdAt: new Date().toISOString(),
    };
    if (!write(KEYS.bookings, [booking, ...read(KEYS.bookings, [])])) {
      return setError("This browser could not save your booking. Check that browser storage is available and try again.");
    }
    navigate(`/booking/confirmation/${booking.bookingId}`);
  };

  return (
    <div className="container">
      <Link to="/#events" className="back-link">&larr; Back to All Events</Link>

      <div className="package-banner">
        <img src={event.banner} alt={event.name} />
      </div>

      <div className="package-layout">
        <div className="package-main">
          <span className="package-badge">Complete Event Package</span>
          <h1>{event.name}</h1>
          <p className="package-desc">{event.desc}</p>

          <div className="package-block">
            <h2>What's Included</h2>
            <ul className="included-list">
              {event.included.map((item) => (
                <li key={item}><span className="check">&#10003;</span> {item}</li>
              ))}
            </ul>
          </div>

          <div className="package-block">
            <h2>Customize Your Package</h2>
            {event.addons.map((a) => (
              <label
                key={a.id}
                htmlFor={a.id}
                className={"addon-item" + (selected.includes(a.id) ? " checked" : "")}
                style={{ cursor: "pointer" }}
              >
                <span className="addon-label">
                  <input type="checkbox" id={a.id} className="addon-checkbox" checked={selected.includes(a.id)} onChange={() => toggle(a.id)} />
                  {a.label}
                </span>
                <span className="addon-price">+ {formatRupees(a.price)}</span>
              </label>
            ))}
          </div>

          {formOpen && (
            <div className="package-block booking-form-section open" ref={formRef}>
              <h2>Enter Your Event Details</h2>
              <div className="booking-login-note" style={{ display: "block" }}>
                {user ? (
                  <>Booking as {user.name} — this booking will be saved to your account.</>
                ) : (
                  <>Booking as a guest. <Link to="/login">Log in</Link> to save this booking to your account and track it later.</>
                )}
              </div>
              <div role="alert" className={"form-error" + (error ? " show" : "")}>{error}</div>
              <form onSubmit={submit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="field-name">Customer Name</label>
                    <input type="text" id="field-name" placeholder="Your full name" value={form.name} onChange={setField("name")} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-phone">Phone Number</label>
                    <input type="tel" inputMode="numeric" autoComplete="tel-national" id="field-phone" placeholder="10-digit mobile number" value={form.phone} onChange={setField("phone")} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="field-email">Email</label>
                    <input type="email" id="field-email" placeholder="you@example.com" value={form.email} onChange={setField("email")} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-date">Event Date</label>
                    <input type="date" id="field-date" min={localToday()} value={form.date} onChange={setField("date")} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="field-location">Event Location</label>
                    <input type="text" id="field-location" placeholder="City / venue" value={form.location} onChange={setField("location")} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-guests">Number of Guests</label>
                    <input type="number" id="field-guests" min="1" placeholder="e.g. 30" value={form.guests} onChange={setField("guests")} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Selected Package</label>
                  <input type="text" value={event.name} readOnly />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Selected Add-ons</label>
                    <input type="text" readOnly value={chosen.length ? chosen.map((a) => a.label).join(", ") : "None"} />
                  </div>
                  <div className="form-group">
                    <label>Final Price</label>
                    <input type="text" readOnly value={total} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Confirm Booking</button>
              </form>
            </div>
          )}
        </div>

        <div className="summary-card">
          <h2>Booking Summary</h2>
          <div className="summary-row"><span>Base Package</span><span>{formatRupees(event.basePrice)}</span></div>
          <div className="summary-row"><span>Add-ons</span><span>{formatRupees(addonsTotal)}</span></div>
          <div className="summary-divider"></div>
          <div className="summary-total"><span>Total</span><strong>{formatRupees(total)}</strong></div>
          <button className="btn btn-primary btn-block" onClick={openForm}>Book This Event</button>
          <p className="summary-note">Price updates instantly as you customize your package.</p>
        </div>
      </div>
    </div>
  );
}
