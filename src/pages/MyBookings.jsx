import DownloadConfirmation from "../components/DownloadConfirmation.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { KEYS, read, write, formatDate, formatRupees } from "../utils/storage.js";

export default function MyBookings() {
  const { user, session } = useAuth();
  const [all, setAll] = useState(() => read(KEYS.bookings, []));

  const mine = all.filter((b) => b.userEmail === session.email);
  const spend = mine.filter((b) => b.status !== "Cancelled").reduce((s, b) => s + Number(b.totalPrice), 0);

  const cancel = (id) => {
    if (!window.confirm("Cancel this booking? This can't be undone.")) return;
    const next = all.map((b) => (b.bookingId === id ? { ...b, status: "Cancelled" } : b));
    write(KEYS.bookings, next);
    setAll(next);
  };

  return (
    <>
      <PageHero title="My Bookings">Track and manage every event you've booked with EventHub.</PageHero>
      <section>
        <div className="container">
          <div className="mb-header">
            <div>
              <h2 style={{ marginBottom: 2 }}>Hi, {user ? user.name : "there"} 👋</h2>
              <p style={{ color: "var(--text-muted)", margin: 0 }}>{user?.email}</p>
            </div>
            <div className="mb-stats">
              <div className="mb-stat"><strong>{mine.length}</strong><span>Total Bookings</span></div>
              <div className="mb-stat"><strong>{formatRupees(spend)}</strong><span>Total Spend</span></div>
            </div>
          </div>

          {mine.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div className="confirm-icon">🗓️</div>
              <h3>No Bookings Yet</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>You haven't booked an event yet. Explore our packages to get started.</p>
              <Link to="/#events" className="btn btn-primary">Explore Event Packages</Link>
            </div>
          ) : (
            <div className="bookings-list">
              {mine.map((b) => (
                <div className="booking-card" key={b.bookingId}>
                  <div className="booking-card-top">
                    <div><h3>{b.eventName}</h3><span className="booking-id-tag">{b.bookingId}</span></div>
                    <span className={"status-badge status-" + b.status.toLowerCase()}>{b.status}</span>
                  </div>
                  <div className="booking-card-grid">
                    <div><span>Event Date</span><strong>{formatDate(b.eventDate)}</strong></div>
                    <div><span>Location</span><strong>{b.location}</strong></div>
                    <div><span>Guests</span><strong>{b.guests}</strong></div>
                    <div><span>Total</span><strong>{formatRupees(b.totalPrice)}</strong></div>
                  </div>
                  <div className="booking-card-addons"><span>Add-ons:</span> {b.addons?.length ? b.addons.join(", ") : "None"}</div>
                  <div className="booking-card-actions">
                    <DownloadConfirmation booking={b} />
                    {b.status === "Pending" && (
                      <button type="button" className="table-btn cancel-btn" onClick={() => cancel(b.bookingId)}>Cancel Booking</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
