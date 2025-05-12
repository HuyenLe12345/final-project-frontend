import { useState, useEffect } from "react";
import UserAPI from "../API/UserAPI.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/user.jsx";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, idUser } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmailDetail, setErrorEmailDetail] = useState(""); // nội dung lỗi email nếu có
  const [errorPasswordDetail, setErrorPasswordDetail] = useState(""); // nội dung lỗi password
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
  useEffect(() => {
    // Redirect after role and idUser are available
    if (role && idUser) {
      let destination = "/personal-page"; // Default destination

      if (role === "admin 1" || role === "admin 2") {
        destination = "/admin/dashboard";
      }
      if (role === "partner") {
        destination = "/partner/personal-page";
      }

      navigate(destination, { state: { personalPageId: idUser } }); // Perform the navigation
    }
  }, [role, idUser, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const rememberMe = data.get("remember") === "on"; // Get remember me value
    data.append("rememberMe", rememberMe); //Append the rememberMe to the request, so the back-end could see it.

    const response = await UserAPI.postSignIn(data); // MỚI THÊM
    console.log("This is response", response);

    if (response && response.success === false) {
      const err = response.errors;
      setErrorEmail(false);
      setErrorPassword(false);
      setErrorEmailDetail("");
      setErrorPasswordDetail("");

      if (err.path === "email") {
        setErrorEmail(true);
        setErrorEmailDetail(err.msg);
      }
      if (err.path === "password") {
        setErrorPassword(true);
        setErrorPasswordDetail(err.msg);
      }
    } else if (response && response.success === true) {
      const { user, accessToken, refreshToken } = response;
      console.log("ressponse", user);
      // Store tokens based on "Remember Me" selection
      if (rememberMe) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
      }

      dispatch(
        login({
          idUser: user._id,
          username: user.username || user.organizationName,
          role: user.role,
          avatar: user.avatar || null,
          background: user.background || null,
        })
      );
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      // Chuyển hướng đến trang lỗi
      navigate("/error-page", {
        state: { status: response.status, message: response.errors },
      });
    }
  };
  useEffect(() => {
    document.title = "Đăng nhập | Donation";
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form method="POST" onSubmit={submitHandler}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>
              Email <sup className="text-danger">*</sup>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={onChangeEmail}
              placeholder="Enter email"
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
              value={password}
              onChange={onChangePassword}
              placeholder="Enter password"
              required
            />
            {errorPassword && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errorPasswordDetail}
              </p>
            )}
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input me-1"
                id="customCheck1"
                name="remember"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Ghi nhớ
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Đăng nhập
            </button>
          </div>
          <p className="forgot-password text-right">
            Quên <Link to="/forgot-password">mật khẩu?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
