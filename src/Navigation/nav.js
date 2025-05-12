import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./nav.css";
import { useEffect } from "react";
import UserAPI from "../API/UserAPI.jsx";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/user.jsx";
import logo from "../images/Screen Shot 2025-02-18 at 4.29.41 PM.png";
import UserIcon from "../Shared/UserIcon.js";

const Nav = () => {
  const { idUser, username, avatar, role } = useSelector((state) => state.user);
  console.log(username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Sau khi F5 nó sẽ kiểm tra nếu phiên làm việc của Session vẫn còn thì nó sẽ tiếp tục
  // đưa dữ liệu vào Redux
  useEffect(() => {
    // Check for access token first
    const accessToken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");

    if (accessToken) {
      console.log("accessToken");
      // Only fetch user details if access token exists
      async function fetchUser() {
        const query = "?type=images";
        const response = await UserAPI.getPersonalInfo(query);
        console.log(response);
        if (response && response.success === true) {
          const user = response.data;
          console.log("user", user);
          dispatch(
            login({
              idUser: user._id,
              username: user.username || user.organizationName,
              role: user.role,
              avatar: user.avatar,
              background: user.background,
            })
          );
        } else if (
          response &&
          (response.status === 500 || response.status === 404)
        ) {
          navigate("/error-page", {
            state: { status: response.status, errors: response.errors },
          });
        }
      }
      fetchUser();
    } else {
      // If idUser is missing, something is wrong, clear tokens and force a logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
    }
  }, [dispatch]);
  const logoutHandler = async () => {
    const refreshToken =
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("refreshToken");

    // 2. Make an API call to your backend's logout endpoint
    try {
      await UserAPI.postLogout({ token: refreshToken }); // Pass the refresh token in the request body

      // 3. Remove tokens from localStorage and sessionStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error (e.g., display an error message)
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white fixed-top">
      <div className="container">
        {/* LOGO  */}
        <div className="logo">
          <Link className="navbar-brand navbar-logo" to="/home">
            <img src={logo} alt="icon" width="50" height="35" />
            Donation
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MAIN NAVIGATION */}
        <div
          className="collapse navbar-collapse main-navigation justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item px-2">
              <NavLink className="nav-link" to="/home">
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink className="nav-link" to="/projects">
                Dự án
              </NavLink>
            </li>

            <li className="nav-item px-2">
              <NavLink className="nav-link" to="/posts">
                Bài viết
              </NavLink>
            </li>

            <li className="nav-item px-2">
              <NavLink className="nav-link" to="/about">
                Về chúng tôi
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav align-items-lg-center  gap-3">
            {username && (
              <li className="nav-item ">
                <Link
                  to={`${
                    role === "client"
                      ? "/personal-page"
                      : role === "admin 1" || role === "admin 2"
                      ? "/admin/dashboard"
                      : "/partner/personal-page"
                  }`}
                  state={{ personalPageId: idUser }}
                  className="d-flex align-items-center gap-2 text-black"
                  style={{ textDecoration: "none" }}
                >
                  <UserIcon avatar={avatar} username={username} href="#" />
                  <div>{username}</div>
                </Link>
              </li>
            )}

            {username ? (
              <li className="nav-item" onClick={logoutHandler}>
                <NavLink className="nav-link" to="/">
                  Đăng xuất
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item ms-6">
                  <NavLink className="nav-link" to="/sign-in">
                    Đăng nhập
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                    to="/sign-up"
                  >
                    Đăng ký
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
