import React, { useState } from "react";
import "./HeroSection.css"; // CSS styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import image1 from "../../images/volunteer.jpg";
import image2 from "../../images/hands-feat.jpg";
import image3 from "../../images/flood.jpg";
function HeroSection() {
  // Hàm tải các hình ảnh
  const images = [
    {
      link: image1,
      content: "Kết nối với các quỹ tổ chức đã được nhà nước phép",
    },
    {
      link: image2,
      content: "Các thông tin quyên góp được công khai minh bạch",
    },
    {
      link: image3,
      content: "Mang lại giá trị thiện nguyện cho xã hội. ",
    },
  ];
  // State để theo dõi hình ảnh hiện tại
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hàm để chuyển đến hình ảnh trước đó
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Hàm để chuyển đến hình ảnh tiếp theo
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="hero-section position-relative overflow-hidden">
      {/* Hình nền */}
      <img
        src={images[currentImageIndex].link}
        alt="Hero Background"
        className="hero-image"
      />

      {/* Nội dung */}
      <div className="hero-content text-white text-start container">
        {/* Tiêu đề */}
        <h1 className="hero-title">
          Nền tảng quyên góp trực tuyến đáng tin cậy
        </h1>
        <h2>
          <q>{images[currentImageIndex].content}</q>
        </h2>

        {/* Mô tả */}
        {/* <p className="hero-description"></p> */}

        {/* Nút Donate */}
        <div className="hero-buttons mt-5">
          <Link className="btn btn-success me-2" to="/projects">
            <strong>ỦNG HỘ </strong>
            <FontAwesomeIcon icon={faHeart} />
          </Link>

          {/* Nút Learn More */}
          <Link className="btn btn-light" to="/about">
            Tìm hiểu thêm →
          </Link>
        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="hero-navigation">
        <button className="nav-button" onClick={goToPrevious}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="nav-button" onClick={goToNext}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
