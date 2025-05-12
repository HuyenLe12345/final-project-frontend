// ResetPassword.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally, you can validate the token here by sending a request to the backend
    // to check if the token is valid and not expired.  If not valid, redirect to an error page.
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Mật khẩu phải chứa ít nhất 8 ký tự và/hoặc số.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      const response = await UserAPI.postResetPassword(token, { password }); //Create postResetPassword in API
      if (response && response.success === true) {
        console.log("status 200");
        setMessage(response.message);
        // Redirect the user to the sign-in page
        navigate("/sign-in");
      } else if (response && response.status === 400) {
        console.log("400");
        console.log(response);
        setError(response.errors);
      } else if (response && response.status === 500) {
        navigate("/error-page", {
          state: { status: response.status, errors: response.errors },
        });
      }
    } catch (err) {
      setError(err.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };
  useEffect(() => {
    document.title = "Thiết lập mật khẩu | Donation";
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Đặt lại mật khẩu</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          <div className="mb-3">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Xác nhận mật khẩu</label>
            <input
              name="confirm"
              type="password"
              className="form-control"
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Đặt lại mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
