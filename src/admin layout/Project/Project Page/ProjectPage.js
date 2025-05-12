import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectList from "./ProjectList";
import ProjectAPI from "../../../API/ProjectAPI";
import Card from "../../../Shared/Card";
import ProjectSearch from "./ProjectSearch";
import { Row, Col } from "react-bootstrap";
import "./projectpage.css";
const ProjectPage = () => {
  const navigate = useNavigate();
  const [activeProjects, setProjects] = useState();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [organizations, setOrganizations] = useState([
    { value: "", label: "Tất cả tổ chức" },
  ]);
  const [button, setButton] = useState("active");
  const [search, setSearch] = useState({
    category: "",
    organization: "",
    typeOfDonation: "",
    sortOrder: "newest",
  });
  const [isLoading, setIsLoading] = useState(true);
  async function fetchProjects(func) {
    setIsLoading(true);
    const response = await func();

    if (response && response.projects) {
      console.log(response.projects);
      setProjects(response.projects);
      setFilteredProjects(response.projects);
      const org = response.organizations.map((orga) => ({
        value: orga.organizationName,
        label: orga.organizationName,
      }));
      org.unshift({ value: "", label: "Tất cả tổ chức" });
      setOrganizations(org);
      setSearch({
        category: "",
        organization: "",
        typeOfDonation: "",
        sortOrder: "newest",
      });
      setIsLoading(false);
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
    fetchProjects(ProjectAPI.getActiveProjects);
  }, []);

  return (
    <Card formName="project-page">
      <Row className="status-button">
        <Col
          sm={6}
          className={`active-button  ${button === "active" ? "active" : ""}`}
          onClick={() => {
            fetchProjects(ProjectAPI.getActiveProjects);
            setButton("active");
          }}
        >
          DỰ ÁN ĐANG KÊU GỌI
        </Col>

        <Col
          sm={6}
          className={`inactive-button  ${
            button === "inactive" ? "active" : ""
          }`}
          onClick={() => {
            fetchProjects(ProjectAPI.getInactiveProjects);
            setButton("inactive");
          }}
        >
          {" "}
          DỰ ÁN ĐÃ KẾT THÚC
        </Col>
      </Row>
      <ProjectSearch
        projects={activeProjects}
        organizations={organizations}
        setFilteredProjects={setFilteredProjects}
        search={search}
        setSearch={setSearch}
      />
      {isLoading && <p style={{ textAlign: "center" }}>loading...</p>}
      {!isLoading && filteredProjects.length === 0 && (
        <p>Không có dự án nào!</p>
      )}
      {!isLoading && filteredProjects.length > 0 && (
        <ProjectList projects={filteredProjects} />
      )}
    </Card>
  );
};
export default ProjectPage;
