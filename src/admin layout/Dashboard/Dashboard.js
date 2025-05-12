import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import StatisticCard from "./components/StatisticCard";
import RecentProjects from "./components/RecentProjects";
import Supports from "./components/Supports";
import AdminAPI from "../../API/AdminAPI";
import queryString from "query-string";
import Pagination from "../Manage Users/Pagination";
import {
  faHouse,
  faPenToSquare,
  faUsers,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";

import "./dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const [totalInfo, setTotalInfo] = useState(null);
  const [allDonations, setAllDonations] = useState([]);
  const { role } = useSelector((state) => state.user);
  const [data, setData] = useState([]); // Initialize data as an empty array

  // Fetch donations based on month and year
  const fetchDonationsByMonth = async () => {
    // Combine month and year for API request
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const date = year + "-" + `${month + 1 > 9 ? month + 1 : `0${month + 1}`}`;
    const params = { date: date };
    const query = queryString.stringify(params);
    const newQuery = `?${query}`;
    console.log(newQuery);
    const response = await AdminAPI.getDonationByDate(newQuery);
    if (response && response.success === true) {
      setData(response.donation);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  };

  // hàm lấy thông tin tổng quát
  async function fetchTotalInfo() {
    const response = await AdminAPI.getTotalInfo();
    if (response && response.success === true) {
      console.log(response.totalInfo);
      setTotalInfo(response.totalInfo);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }
  async function fetchTenDonations() {
    const response = await AdminAPI.getTenDonations();

    if (response && response.success === true) {
      console.log(response.donations);
      setAllDonations(response.donations);
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
    fetchTotalInfo();
    fetchTenDonations();
    fetchDonationsByMonth();
  }, []);
  return (
    <Container className="pc-container bg-white rounded p-4">
      <h4 className="title-dashboard">Dashboard</h4>
      <div className="pc-content">
        <Row className="justify-content-center align-items-stretch ">
          <Row className="mb-0">
            <Col xl={3} sm={6} className="mb-3">
              <StatisticCard
                title="Dự án "
                value={totalInfo ? totalInfo.projectNumber : 0}
                icon={faHouse}
              />
            </Col>
            <Col xl={3} sm={6} className="mb-3">
              <StatisticCard
                title="Bài viết"
                value={totalInfo ? totalInfo.postNumber : 0}
                icon={faPenToSquare}
              />
            </Col>
            <Col xl={3} sm={6} className="mb-3">
              <StatisticCard
                title="Người dùng"
                value={totalInfo ? totalInfo.clientNumber : 0}
                icon={faUsers}
              />
            </Col>
            <Col xl={3} sm={6} className="mb-3">
              <StatisticCard
                title="Tổ Chức"
                value={totalInfo ? totalInfo.partnerNumber : 0}
                icon={faSitemap}
              />
            </Col>
          </Row>
          <Row className="align-items-stretch">
            <Col className="col-md-6 col-12 mb-md-0 mb-3 text-center ">
              <Supports title="Lượt ủng hộ" value={totalInfo?.supports} />
            </Col>
            <Col className="col-md-6 col-12  ">
              <RecentProjects
                title="Ủng hộ"
                detail={{
                  byMonth: data,
                  amount: totalInfo?.amount,
                }}
                className="dashboard-total-donation"
                type="total-donation"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12} className="mb-md-0 mb-3">
              <RecentProjects
                title="Dự án mới nhất"
                detail={totalInfo && totalInfo.recentProjects}
                className="dashboard-total-donation"
              />
            </Col>

            <Col md={6} xs={12}>
              <RecentProjects
                title="Dự án sắp kết thúc"
                detail={totalInfo && totalInfo.expiringProjects}
                type="expired"
                className="dashboard-total-donation"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <RecentProjects
                title="Danh sách quyên góp gần đây"
                detail={allDonations}
                type="dashboard-donation"
                role={role}
                className="dashboard-total-donation"
              />
            </Col>
          </Row>
        </Row>
      </div>
    </Container>
  );
};

export default Dashboard;
