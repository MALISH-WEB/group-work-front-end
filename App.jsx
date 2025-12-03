import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SubmitProject from "./pages/SubmitProject";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectDetails from "./pages/ProjectDetails";
import Approvals from "./pages/Approvals";
import AdminAnalytics from "./pages/AdminAnalytics";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/AdminUsers";
import Notifications from "./pages/Notifications";
import Footer from "./components/Footer";

export default function App() {
  console.log("ENV TEST =>", import.meta.env);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />

        <Route 
          path="/submit" 
          element={
            <ProtectedRoute allowRoles={["student", "staff", "admin"]}>
              <SubmitProject />
            </ProtectedRoute>
          } 
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route 
          path="/approvals" 
          element={
            <ProtectedRoute allowRoles={["admin", "staff"]}>
              <Approvals />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/analytics" 
          element={
            <ProtectedRoute allowRoles={["admin"]}>
              <AdminAnalytics />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <ProtectedRoute allowRoles={["admin", "staff", "student"]}>
              <Profile />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute allowRoles={["admin", "staff", "student"]}>
              <Notifications />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </>
  );
}
