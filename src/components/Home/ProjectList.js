import React, { useState, useEffect } from "react";
import ProjectBox from "../../admin layout/Project/Project Page/ProjectBox";
import "./ProjectList.css";

function ProjectList({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Số lượng dự án trên mỗi trang

  // Hàm để cập nhật số lượng dự án trên mỗi trang dựa trên kích thước màn hình
  const updateItemsPerPage = () => {
    if (window.innerWidth < 768) {
      setItemsPerPage(1);
    } else if (window.innerWidth < 992) {
      console.log("window.innerWidth)", window.innerWidth);
      setItemsPerPage(2);
    } else {
      setItemsPerPage(3);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handleMoveLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleMoveRight = () => {
    if (currentIndex < projects.length - itemsPerPage) {
      console.log("hello");
      setCurrentIndex(currentIndex + itemsPerPage); // Thay đổi ở đây
    }
  };

  return (
    <section className="project-list py-5">
      <h2 className="text-center text-white mb-4 bg-success">
        Dự án đang gây quỹ
      </h2>

      <div className="container position-relative">
        {projects.length === 0 && <p>Không có dự án nào đang gây quỹ</p>}
        {projects.length > 0 && (
          <>
            <span className="arrow-left" onClick={handleMoveLeft}>
              &#10094;
            </span>
            <div
              className="project-row justify-content-start  gap-2"
              style={{
                display: "flex",
                transform: `-translateX${
                  (currentIndex / projects.length) * 100
                }%`,
                // Thêm hiệu ứng chuyển động
              }}
            >
              {projects
                .slice(currentIndex, currentIndex + itemsPerPage)
                .map((project, index) => (
                  <div key={project._id} className="col-lg-4 col-md-6 col-12">
                    <ProjectBox project={project} />
                  </div>
                ))}
            </div>
            <span className="arrow-right" onClick={handleMoveRight}>
              &#10095;
            </span>
          </>
        )}
      </div>
    </section>
  );
}

export default ProjectList;
