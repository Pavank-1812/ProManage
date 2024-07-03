import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from "./Pages/HomePage/HomePage";
import AnalyticsPage from "./Pages/AnalyticsPage/AnalyticsPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import ShareTaskPage from "./Pages/ShareTaskPage/ShareTaskPage";
import "./App.css";

function App() {
  const ProtectedRoute = () => {
    const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/taskDetails/:taskId" element={<ShareTaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
