import React from "react";
import "./projectform.css";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import ProjectAPI from "../../../API/ProjectAPI.jsx";
import FormGroup from "../../../FormGroup/FormGroup.js";
import Card from "../../../Shared/Card.js";
import formatDate from "../../../Shared/formatDate.js";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
const ProjectForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { projectId } = useParams();
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editMoneyDonation, setEditMoneyDonation] = useState(false);
  const [editClothesDonation, setEditClothesDonation] = useState(false);
  const [editBookDonation, setEditBookDonation] = useState(false);
  const [editMoneyGoal, setEditMoneyGoal] = useState();
  const [editClothesGoal, setEditClothesGoal] = useState();
  const [editBookGoal, setEditBookGoal] = useState();
  const [editCategory, setEditCategory] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const role = useSelector((state) => state.user.role);
  const userId = useSelector((state) => state.user.idUser);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const formData = new FormData(e.target);

    console.log(formData);
    const data = Object.fromEntries(formData.entries());
    if (projectId) {
      const response = await ProjectAPI.updateProjectDetail(
        projectId,
        formData
      );

      if (response && response.success === true) {
        window.alert("Cập nhật thành công");
        setRedirect(true);
      } else if (
        response &&
        (response.status === 500 || response.status === 404)
      ) {
        navigate("/error-page", {
          state: { status: response.status, errors: response.errors },
        });
      }
    }
    const donationType = formData.getAll("donationType");

    if (
      (donationType.includes("money") && data.moneyGoal === "") ||
      (!donationType.includes("money") && data.moneyGoal !== "") ||
      (donationType.includes("clothes") && data.clothesGoal === "") ||
      (!donationType.includes("clothes") && data.clothesGoal !== "") ||
      (donationType.includes("book") && data.bookGoal === "") ||
      (!donationType.includes("book") && data.bookGoal !== "")
    ) {
      setErrorMessage(`Mục tiêu quyên góp và Hình thức quyên góp chưa khớp!`);
    } else if (donationType.length === 0) {
      setErrorMessage("Bạn cần chọn hình thức quyên góp cho dự án");
    } else {
      setErrorMessage("");
      console.log(data);

      const response = await ProjectAPI.postProjectForm(formData);
      if (response && response.success === true) {
        window.alert("Bạn đã tạo dự án thành công!");
        setRedirect(true);
      } else if (
        response &&
        (response.status === 500 || response.status === 404)
      ) {
        navigate("/error-page", {
          state: { status: response.status, errors: response.errors },
        });
      }
    }
  };
  // trang edit

  async function fetchProjectDetail(id) {
    console.log("this step");
    const response = await ProjectAPI.getProjectDetailFormToEdit(id);
    if (response && response.success === true) {
      const detail = response.project;
      console.log(detail);
      setEditTitle(detail.title || "");
      setEditContent(detail.content || "");
      for (let i = 0; i < detail.types.length; i++) {
        if (detail.types[i] === "money") {
          setEditMoneyDonation(true);
        }
        if (detail.types[i] === "clothes") {
          setEditClothesDonation(true);
        }
        if (detail.types[i] === "book") {
          setEditBookDonation(true);
        }
      }
      for (let m = 0; m < detail.goals.length; m++) {
        if (detail.goals[m].form === "money") {
          setEditMoneyGoal(detail.goals[m].goal);
        }
        if (detail.goals[m].form === "clothes") {
          setEditClothesGoal(detail.goals[m].goal);
        }
        if (detail.goals[m].form === "book") {
          setEditBookGoal(detail.goals[m].goal);
        }
      }
      setProjectStatus(detail.status);
      console.log("detai.status", detail.status);
      setEditCategory(detail.category || "");

      const formattedDate = detail.deadline ? formatDate(detail.deadline) : "";

      setEditDeadline(formattedDate);
      if (response.organizationName) {
        setOrganizationName(response.organizationName.organizationName);
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
  useEffect(() => {
    if (projectId && userId) {
      fetchProjectDetail(projectId, { userId: userId });
    }
  }, [projectId, userId]);
  console.log("xác mình", role, projectStatus);
  return (
    <Card
      formName="layout-form "
      formTitle="BIỂU MẪU VIẾT DỰ ÁN"
      errorMessage={errorMessage}
    >
      <form encType="multipart/form-data" method="POST" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-sm-6 pt-3 column-1">
            {role === "admin" && (
              <FormGroup
                label="Tên tổ chức:"
                type="text"
                id="organizationName"
                name="organizationName"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                required
              />
            )}
            <FormGroup
              label="Tiêu đề dự án:"
              type="text"
              id="projectTitle"
              name="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <FormGroup
              label="Nội dung"
              type="textarea"
              id="projectContent"
              name="content"
              rows="10"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              required
            />
          </div>
          <div className="col-sm-6 pt-3 column-2">
            {/* Other form groups can also be created similarly */}

            <h6>
              Hình thức quyên góp:<sup className="text-danger">*</sup>
            </h6>

            <FormGroup
              label="Tiền"
              type="checkbox"
              id="money"
              name="donationType"
              sharedName="donationType"
              value="money"
              checked={editMoneyDonation}
              onChange={(e) => setEditMoneyDonation(e.target.checked)}
              disabled={projectId && true}
            />
            <FormGroup
              label="Quần áo"
              type="checkbox"
              id="clothes"
              name="donationType"
              sharedName="donationType"
              value="clothes"
              checked={editClothesDonation}
              onChange={(e) => setEditClothesDonation(e.target.checked)}
              disabled={projectId && true}
            />
            <FormGroup
              label="Sách"
              type="checkbox"
              id="books"
              name="donationType"
              sharedName="donationType"
              value="book"
              checked={editBookDonation}
              onChange={(e) => setEditBookDonation(e.target.checked)}
              disabled={projectId && true}
            />
            <h6>
              Mục tiêu quyên góp:<sup className="text-danger">*</sup>
            </h6>
            <Row className="ms-1">
              <FormGroup
                label="Tiền"
                type="number"
                id="moneyGoal"
                name="moneyGoal"
                sharedName="goal col-md-2 px-0"
                min="0"
                value={editMoneyGoal}
                disabled={projectId && true}
              />
              <FormGroup
                label="Sách"
                type="number"
                id="bookGoal"
                name="bookGoal"
                min="0"
                sharedName="goal col-md-2 px-0"
                value={editBookGoal}
                disabled={projectId && true}
              />
              <FormGroup
                label="Quần áo"
                type="number"
                id="clothesGoal"
                name="clothesGoal"
                min="0"
                sharedName="goal col-md-2 px-0"
                value={editClothesGoal}
                onChange={(e) => setEditClothesGoal(e.target.value)}
                disabled={projectId && true}
              />
            </Row>
            <FormGroup
              label="Lĩnh vực"
              type="select"
              id="category"
              name="category"
              sharedName="category"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              options={[
                { value: "education", label: "Giáo dục" },
                { value: "children", label: "Trẻ em" },
                { value: "medical", label: "Y tế" },
                { value: "environment", label: "Môi trường" },
              ]}
              required
            />
            <FormGroup
              label="Hạn cuối:"
              type="date"
              id="deadline"
              name="deadline"
              className="form-control"
              sharedName="deadline"
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
              disabled={projectId && role === "partner"}
              required
            />
            <FormGroup
              label="Tải ảnh:"
              type="file"
              id="upload"
              name="images"
              sharedName="images"
              multiple
              required={!projectId}
            />
            {projectId && (
              <FormGroup
                label="Trạng thái"
                type="select"
                id="status"
                name="status"
                sharedName="status"
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
                options={[
                  { value: "Đang kêu gọi", label: "Đang kêu gọi" },
                  { value: "Kết thúc", label: "Kết thúc" },
                ]}
              />
            )}
            {/* Add more FormGroup instances as needed */}
          </div>
        </div>
        <p>
          <small>
            <span>Lưu ý:</span> Mục (<span className="text-danger">*</span>):
            không được để trống.
          </small>
        </p>

        <div className="container-button">
          <button type="submit" className="btn btn-success text-center">
            Submit
          </button>
        </div>
      </form>
      {projectId && redirect && <Navigate to={`/projects/${projectId}`} />}
      {redirect && !projectId && <Navigate to="/projects" />}
    </Card>
  );
};

export default ProjectForm;
