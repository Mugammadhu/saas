/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import Notification from "./Notification";

const apiUrl = import.meta.env.VITE_API_URL;

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isLogin ? "login" : "register";
    try {
      const { data } = await axios.post(`${apiUrl}/api/${endpoint}`, { email, password });
      if (rememberMe) localStorage.setItem("token", data.token);
      onLogin(data.token);
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } catch (err) {
      showNotification(err.response?.data?.error || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      showNotification("Enter your Registered Email", "error");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/forgot-password`, { email });
      setOtpSent(true);
      showNotification("OTP sent to your email", "success");
    } catch (err) {
      showNotification("Error sending OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/verify-otp`, { email, otp });
      setOtpVerified(true);
      showNotification("OTP verified successfully", "success");
    } catch (err) {
      showNotification("Invalid OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      showNotification("Passwords don't match", "error");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/reset-password`, { email, newPassword });
      showNotification("Password reset successful", "success");
      setOtpSent(false);
      setOtpVerified(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      showNotification("Error resetting password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outer_container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="auth-container">
        <div className="top-right-toggle">
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </div>

        <h1>TenantHub</h1>
        <p className="subtitle">SaaS Tenant Management Platform</p>

        {!otpSent && !otpVerified && (
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Your Email"
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter Your Password"
            />

            <div className="checkbox-row">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <span className="forgot" onClick={handleForgotPassword}>
                Forgot password?
              </span>
            </div>

            <div className="actions-row">
              <button type="submit" disabled={loading}>
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
        )}

        {otpSent && !otpVerified && (
          <div className="otp">
            <div>
              <label>Enter OTP sent to email</label>
              <input
                value={otp}
                className="otp-inp"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Your OTP"
              />
              <div className="otp-actions">
                <button onClick={handleVerifyOtp} className="otp-btn" disabled={loading}>
                  Verify OTP
                </button>
                <button
                  className="back-btn"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                  disabled={loading}
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
        )}

        {otpVerified && (
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
            />

            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
            />
            <div className="reset-actions">
              <button onClick={handleResetPassword} className="reset-btn" disabled={loading}>
                Reset Password
              </button>
              <button
                className="back-btn"
                onClick={() => {
                  setOtpVerified(false);
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                disabled={loading}
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-bar">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
