import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    console.log("[DEBUG] Login attempt started for user:", username.trim());
    setError("");
    setBusy(true);
    try {
      console.log("[DEBUG] Calling login API...");
      const result = await login(username.trim(), password);
      console.log("[DEBUG] Login successful, result:", result);
      console.log("[DEBUG] Navigating to dashboard...");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("[DEBUG] Login error:", err);
      setError(err?.message || "Login failed");
    } finally {
      console.log("[DEBUG] Login attempt finished, setting busy=false");
      setBusy(false);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Header with Logo */}
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="6" fill="url(#logo-gradient)" />
                <defs>
                  <linearGradient id="logo-gradient" x1="0" y1="0" x2="24" y2="24">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="login-title">Sale Order System</h1>
          </div>
          <p className="login-credit">Designed & Developed by Rajesh Jadoun</p>
          <p className="login-subtitle">Please login to continue</p>
        </div>

        {/* Alert Banner - Only show on error */}
        {error && <div className="login-alert">{error}</div>}

        {/* Login Form */}
        <form onSubmit={onSubmit} className="login-form">
          <div className="login-field">
            <label>
              <span className="field-icon">👤</span>
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="login-field">
            <label>
              <span className="field-icon">🔒</span>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-btn" disabled={busy}>
            <span className="btn-sparkle">✨</span>
            {busy ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
