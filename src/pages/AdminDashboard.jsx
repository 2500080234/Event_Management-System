import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { localToday } from "../utils/validation.js";
import PageHero from "../components/PageHero.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { KEYS, read, write, formatDate, formatRupees } from "../utils/storage.js";

const reqStatusClass = (s) => "status-" + (s === "New" ? "pending" : s === "Reviewed" ? "confirmed" : "cancelled");

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(() => read(KEYS.bookings, []));
  const [requests, setRequests] = useState(() => read(KEYS.requests, []));
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("all");
  const usersCount = read(KEYS.users, []).length;

  const saveBookings = (next) => { write(KEYS.bookings, next); setBookings(next); };
  const saveRequests = (next) => { write(KEYS.requests, next); setRequests(next); };

  const setBookingStatus = (id, s) => saveBookings(bookings.map((b) => (b.bookingId === id ? { ...b, status: s } : b)));
  const deleteBooking = (id) => {
    if (window.confirm("Delete this booking permanently? This can't be undone.")) saveBookings(bookings.filter((b) => b.bookingId !== id));
  };
  const setRequestStatus = (id, s) => saveRequests(requests.map((r) => (r.requestId === id ? { ...r, status: s } : r)));
  const deleteRequest = (id) => {
    if (window.confirm("Delete this request permanently? This can't be undone.")) saveRequests(requests.filter((r) => r.requestId !== id));
  };

  const t = term.toLowerCase().trim();
  const filtered = bookings.filter((b) => {
    const matchTerm = !t || [b.customerName, b.bookingId, b.eventName, b.email].some((v) => (v || "").toLowerCase().includes(t));
    return matchTerm && (status === "all" || b.status === status);
  });

  const today = localToday();
  const confirmed = bookings.filter((b) => b.status === "Confirmed");
  const confirmedValue = confirmed.reduce((sum, booking) => sum + (Number(booking.totalPrice) || 0), 0);
  const stats = [
    ["📦", bookings.length, "Total Bookings"],
    ["₹", formatRupees(confirmedValue), "Confirmed Booking Value"],
    ["⏳", bookings.filter((b) => b.status === "Pending").length, "Pending"],
    ["✓", confirmed.length, "Confirmed"],
    ["✕", bookings.filter((b) => b.status === "Cancelled").length, "Cancelled"],
    ["🗓", confirmed.filter((b) => b.eventDate >= today).length, "Upcoming Confirmed"],
    ["👥", usersCount, "Registered Users"],
    ["📋", requests.length, "Total Custom Requests"],
    ["💬", requests.filter((r) => r.status === "New").length, "New Custom Requests"],
  ];

  return (
    <>
      <PageHero title="Admin Dashboard">Manage every booking made across EventHub.</PageHero>
      <section>
        <div className="container">
          <div className="admin-stats-grid">
            {stats.map(([icon, val, label]) => (
              <div className="admin-stat-card" key={label}>
                <span className="icon-box">{icon}</span>
                <strong>{val}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="admin-table-wrap">
            <div className="admin-table-toolbar">
              <input type="text" aria-label="Search bookings" placeholder="Search by name, booking ID, or event..." value={term} onChange={(e) => setTerm(e.target.value)} />
              <select aria-label="Booking status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button type="button" className="btn btn-secondary" onClick={() => { logout(); navigate("/"); }}>Logout</button>
            </div>
            <div className="admin-table-scroll table-responsive" tabIndex={0} role="region" aria-label="Scrollable records">
              <table className="admin-table">
                <thead>
                  <tr><th>Booking ID</th><th>Customer</th><th>Event</th><th>Date</th><th>Total</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.bookingId}>
                      <td className="table-mono">{b.bookingId}</td>
                      <td>{b.customerName}<br /><span className="table-sub">{b.email}</span></td>
                      <td>{b.eventName}</td>
                      <td>{formatDate(b.eventDate)}</td>
                      <td>{formatRupees(b.totalPrice)}</td>
                      <td><span className={"status-badge status-" + b.status.toLowerCase()}>{b.status}</span></td>
                      <td className="admin-actions">
                        {b.status !== "Confirmed" && <button type="button" className="table-btn confirm-btn" onClick={() => setBookingStatus(b.bookingId, "Confirmed")}>Confirm</button>}
                        {b.status !== "Cancelled" && <button type="button" className="table-btn cancel-btn" onClick={() => setBookingStatus(b.bookingId, "Cancelled")}>Cancel</button>}
                        <button type="button" className="table-btn delete-btn" onClick={() => deleteBooking(b.bookingId)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
                  {bookings.length ? "No bookings match your search." : "No bookings yet."}
                </div>
              )}
            </div>
          </div>

          <div className="admin-section-heading">
            <h2>Custom Event Requests</h2>
            <p>Free-form requests from visitors describing an event that isn't one of the fixed packages.</p>
          </div>
          <div className="admin-table-wrap">
            <div className="admin-table-scroll table-responsive" tabIndex={0} role="region" aria-label="Scrollable records">
              <table className="admin-table">
                <thead>
                  <tr><th>Request ID</th><th>Customer</th><th>Event Title</th><th>Description</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {requests.map((r) => {
                    const meta = [
                      r.preferredDate && "Preferred date: " + formatDate(r.preferredDate),
                      r.guests && r.guests + " guests",
                      r.budget && "Budget: " + r.budget,
                    ].filter(Boolean);
                    return (
                      <tr key={r.requestId}>
                        <td className="table-mono">{r.requestId}</td>
                        <td>{r.customerName}<br /><span className="table-sub">{r.email} · {r.phone}</span></td>
                        <td>{r.title}</td>
                        <td className="request-desc-cell">{r.description}{meta.length > 0 && <><br /><span className="table-sub">{meta.join(" · ")}</span></>}</td>
                        <td><span className={"status-badge " + reqStatusClass(r.status)}>{r.status}</span></td>
                        <td className="admin-actions">
                          {r.status !== "Reviewed" && <button type="button" className="table-btn confirm-btn" onClick={() => setRequestStatus(r.requestId, "Reviewed")}>Mark Reviewed</button>}
                          {r.status !== "Dismissed" && <button type="button" className="table-btn cancel-btn" onClick={() => setRequestStatus(r.requestId, "Dismissed")}>Dismiss</button>}
                          <button type="button" className="table-btn delete-btn" onClick={() => deleteRequest(r.requestId)}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {requests.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>No custom event requests yet.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
