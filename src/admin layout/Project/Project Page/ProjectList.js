import React from "react";
import ProjectBox from "./ProjectBox"; // Import the Project component
import "./projectlist.css"; // Import your CSS file

function ProjectList({ projects }) {
  return (
    <div className="personal-project-list row">
      {projects.map((project) => (
        <div key={project._id} className="col-xl-4 col-lg-5  col-md-6 col-12">
          <ProjectBox project={project} />
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
