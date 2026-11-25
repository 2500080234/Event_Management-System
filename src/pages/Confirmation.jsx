import DownloadConfirmation from "../components/DownloadConfirmation.jsx";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { KEYS, read, formatDate, formatRupees } from "../utils/storage.js";

export default function Confirmation() {
  const { id } = useParams();
  const { isUser } = useAuth();
  const b = read(KEYS.bookings, []).find((x) => x.bookingId === id);

  if (!b) {
    return (
      <div className="confirm-wrap">
        <div className="confirm-icon">📭</div>
        <h1>No Booking Found</h1>
        <p style={{ color: "var(--text-muted)" }}>We couldn't find that booking. Please choose an event package and complete the booking form first.</p>
        <Link to="/#events" className="btn btn-primary" style={{ marginTop: 20 }}>Explore Event Packages</Link>
      </div>
    );
  }

  const rows = [
    ["Event", b.eventName],
    ["Booking Status", b.status || "Pending"],
    ["Event Date", formatDate(b.eventDate)],
    ["Location", b.location],
    ["Number of Guests", b.guests],
    ["Add-ons", b.addons?.length ? b.addons.join(", ") : "None selected"],
    ["Phone", b.phone],
    ["Email", b.email],
  ];

  return (
    <div className="confirm-wrap">
      <div className="confirm-icon">🎉</div>
      <h1>Booking Request Confirmed!</h1>
      <p style={{ color: "var(--text-muted)" }}>Thank you, <strong>{b.customerName}</strong>! Your event booking request has been received.</p>
      <div className="booking-id-box">Booking ID: <span>{b.bookingId}</span></div>

      <div className="confirm-card">
        {rows.map(([label, val]) => (
          <div className="confirm-row" key={label}><span>{label}</span><span>{val}</span></div>
        ))}
        <div className="confirm-row confirm-total"><span>Total Amount</span><span>{formatRupees(b.totalPrice)}</span></div>
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>A member of our team will reach out shortly to confirm the final details of your event.</p>
      <div className="confirm-actions">
        <DownloadConfirmation booking={b} />
        <Link to="/" className="btn btn-primary">Back to Home</Link>
        {isUser && <Link to="/my-bookings" className="btn btn-secondary">View Booking History</Link>}
      </div>
    </div>
  );
}
