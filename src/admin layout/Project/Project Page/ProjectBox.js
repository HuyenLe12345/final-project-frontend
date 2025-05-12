import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toVND } from "../../../Shared/toVND";
import { translate } from "../../../Shared/translate";
import { calculateDaysLeft } from "../../../Shared/calculateDaysleft";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import convertToSlug from "../../../Shared/convertToSlug";
import "./projectbox.css"; // Import your CSS file

const ProjectBox = ({ project }) => {
  const { idUser, role } = useSelector((state) => state.user);
  const goal = project.goals[0];
  console.log(goal.form, toVND(goal.goal));
  const [pageTitle, setPageTitle] = useState("Donation");

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const handleLinkClick = (newTitle) => {
    setPageTitle(newTitle);
  };
  return (
    <div className="project-column p-0 postion-relative">
      <Link
        onClick={() => handleLinkClick(project.title || "Donation")}
        to={`/projects/${project._id}`}
      >
        <img
          src={`http://localhost:8080/${project.images[0]}`}
          alt={project.title}
        />
      </Link>
      <div className="project-category">
        <span>{translate(project.category)}</span>
      </div>
      <div className="project-title">
        <Link
          onClick={() => handleLinkClick(project.title || "Donation")}
          to={`/projects/${project._id}`}
        >
          {project.title}
        </Link>
      </div>
      <div className="funding-goals p-2 pe-0  w-100">
        <div
          className="goal-project row  align-items-center mb-1"
          key={goal._id}
        >
          <div className="goal-form col-3">
            <span className="goal-type">
              {goal.form === "money"
                ? "Tiền"
                : goal.form === "clothes"
                ? "Quần áo"
                : "Sách"}
            </span>{" "}
          </div>
          <div className="goal-progress col-9">
            <span className="percentage text-danger">
              {((goal.raised / goal.goal) * 100).toFixed(2)}%
            </span>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${((goal.raised / goal.goal) * 100).toFixed(2)}%`,
                }}
              ></div>
            </div>
            <div className="row justify-content-between mb-0 ">
              <span className="col-6 raised text-start">
                {goal.form === "money" ? toVND(goal.raised) : goal.raised}{" "}
                {goal.form === "money"
                  ? "đ"
                  : goal.form === "clothes"
                  ? "chiếc"
                  : "cuốn"}
              </span>{" "}
              <span className=" col-6  goal-amount text-end">
                {goal.form === "money" ? toVND(goal.goal) : goal.goal}{" "}
                {goal.form === "money"
                  ? "đ"
                  : goal.form === "clothes"
                  ? "chiếc"
                  : "cuốn"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="organization ">
        <div className="org-avatar">
          <Link
            onClick={() =>
              handleLinkClick(
                project.organizationId.organizationName || "Trang cá nhân"
              )
            }
            to={`${
              project.organizationId._id.toString() === idUser.toString()
                ? "/partner/personal-page"
                : `/quy/${convertToSlug(
                    project.organizationId.organizationName
                  )}`
            }`}
            state={{ personalPageId: project.organizationId._id }}
          >
            <div className="avatar">
              <img
                src={`http://localhost:8080/${project.organizationId.avatar}`}
                alt=""
              />
            </div>
            <div className="orgName">
              {project.organizationId.organizationName}
            </div>
          </Link>
        </div>
        <div className="col-sm-5 deadline text-start">
          <FontAwesomeIcon icon={faCalendarDays} className="text-success " />{" "}
          {calculateDaysLeft(project.deadline)
            ? `Còn ${calculateDaysLeft(project.deadline)} ngày`
            : "Kết thúc"}
        </div>
      </div>
      {(role === "admin 1" ||
        role === "admin 2" ||
        project.organizationId._id.toString() === idUser.toString()) && (
        <Button
          className="btn-success text-white position-absolute"
          style={{ top: "0", left: "0" }}
        >
          <Link
            onClick={() => handleLinkClick(project.title || "Donation")}
            to={`${
              role === "admin 1" || role === "admin 2" ? "/admin" : "/partner"
            }/projects/edit/${project._id}`}
            className="text-white"
            style={{ textDecoration: "none" }}
          >
            Edit
          </Link>
        </Button>
      )}
    </div>
  );
};

export default ProjectBox;
