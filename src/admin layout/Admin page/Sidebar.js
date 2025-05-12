import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Dropdown from "../../Navigation/Dropdown";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";
import {
  faUser,
  faHeart,
  faPenToSquare,
  faHouse,
  faAddressBook,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
function Sidebar() {
  const location = useLocation();
  const path =
    location.pathname === "/admin/create-account/admin" ||
    location.pathname === "/admin/create-account/partner";
  console.log(location, path);
  const { idUser, role } = useSelector((state) => state.user);
  const basePath =
    role === "client"
      ? ""
      : role === "admin 1" || role === "admin 2"
      ? "/admin"
      : "/partner";
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`sidebar rounded text-start position-fixed ${
        isExpanded ? "expanded bg-success text-white" : "text-white"
      }`}
    >
      <ul className="nav flex-column">
        {(role === "admin 1" || role === "admin 2") && (
          <li className="nav-item ">
            <NavLink className="nav-link " to={`/admin/dashboard`}>
              <FontAwesomeIcon icon={faHouse} className="me-2" />
              <span>Dashboard</span>
            </NavLink>
          </li>
        )}
        {(role === "partner" || role === "client") && (
          <li className="nav-item ">
            <NavLink
              className={`nav-link `}
              to={`${basePath}/personal-page`}
              state={{ personalPageId: idUser }}
            >
              <FontAwesomeIcon icon={faHouse} className="me-2" />
              <span>Trang cá nhân</span>
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink className="nav-link" to={`${basePath}/profile`}>
            <FontAwesomeIcon icon={faUser} className="me-2" />
            <span>Thông tin cá nhân</span>
          </NavLink>
        </li>
        {(role === "client" || role === "partner") && (
          <li className="nav-item">
            <NavLink className="nav-link " to={`${basePath}/create-post`}>
              <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
              <span>Đăng bài</span>
            </NavLink>
          </li>
        )}
        {(role === "admin 1" || role === "admin 2") && (
          <>
            <li className="nav-item ">
              <NavLink
                className="nav-link "
                to={`${basePath}/user-management/client`}
              >
                <FontAwesomeIcon icon={faHouse} className="me-2" />
                <span>Quản lý người dùng</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                className="nav-link"
                to={`${basePath}/user-management/senior`}
              >
                <FontAwesomeIcon icon={faAddressBook} className="me-2" />
                <span>Quản lý cấp cao</span>
              </NavLink>
            </li>
          </>
        )}
        {role === "partner" && (
          <>
            <li className="nav-item">
              <NavLink
                className="nav-link "
                to={`${basePath}/project-form`}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faKeyboard} className="me-2" />
                <span>Viết dự án</span>
              </NavLink>
            </li>
          </>
        )}
        {(role === "partner" || role === "admin 1" || role === "admin 2") && (
          <li className="nav-item">
            <NavLink
              className="nav-link "
              to={`${basePath}/donation-management`}
            >
              <FontAwesomeIcon icon={faHeart} className="me-2" />
              <span>Quản lý quyên góp</span>
            </NavLink>
          </li>
        )}
        {(role === "admin 1" || role === "admin 2") && (
          <li className={`nav-item  ${path ? "active text-success" : ""}`}>
            <Dropdown role={role} className="nav-link" />
          </li>
        )}
      </ul>
      <button
        className="sidebar-toggle-button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "<" : ">"}
      </button>
    </div>
  );
}

export default Sidebar;
