import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Dropdown = React.memo((props) => {
  const location = useLocation();
  const path =
    location.pathname === "/admin/create-account/admin" ||
    location.pathname === "/admin/create-account/partner";
  return (
    <>
      <button
        className={`btn dropdown-toggle ${props.className}`}
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style={{ color: `${path ? "rgb(12, 69, 12)" : "White"}` }}
      >
        <FontAwesomeIcon icon={faPlus} className="me-2" />
        <span> Tạo tài khoản</span>
      </button>
      <div
        className="dropdown-menu ms-2"
        id="dropdown"
        aria-labelledby="dropdownMenuButton"
        style={{
          backgroundColor: "transparent",
          zIndex: "2000",
        }}
      >
        {props.role === "admin 1" && (
          <Link
            className="dropdown-item"
            to="/admin/create-account/admin"
            onClick={() => props.handleTitle("Tạo tài khoản | Donaiton")}
          >
            <span>Admin</span>
          </Link>
        )}
        <Link
          className="dropdown-item"
          to="/admin/create-account/partner"
          onClick={() => props.handleTitle("Tạo tài khoản | Donaiton")}
        >
          <span>Đối tác</span>
        </Link>
      </div>
    </>
  );
});

export default Dropdown;
