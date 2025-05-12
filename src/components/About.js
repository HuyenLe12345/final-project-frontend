import React, { useState, useEffect } from "react";
import HeroSection from "../components/Home/HeroSection";
import About from "../components/Home/About";
import Coop from "../components/Home/Cooperate";
import AdminAPI from "../API/AdminAPI";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  const [logos, setLogos] = useState([]);

  // HÀM LẤY PROJECTS ĐANG KÊU GỌI
  async function fetchPartnerLogos() {
    const response = await AdminAPI.getPartnerLogos();
    if (response && response.success === true) {
      console.log(response.logos);
      setLogos(response.logos);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }

  useEffect(() => {
    fetchPartnerLogos();
    document.title = "Về chúng tôi | Donation";
  }, []);

  return (
    <div className="home">
      {/* Phần tiêu đề */}
      <HeroSection />

      {/* Phần giới thiệu tổ chức */}
      <About />

      {/* Phần đối tác */}
      <Coop
        partners={logos}
        title="Đối tác Donation"
        description="Các tổ chức gây quỹ"
      />
    </div>
  );
}

export default HomePage;
