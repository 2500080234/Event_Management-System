import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import CustomRequest from "./pages/CustomRequest.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/events/:key" element={<EventDetails />} />
        <Route path="/booking/confirmation/:id" element={<Confirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/custom-request" element={<CustomRequest />} />

        {/* User module */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute role="user" redirectTo="/login">
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Admin module */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin" redirectTo="/admin/login">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
