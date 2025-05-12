import { Col, Row } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CarouselImage from "./CarouselImage";
import ProjectContent from "./ProjectContent";
import GoalBox from "./GoalBox";
import OrganizationBox from "./OrganizationBox";
import DonationForm from "../../Donation Management/Donation Modal/DonationForm";
import DonationModal from "../../Donation Management/Donation Modal/DonationModal";
import ProjectAPI from "../../../API/ProjectAPI";
import Pagination from "../../Manage Users/Pagination";
import FormGroup from "../../../FormGroup/FormGroup";
import queryString from "query-string";
import { useParams } from "react-router-dom";
import Card from "../../../Shared/Card";
import "../../../Shared/card.css";
import "./projectDetail.css";
import CommentBox from "./CommentBox";
import RecentProjects from "../../Dashboard/components/RecentProjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const ProjectDetail = () => {
  const navigate = useNavigate();
  const { contentId } = useParams();
  const userId = useSelector((state) => state.user.idUser);

  const [project, setProject] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [donationList, setDonationList] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const organizationBoxRef = useRef(null);
  const goalBoxRef = useRef(null);
  const [categoryOfContent, setCategoryOfContent] = useState("content");
  const [pagination, setPagination] = useState({
    page: "1",
    count: "10",
  });
  const [totalPage, setTotalPage] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [numberOfDonations, setNumberOfDonations] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      if (organizationBoxRef.current && goalBoxRef.current) {
        const goalBoxTop = goalBoxRef.current.offsetTop;
        const goalBoxHeight = goalBoxRef.current.offsetHeight;

        const organizationBoxTop = organizationBoxRef.current.offsetTop;
        const organizationBoxHeight = organizationBoxRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        if (
          scrollPosition >=
          goalBoxTop +
            goalBoxHeight +
            organizationBoxTop +
            organizationBoxHeight
        ) {
          setIsSticky(true);
        } else if (
          scrollPosition <
          goalBoxTop +
            goalBoxHeight +
            organizationBoxTop +
            organizationBoxHeight
        ) {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    async function fetchProject(contentId) {
      if (!contentId) return;
      const response = await ProjectAPI.getProjectDetail(contentId);
      if (response && response.organization) {
        setOrganization(response.organization);
        setProject(response.project);
        setNumberOfDonations(response.donations.length);
      }
      if (categoryOfContent === "list") {
        let response;
        if (searchName === "") {
          const params = {
            page: pagination.page,
            count: pagination.count,
            // searchName: pagination.searchName,
          };
          const query = queryString.stringify(params);
          const newQuery = `?${query}`;
          response = await ProjectAPI.getDonationListByProjectId(
            contentId,
            newQuery
          );
        } else if (searchName !== "") {
          const query = queryString.stringify({ searchName: searchName });
          const newQuery = `?${query}`;
          response = await ProjectAPI.getDonationByName(contentId, newQuery);
        }
        if (response && response.success === true) {
          setDonationList(response.donations);
          if (response && response.totalDonation) {
            setTotalPage(Math.ceil(response.totalDonation / pagination.count));
          }
        } else if (
          response &&
          (response.status === 500 || response.status === 404)
        ) {
          navigate("/error-page", {
            state: { status: response.status, errors: response.errors },
          });
        }
      }
    }
    fetchProject(contentId);
  }, [contentId, categoryOfContent, pagination, searchName]);
  //  hàm làm xuất hiện hộp form of donation khi click vào nut ủng hộ
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  console.log(organization);
  return (
    <Card formName="project-form">
      <Row>
        <Col lg={8} xs={12}>
          <Row className="status-button text-center">
            <Col
              xs={6}
              className={`active-button  ${
                categoryOfContent === "content" ? "active" : ""
              }`}
              onClick={() => {
                setCategoryOfContent("content");
              }}
            >
              NỘI DUNG DỰ ÁN
            </Col>

            <Col
              xs={6}
              className={`inactive-button  ${
                categoryOfContent === "list" ? "active" : ""
              }`}
              onClick={() => {
                setCategoryOfContent("list");
              }}
            >
              {" "}
              DANH SÁCH ỦNG HỘ
            </Col>
          </Row>
          {project && categoryOfContent === "content" && (
            <>
              <ProjectContent title={project.title} content={project.content} />
              <CarouselImage images={project.images} />
            </>
          )}
          {categoryOfContent === "list" && (
            <>
              <div>
                <div
                  className="search-input-container position-relative"
                  style={{ margin: " 0 10px" }}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="search-icon-detail"
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "15px",
                      color: "gray",
                    }}
                  />
                  <FormGroup
                    value={searchName}
                    type="text"
                    id="searchName"
                    name="searchName"
                    className="search-input"
                    sharedName="search-post"
                    placeholder="Nhập tên cần tìm"
                    onChange={(e) => {
                      setSearchName(e.target.value);
                    }}
                  />
                </div>
              </div>
              {!searchName && donationList.length === 0 && (
                <p className="text-center">Chưa có hoạt động quyên góp.</p>
              )}
              {searchName && donationList.length === 0 && (
                <p className="text-center">Không tìm thấy thông tin nào.</p>
              )}
              {searchName && donationList.length > 0 && (
                <RecentProjects type="project-donation" detail={donationList} />
              )}
              {!searchName && donationList.length > 0 && (
                <>
                  <RecentProjects
                    type="project-donation"
                    detail={donationList}
                  />
                  <Pagination
                    pagination={pagination}
                    handlerChangePage={handlerChangePage}
                    totalPage={totalPage}
                  />
                </>
              )}
            </>
          )}
        </Col>
        <Col lg={4} xs={12} className="goal-org">
          {project && project.goals && (
            <div ref={goalBoxRef} className={isSticky ? "sticky" : ""}>
              <GoalBox
                goals={project.goals}
                status={project.status}
                days={project.deadline}
                userId={userId}
                openModal={handleOpenModal}
                numberOfDonations={numberOfDonations}
              />
            </div>
          )}
          {organization && (
            <div ref={organizationBoxRef} className="organizationBox">
              <OrganizationBox
                name={organization.organizationName}
                summary={organization.summary}
                phone={organization.phone}
                email={organization.email}
                address={organization.address}
                website={organization.website}
              />
            </div>
          )}
        </Col>
      </Row>
      {userId && (
        <Row>
          <Col lg={8} xs={12}>
            <CommentBox type="project" />
          </Col>
        </Row>
      )}

      <Row>
        <DonationModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <DonationForm
            onClose={handleCloseModal}
            name={organization ? organization.organizationName : null}
            typeOfDona={project ? project.types : null}
          />
        </DonationModal>
      </Row>
    </Card>
  );
};

export default ProjectDetail;
