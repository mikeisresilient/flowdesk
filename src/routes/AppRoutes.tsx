import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/dashboard/Projects";
import Tasks from "../pages/dashboard/Tasks";
import Calendar from "../pages/dashboard/Calendar";
import Notifications from "../pages/dashboard/Notifications";
import Settings from "../pages/dashboard/Settings";
import NotFound from "../pages/public/NotFound";
import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Authentication */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/projects" element={<Projects />} />
            <Route path="/dashboard/tasks" element={<Tasks />} />
            <Route path="/dashboard/calendar" element={<Calendar />} />
            <Route
              path="/dashboard/notifications"
              element={<Notifications />}
            />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
