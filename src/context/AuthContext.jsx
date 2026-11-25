import { validPhone, validEmail } from "../utils/validation.js";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { KEYS, read, write, remove } from "../utils/storage";

// Demo admin account (hard-coded, as this is a front-end-only project).
const ADMIN_EMAIL = "admin@eventhub.com";
const ADMIN_PASSWORD = "admin123";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // session: null | { type: "user", email } | { type: "admin" }
  const [session, setSession] = useState(() => read(KEYS.session, null));

  const user = useMemo(() => {
    if (session?.type !== "user") return null;
    return read(KEYS.users, []).find((u) => u.email === session.email) || null;
  }, [session]);

  const startSession = (s) => {
    write(KEYS.session, s);
    setSession(s);
  };

  const signup = useCallback(({ name, email, phone, password }) => {
    email = email.trim().toLowerCase();
    if (!name.trim() || !email || !phone.trim() || !password) return { ok: false, error: "Please fill in all fields." };
    if (!validEmail(email)) return { ok: false, error: "Please enter a valid email address." };
    if (!validPhone(phone.trim())) return { ok: false, error: "Please enter a valid 10-digit phone number." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    const users = read(KEYS.users, []);
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: "An account with this email already exists. Try logging in instead." };
    }
    users.push({ name: name.trim(), email, phone: phone.trim(), password, joined: new Date().toISOString() });
    write(KEYS.users, users);
    startSession({ type: "user", email });
    return { ok: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    email = email.trim().toLowerCase();
    const found = read(KEYS.users, []).find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, error: "Invalid email or password." };
    startSession({ type: "user", email });
    return { ok: true };
  }, []);

  const adminLogin = useCallback(({ email, password }) => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      startSession({ type: "admin" });
      return { ok: true };
    }
    return { ok: false, error: "Invalid admin email or password." };
  }, []);

  const logout = useCallback(() => {
    remove(KEYS.session);
    setSession(null);
  }, []);

  const value = { session, user, isUser: session?.type === "user", isAdmin: session?.type === "admin", signup, login, adminLogin, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
