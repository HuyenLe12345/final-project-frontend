import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentProjects from "../Dashboard/components/RecentProjects";
import Card from "../../Shared/Card";
import DonationAPI from "../../API/DonationAPI";
import ProjectAPI from "../../API/ProjectAPI";
import UserAPI from "../../API/UserAPI";
import DonationModal from "../Donation Management/Donation Modal/DonationModal";
import ConfirmForm from "./Donation Modal/ConfirmForm";
import { useSelector } from "react-redux";
import FormGroup from "../../FormGroup/FormGroup";
import { Row, Col } from "react-bootstrap";
import Pagination from "../Manage Users/Pagination";
import queryString from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./DonationManagement.css"; // Import the new CSS file
import moment from "moment";
const DonationManagement = () => {
  const [donationList, setDonationList] = useState();
  const organizationId = useSelector((state) => state.user.idUser);
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [status, setStatus] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [typeOfDonation, setTypeOfDonation] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectOptions, setProjectOptions] = useState([]); // Danh sách dự án
  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [organizationName, setOrganizationName] = useState("");
  const [pagination, setPagination] = useState(
    role && role === "partner"
      ? {
          page: 1,
          count: 20,
          searchStatus: "",
          projectName: "",
          searchDate: "",
          searchContent: "",
          typeOfDonation: "",
        }
      : {
          page: 1,
          count: 20,
          searchStatus: "",
          projectName: "",
          searchDate: "",
          searchContent: "",
          typeOfDonation: "",
          organization: "",
        }
  );

  const [totalPage, setTotalPage] = useState(0);
  const [registered, setRegistered] = useState(null);
  const [typeOfDona, setTypeOfDona] = useState(null);

  // tải danh sách theo mặc định mới nhất
  async function fetchDonationList() {
    let response;
    let newQuery;
    if (role === "partner") {
      //  trang dành cho partner thì cố định organizationId
      const params = {
        page: pagination.page,
        count: pagination.count,
        status: pagination.searchStatus,
        searchDate: pagination.searchDate,
        searchContent: pagination.searchContent,
        typeOfDonation: pagination.typeOfDonation,
        projectName: pagination.projectName,
        organizationId,
      };

      const query = queryString.stringify(params);
      newQuery = "?" + query;
    } else if (role === "admin 1" || role === "admin 2") {
      //trang dành cho admin thì  organization để
      // khi tên của tổ chức thay đổi thì organizaiton trong pagination cũng thay đổi
      const params = {
        page: pagination.page,
        count: pagination.count,
        status: pagination.searchStatus,
        searchDate: pagination.searchDate,
        searchContent: pagination.searchContent,
        typeOfDonation: pagination.typeOfDonation,
        projectName: pagination.projectName,
        organization: pagination.organization,
      };
      const query = queryString.stringify(params);
      newQuery = "?" + query;
    }
    console.log(newQuery);
    response = await DonationAPI.getDonationList(newQuery);
    if (response && response.success === true) {
      setDonationList(response.donationList);
      setTotalPage(Math.ceil(response.totalCount / pagination.count));
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }
  // tải danh sách các tổ chức
  async function fetchOrganizationList() {
    console.log("org");
    const response = await UserAPI.getOrganizationList();
    console.log("response");
    if (response && response.success === true) {
      console.log("success");
      const options = response.organizationList.map((org) => ({
        value: org._id,
        label: org.organizationName,
      }));
      options.unshift({ value: "", label: "Tổ chức" });
      setOrganizationOptions(options);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }
  // tải danh sách tất cả các dự án
  async function fetchAllProjectList() {
    console.log("projectlist");
    const response = await ProjectAPI.getAllProjectList();
    console.log("response");
    if (response && response.success === true) {
      console.log("success");
      const options = response.projectList.map((project) => ({
        value: project._id,
        label: project.title,
      }));
      options.unshift({ value: "", label: "Dự án" });
      setProjectOptions(options);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }

  // tải danh sách project thuộc tổ chức cụ thể theo id
  async function fetchProjectList(id) {
    console.log("projectlist");
    const response = await ProjectAPI.getProjectList(id);
    console.log("response");
    if (response && response.success === true) {
      console.log("success");
      const options = response.projectList.map((project) => ({
        value: project._id,
        label: project.title,
      }));
      options.unshift({ value: "", label: "Dự án" });
      setProjectOptions(options);
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
    if (role) {
      fetchDonationList();
    }
  }, [pagination]);
  useEffect(() => {
    if (role && role === "partner" && organizationId) {
      fetchProjectList(organizationId);
    } else if (role && (role === "admin 1" || role === "admin 2")) {
      fetchAllProjectList();
      fetchOrganizationList();
    }
  }, [organizationId]);
  const handleOpenModal = (id) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };
  const handleBulkConfirm = async (selectedIds, action) => {
    // Gọi API xác nhận hàng loạt với selectedIds

    const response = await DonationAPI.updateDonation({
      donationIds: selectedIds,
      action,
    });

    if (response && response.success === true) {
      window.alert("Xác nhận thành công!");
      fetchDonationList(organizationId);
    } else if (response && response.status === 400) {
      window.alert(response.errors);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
    console.log("Xác nhận các ID:", selectedIds);
  };

  const handleBulkReject = async (selectedIds, action, reasonForRejection) => {
    // Gọi API từ chối hàng loạt với selectedIds

    const response = await DonationAPI.updateDonation({
      donationIds: selectedIds,
      action,
      reasonForRejection,
    });

    if (response && response.success === true) {
      window.alert("Từ chối thành công!");
      fetchDonationList(organizationId);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
    console.log("Từ chối các ID:", selectedIds);
  };
  const handleCorrect = async (selectedIds, action, exact) => {
    const response = await DonationAPI.updateDonation({
      donationIds: selectedIds,
      action,
      exact,
    });
    if (response && response.success === true) {
      window.alert("Đính chính thành công");
      fetchDonationList(organizationId);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
    console.log("Đính chính các ID:", selectedIds);
  };
  const actionClick = (type, ids, registered, typeOfDona) => {
    setAction(type);
    setSelectedIDs(ids);
    setIsModalOpen(true);
    setRegistered(registered);
    setTypeOfDona(typeOfDona);
  };

  return (
    <Card formName="donation-management">
      <Row className="filter-container justify-content-sm-start justify-content-md-between align-items-center">
        <Col className="filter-options row justify-content-start mb-0 col-auto">
          {role && (role === "admin 1" || role === "admin 2") && (
            <FormGroup
              value={organizationName}
              type="select"
              id="organizationName"
              name="organizationName"
              sharedName="col-auto"
              className="filter-control search-project"
              onChange={(e) => {
                setOrganizationName(e.target.value);
                setPagination((prev) => ({
                  ...prev,
                  organization: e.target.value,
                }));
              }}
              options={organizationOptions}
            />
          )}
          <FormGroup
            value={projectName}
            type="select"
            id="projectName"
            name="projectName"
            sharedName="col-auto"
            className="filter-control search-project"
            onChange={(e) => {
              setProjectName(e.target.value);
              setPagination((prev) => ({
                ...prev,
                projectName: e.target.value,
              }));
            }}
            placeholder="Tìm kiếm dự án"
            options={projectOptions}
          />
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
              { value: "", label: "Trạng thái" },
              { value: "pending", label: "Chờ duyệt" },
              { value: "confirm", label: "Đã nhận" },
              { value: "reject", label: "Từ chối" },
            ]}
          />

          <FormGroup
            value={searchDate}
            type="date"
            id="searchDate"
            name="searchDate"
            sharedName="col-auto"
            className="filter-control search-date"
            onChange={(e) => {
              const selectedDate = e.target.value;
              const formattedDate = moment(selectedDate).format("YYYY-MM-DD"); // Định dạng lại ngày tháng
              setSearchDate(selectedDate);
              setPagination((prev) => ({
                ...prev,
                searchDate: formattedDate,
              }));
            }}
          />

          <FormGroup
            value={typeOfDonation}
            type="select"
            id="typeOfDonation"
            name="typeOfDonation"
            sharedName="col-auto"
            className="filter-control search-type"
            onChange={(e) => {
              setTypeOfDonation(e.target.value);
              setPagination((prev) => ({
                ...prev,
                typeOfDonation: e.target.value,
              }));
            }}
            options={[
              { value: "", label: "Quyên góp" },
              { value: "money", label: "Tiền" },
              { value: "clothes", label: "Quần áo" },
              { value: "book", label: "Sách" },
            ]}
          />
        </Col>

        <Col className="search-bar justify-content-xl-end justify-content-start col-auto ">
          <div className="search-input-container">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
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
      {role && role === "partner" && (
        <RecentProjects
          title="DANH SÁCH QUYÊN GÓP"
          type="donation"
          detail={donationList}
          actionHandler={actionClick}
          onOpen={handleOpenModal}
          className="donation-list"
          selectedIDs={selectedIDs}
          role="partner"
        />
      )}
      {role && (role === "admin 1" || role === "admin 2") && (
        <RecentProjects
          title="DANH SÁCH QUYÊN GÓP"
          type="donation"
          detail={donationList}
          className="donation-list"
          selectedIDs={selectedIDs}
          role={role}
        />
      )}
      <Pagination
        pagination={pagination}
        handlerChangePage={handlePageChange}
        totalPage={totalPage}
      />

      <Row>
        <DonationModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ConfirmForm
            action={action}
            registered={registered || ""}
            typeOfDona={typeOfDona || ""}
            onClose={handleCloseModal}
            selectedIDs={selectedIDs}
            onBulkConfirm={handleBulkConfirm}
            onBulkReject={handleBulkReject}
            onCorrect={handleCorrect}
          />
        </DonationModal>
      </Row>
    </Card>
  );
};

export default DonationManagement;
