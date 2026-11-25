import { useState } from "react";
import { downloadBookingPdf } from "../utils/bookingPdf.js";

export default function DownloadConfirmation({ booking }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);
    setError("");
    try {
      await downloadBookingPdf(booking);
    } catch {
      setError("The PDF could not be generated. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={download} disabled={busy}>
        {busy ? "Preparing PDF…" : "Download Confirmation (PDF)"}
      </button>
      {error && <p role="alert" className="form-error show">{error}</p>}
    </div>
  );
}
