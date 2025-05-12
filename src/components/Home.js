import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/Home/HeroSection";
import ProjectList from "../components/Home/ProjectList";
import Stats from "../components/Home/Stats";
import PostList from "../components/Home/PostList";
import About from "../components/Home/About";
import Coop from "../components/Home/Cooperate";
import ProjectAPI from "../API/ProjectAPI";
import PostAPI from "../API/PostAPI";
import AdminAPI from "../API/AdminAPI";
const partners = [
  {
    organizationName: "VNPay",
    avatar: "images/vnpay.jpg",
  },
];
function HomePage() {
  const navigate = useNavigate();
  const [activeProjects, setActiveProjects] = useState([]);
  const [stats, setStats] = useState([]);
  const [posts, setPosts] = useState([]);
  // HÀM LẤY PROJECTS ĐANG KÊU GỌI
  async function fetchProjects() {
    const response = await ProjectAPI.getActiveProjects();
    if (response && response.success === true) {
      console.log(response.projects);
      setActiveProjects(response.projects);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }
  // HÀM LẤY CÁC SỐ LIỆU CỦA TỔ CHỨC
  async function fetchStats() {
    const response = await AdminAPI.getTotalStats();
    if (response && response.success === true) {
      return setStats(response.stats);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }
  // HÀM LẤY CÁC BÀI VIẾT
  async function fetchPosts() {
    const response = await PostAPI.getAllPosts();
    if (response && response.success === true) {
      return setPosts(response.posts);
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
    fetchProjects();
    fetchStats();
    fetchPosts();
    document.title = "Trang chủ | Donation";
  }, []);

  return (
    <div className="home" style={{ paddingBottom: "30px" }}>
      {/* Phần tiêu đề */}
      <HeroSection />

      {/* Phần dự án nổi bật */}
      <ProjectList projects={activeProjects} />

      {/* Phần bài viết mới nhất */}
      <PostList posts={posts} />

      {/* Phần số liệu thống kê */}
      <Stats stats={stats} />

      {/* Phần giới thiệu tổ chức */}
      <About />

      {/* Phần đối tác */}
      <Coop partners={partners} title="Đơn vị đồng hành" />
    </div>
  );
}

export default HomePage;
