import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RecentProjects from "../Dashboard/components/RecentProjects";
import AdminAPI from "../../API/AdminAPI";
import queryString from "query-string";
import Pagination from "./Pagination.jsx";
import DonationModal from "../Donation Management/Donation Modal/DonationModal";
import { Row, Col } from "react-bootstrap";
import ConfirmForm from "../Donation Management/Donation Modal/ConfirmForm";
import FormGroup from "../../FormGroup/FormGroup.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "../Dashboard/dashboard.css";
const UserManagement = ({ type, options, paginationOnSeniorPage }) => {
  const [userList, setUserList] = useState(null);
  const [pagination, setPagination] = useState(paginationOnSeniorPage);
  const [totalPage, setTotalPage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeOfSenior, setTypeOfSenior] = useState("partner");
  const [status, setStatus] = useState("active");
  const [searchContent, setSearchContent] = useState("");
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user);
  // hàm chuyển trang
  const handlerChangePage = (value) => {
    console.log("Value: ", value);

    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination((prev) => ({
      ...prev,
      page: value,
      count: pagination.count,
    }));
  };
  // hàm tính tổng số trang
  useEffect(() => {
    const fetchAllData = async () => {
      let response;
      if (type === "client") {
        response = await AdminAPI.getTotalUsers();
      } else if (typeOfSenior === "partner") {
        response = await AdminAPI.getTotalPartners();
      } else if (typeOfSenior === "admin") {
        response = await AdminAPI.getTotalAdmins();
      }
      if (response && response.success === true) {
        let totalPage;
        if (response.totalUsers) {
          totalPage = Math.ceil(
            parseInt(response.totalUsers) / parseInt(pagination.count)
          );
        }
        if (response.totalPartners) {
          totalPage = Math.ceil(
            parseInt(response.totalPartners) / parseInt(pagination.count)
          );
        }
        if (response.totalAdmins) {
          totalPage = Math.ceil(
            parseInt(response.totalAdmins) / parseInt(pagination.count)
          );
        }

        console.log("totalpage", totalPage);

        setTotalPage(totalPage);
      } else if (
        response &&
        (response.status === 500 ||
          response.status === 404 ||
          response.status === 403)
      ) {
        // Chuyển hướng đến trang lỗi
        navigate("/error-page", {
          state: { status: response.status, errors: response.errors },
        });
      }
    };

    fetchAllData();
  }, [type, typeOfSenior]);

  // hàm tải user theo trang
  async function fetchUsers() {
    let response;
    const params = {
      type: type,
      page: pagination.page,
      count: pagination.count,
      searchStatus: pagination.searchStatus,
      searchContent: pagination.searchContent,
      searchTypeOfSenior: pagination.searchTypeOfSenior,
    };
    const query = queryString.stringify(params);
    const newQuery = "?" + query;
    response = await AdminAPI.getUsersByType(newQuery);

    console.log(response, "hello");
    if (response && response.success === true) {
      setUserList(response.users);
    } else if (
      response &&
      (response.status === 500 ||
        response.status === 404 ||
        response.status === 403)
    ) {
      // Chuyển hướng đến trang lỗi
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }
  useEffect(() => {
    fetchUsers();
  }, [pagination]);

  // hàm xoá user
  const deleteUser = async () => {
    const response = await AdminAPI.deleteUser(userId);
    if (response && (response.status === 200 || response.success === true)) {
      window.alert(`${response.message}`);
      fetchUsers();
    } else if (
      response &&
      (response.status === 500 ||
        response.status === 404 ||
        response.status === 403)
    ) {
      // Chuyển hướng đến trang lỗi
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  };
  // hộp thoại xác nhận có muốn xoá không?
  const handleOpenModal = (id) => {
    setIsModalOpen(true);
    setUserId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Row className="filter-container justify-content-end  align-items-center">
        {type === "senior" && (
          <Col className="col-auto">
            <FormGroup
              value={typeOfSenior}
              type="select"
              id="type"
              name="type"
              sharedName="col-auto"
              className="filter-control search-status"
              onChange={(e) => {
                setTypeOfSenior(e.target.value);
                setPagination((prev) => ({
                  ...prev,
                  searchTypeOfSenior: e.target.value,
                }));
              }}
              options={options}
            />
          </Col>
        )}

        <Col className="col-auto">
          <FormGroup
            value={status}
            type="select"
            id="status"
            name="status"
            sharedName="col-auto"
            className="filter-control search-status "
            onChange={(e) => {
              setStatus(e.target.value);
              setPagination((prev) => ({
                ...prev,
                searchStatus: e.target.value,
              }));
            }}
            options={[
              { value: "active", label: "Hoạt động" },
              { value: "inactive", label: "Dừng hoạt động" },
            ]}
          />
        </Col>
        <Col className="col-auto" style={{ position: "relative" }}>
          <div className="search-user">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className=" ms-4"
              style={{
                position: "absolute",
                left: "0%",
                top: "27%",
                color: "gray",
              }}
            />
            <FormGroup
              value={searchContent}
              type="text"
              id="searchContent"
              name="searchContent"
              className="search-input"
              placeholder="Tìm kiếm"
              onChange={(e) => {
                setSearchContent(e.target.value);
                setPagination((prev) => ({
                  ...prev,
                  searchContent: e.target.value,
                }));
              }}
            />
          </div>
        </Col>
      </Row>
      <div className="pc-content mb-5">
        <RecentProjects
          height="height"
          type="users"
          title={
            type === "client"
              ? "Thông tin người dùng"
              : typeOfSenior === "partner"
              ? "Thông tin đối tác"
              : typeOfSenior === "admin"
              ? "Thông tin admin"
              : ""
          }
          detail={userList}
          onOpen={handleOpenModal}
          senior={
            type === "client"
              ? "client"
              : typeOfSenior && typeOfSenior === "partner"
              ? "partner"
              : "admin"
          }
        />
        <Pagination
          pagination={pagination}
          handlerChangePage={handlerChangePage}
          totalPage={totalPage ? totalPage : ""}
        />
      </div>
      <Row>
        <DonationModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ConfirmForm
            content="Bạn có chắc chắn xoá đối tượng này không?"
            onClose={handleCloseModal}
            deleteUser={deleteUser}
          />
        </DonationModal>
      </Row>
    </>
  );
};

export default UserManagement;
