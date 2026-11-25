// localStorage helpers. All app data lives in the browser (no backend).
export const KEYS = {
  users: "eventhub_users",
  session: "eventhub_session",
  bookings: "eventhub_bookings",
  requests: "eventhub_requests",
};

export function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export const formatRupees = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${parseInt(d, 10)} ${MONTHS[parseInt(m, 10) - 1]} ${y}`;
}

export const newBookingId = () => `EVH-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`;
export const newRequestId = () => `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 8999)}`;
