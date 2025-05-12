import React from "react";
import "./Footer.css"; // Tạo file CSS riêng để style
import { Link } from "react-router-dom";
import logo from "../../images/Screen Shot 2025-02-18 at 4.29.41 PM.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faEnvelope,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
function Footer() {
  return (
    <footer className="footer bg-white text-success">
      <div className="container py-4">
        <div className="row gap-4 justify-content-center">
          {/* Logo và mô tả */}
          <div className="col-md-4 mt-3  ps-5">
            <div className="text-dark row align-items-center ">
              <img src={logo} alt="Donation" width="50" className="col-sm-3" />
              <span
                className="navbar-logo col-sm-5 "
                style={{ fontSize: "25px" }}
              >
                Donation
              </span>
            </div>
            <p className="mt-4 text-start">
              Nền tảng gây quỹ cộng đồng trực tuyến tiện lợi, tin cậy và minh
              bạch.
            </p>
            <div className="social-media row justify-content-center">
              <Link className="social text-success">
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
              <Link className="social text-success">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link className="social text-success">
                <FontAwesomeIcon icon={faYoutube} />
              </Link>
            </div>
          </div>

          {/* Điều hướng */}
          <div className="col-md-3 mt-4 text-start ps-5">
            <h4>Tổ chức</h4>
            <ul className="list-unstyled text-start mt-4">
              <li>
                <a href="/about" className="text-success">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="/terms" className="text-success">
                  Điều khoản và điều kiện
                </a>
              </li>
              <li>
                <a href="/news" className="text-success">
                  Tin tức
                </a>
              </li>
              <li>
                <a href="/report" className="text-success">
                  Báo cáo
                </a>
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div className="col-md-4 mt-4 text-start  ps-5">
            <h4>Liên hệ</h4>
            <ul className="list-unstyled mt-4">
              <li>
                <FontAwesomeIcon icon={faPhoneVolume} className="pe-2" />
                Hotline:0903547617
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="pe-2" />
                Email: ltthuyen29697@gmai
              </li>
              <li>
                <div style={{ display: "inline-block", verticalAlign: "top" }}>
                  <FontAwesomeIcon icon={faLocationDot} className="pe-2" />
                </div>
                <div style={{ display: "inline-block", width: "300px" }}>
                  Địa chỉ: 05 Yên Thế, phường Hoà An, Cẩm Lệ, Đà Nẵng.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          © Donation.vn - All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
