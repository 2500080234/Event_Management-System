import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="confirm-wrap">
      <div className="confirm-icon">🧭</div>
      <h1>Page Not Found</h1>
      <p style={{ color: "var(--text-muted)" }}>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 20 }}>Back to Home</Link>
    </div>
  );
}
