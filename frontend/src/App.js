import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import Sidebar from "./components/dashboard/sidebar";
import FAQ from "./components/dashboard/FAQ";
import MyCourses from "./components/dashboard/course";
import Profile from "./components/dashboard/profile";
import MyProgress from "./components/dashboard/progress";
import Achievements from "./components/dashboard/achievements";
import Dashboard from "./components/dashboard/dashboard";
import { UserStatsProvider } from "./context/UserStatsContext";

// Layout component for protected routes
const ProtectedLayout = ({ children }) => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar />
    <main style={{ flex: 1, marginLeft: "250px", padding: "20px", backgroundColor: "#C0C0C0" }}>
      {children}
    </main>
  </div>
);

function App() {
  return (
    <UserStatsProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            }
          />
          <Route
            path="/FAQ"
            element={
              <ProtectedLayout>
                <FAQ />
              </ProtectedLayout>
            }
          />
          <Route
            path="/course"
            element={
              <ProtectedLayout>
                <MyCourses />
              </ProtectedLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedLayout>
                <Profile />
              </ProtectedLayout>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedLayout>
                <MyProgress />
              </ProtectedLayout>
            }
          />
          <Route
            path="/achievements"
            element={
              <ProtectedLayout>
                <Achievements />
              </ProtectedLayout>
            }
          />
        </Routes>
      </Router>
    </UserStatsProvider>
  );
}

export default App;
