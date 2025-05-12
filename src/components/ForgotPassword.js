// ForgotPassword.js
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await UserAPI.postForgotPassword({ email }); // Create this function in UserAPI
      setMessage(response.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );

      console.error(err);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Quên mật khẩu</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Gửi yêu cầu
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/sign-in">Back to Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
