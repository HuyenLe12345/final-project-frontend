import React, { useState, useEffect } from "react";
import PostBox from "../../Posts/PostBox";
import "./ProjectList.css";

function PostList({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Số lượng bài viết trên mỗi trang

  // Hàm để cập nhật số lượng bài viết trên mỗi trang dựa trên kích thước màn hình
  const updateItemsPerPage = () => {
    if (window.innerWidth < 768) {
      setItemsPerPage(1);
    } else if (window.innerWidth < 992) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(3);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    console.log(currentIndex);
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handleMoveLeft = () => {
    if (currentIndex > itemsPerPage - 1) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleMoveRight = () => {
    if (currentIndex < posts.length - itemsPerPage) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  return (
    <section className="project-list py-5 bg-white my-5  ">
      <h2 className="text-center text-white bg-success mb-4">
        Bài viết mới nhất
      </h2>
      {posts.length === 0 && <p>Không có bài viết nào</p>}
      {posts.length > 0 && (
        <div className="container position-relative">
          <div className="project-row">
            <span className="arrow-left " onClick={handleMoveLeft}>
              &#10094;
            </span>
            <div
              className=" justify-content-start w-100  gap-2"
              style={{
                display: "flex",
                transform: `-translateX(${
                  (currentIndex / posts.length) * 100
                }%)`,
              }}
            >
              {posts
                .slice(currentIndex, currentIndex + itemsPerPage)
                .map((post) => (
                  <div
                    key={post._id}
                    className="post-col col-lg-4 col-md-6 col-12"
                  >
                    <PostBox post={post} />
                  </div>
                ))}
            </div>
            <span className="arrow-right" onClick={handleMoveRight}>
              &#10095;
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default PostList;
