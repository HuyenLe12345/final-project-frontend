import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI.jsx";
const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorEmailDetail, setErrorEmailDetail] = useState(""); // nội dung lỗi email nếu có
  const [errorUsernameDetail, setErrorUsernameDetail] = useState(""); //nội dung lỗi username nếu có
  const [errorPasswordDetail, setErrorPasswordDetail] = useState(""); // nội dung lỗi password
  const [errorConfirmPasswordDetail, setErrorConfirmPasswordDetail] =
    useState("");

  const [message, setMessage] = useState("");
  console.log("message");
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setErrorUsername(false);
    setErrorUsernameDetail("");
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail(false);
    setErrorEmailDetail("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setErrorPassword(false);
    setErrorPasswordDetail("");
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setErrorConfirmPassword(false);
    setErrorConfirmPasswordDetail("");
  };
  console.log("chuan bi submit");
  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = new FormData(e.target);
    const response = await UserAPI.postSignUp(data);
    console.log("This is response", response);

    if (response && response.status === 400) {
      const err = response.errors;
      setErrorEmail(false);
      setErrorUsername(false);
      setErrorPassword(false);
      setErrorConfirmPassword(false);
      setErrorEmailDetail("");
      setErrorUsernameDetail("");
      setErrorPasswordDetail("");
      setErrorConfirmPasswordDetail("");

      for (let i = 0; i < err.length; i++) {
        if (err[i].path === "email") {
          setErrorEmail(true);
          setErrorEmailDetail(err[i].msg);
        }
        if (err[i].path === "username") {
          setErrorUsername(true);
          setErrorUsernameDetail(err[i].msg);
        }
        if (err[i].path === "password") {
          setErrorPassword(true);
          setErrorPasswordDetail(err[i].msg);
        }
        if (err[i].path === "confirm") {
          setErrorConfirmPassword(true);
          setErrorConfirmPasswordDetail(err[i].msg);
        }
      }
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      // Chuyển hướng đến trang lỗi
      navigate("/error-page", {
        state: { status: response.status, message: response.errors },
      });
    } else {
      console.log("here");
      setMessage(response.message);
    }
  };
  useEffect(() => {
    document.title = "Đăng ký | Donation";
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form method="POST" onSubmit={submitHandler}>
          <h3>Đăng ký</h3>
          {message && <div className="alert alert-success">{message}</div>}
          <div className="mb-3">
            <label>
              Tên sử dụng <sup className="text-danger">*</sup>
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Nhập tên người dùng (username)"
              value={username}
              onChange={onChangeUsername}
              required
            />
            {errorUsername && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errorUsernameDetail}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label>
              Email <sup className="text-danger">*</sup>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Nhập email"
              value={email}
              onChange={onChangeEmail}
              required
            />
            {errorEmail && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errorEmailDetail}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label>
              Mật khẩu <sup className="text-danger">*</sup>
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={onChangePassword}
              value={password}
              placeholder="Nhập mật khẩu"
              required
            />
            {errorPassword && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errorPasswordDetail}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label>
              Xác nhận lại mật khẩu <sup className="text-danger">*</sup>
            </label>
            <input
              type="password"
              name="confirm"
              className="form-control"
              onChange={onChangeConfirmPassword}
              value={confirmPassword}
              placeholder="Nhập lại mật khẩu"
              required
            />
            {errorConfirmPassword && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errorConfirmPasswordDetail}
              </p>
            )}
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Đăng ký
            </button>
          </div>
          <p className="forgot-password text-right">
            Bạn đã có tài khoản?<a href="/sign-in">Hãy đăng nhập!</a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
