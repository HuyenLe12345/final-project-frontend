import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; // Import Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import convertToSlug from "../Shared/convertToSlug";
import postbackground from "../images/postbackground.png";
import "./postbox.css";
const PostBox = ({ post, deletePost }) => {
  const location = useLocation();
  const path = location.pathname;
  const { idUser, role } = useSelector((state) => state.user);
  console.log(post && post);
  const [pageTitle, setPageTitle] = useState("Donation");

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const handleLinkClick = (newTitle) => {
    setPageTitle(newTitle);
  };
  return (
    <Card className="h-100 mt-0 border-success post-box">
      <Card.Img
        variant="top"
        src={
          post.images[0]
            ? `https://final-project-backend-production-c0dc.up.railway.app/${post.images[0]}`
            : postbackground
        }
        alt={post.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="post-box-title text-start text-success mx-0">
          <Link
            onClick={() => handleLinkClick(post.title || "Bài viết")}
            to={`/posts/${post._id}`}
            style={{ textDecoration: "none" }}
            className="text-success"
          >
            {post.title}
          </Link>
        </Card.Title>
        <Card.Text className="post-box-content text-start">
          {post.content}
        </Card.Text>

        <div className="row align-items-center mb-0">
          <div className="text-start">
            <Link
              to={`${
                idUser.toString() === post.authorId?._id.toString()
                  ? "/personal-page"
                  : post.authorId?.role === "partner"
                  ? `/quy/${convertToSlug(post.authorId?.organizationName)}`
                  : `/taikhoan/${post.authorId?.username}`
              }`}
              state={{ personalPageId: post.authorId?._id }}
            >
              <div className="avatar">
                <img
                  src={`https://final-project-backend-production-c0dc.up.railway.app/${post.authorId?.avatar}`}
                  alt=""
                  style={{ borderRadius: "50%", height: "30px" }}
                />
              </div>
              <div className="post-orgName ">
                {post.authorId?.role === "partner"
                  ? post.authorId?.organizationName
                  : post.authorId?.username}
              </div>
            </Link>
          </div>
        </div>

        <div className="text-muted col-sm-5 ms-5  ">
          <FontAwesomeIcon icon={faCalendarDays} className="me-1" />
          <small>{new Date(post.createdAt).toLocaleDateString()}</small>
        </div>
        {path !== "/home" && path !== "/posts" && (
          <div className="mt-3">
            {idUser.toString() === post.authorId._id.toString() && (
              <Link
                onClick={() => handleLinkClick(post.title || "Bài viết")}
                to={`${
                  role === "admin 1" || role === "admin 2"
                    ? "/admin"
                    : role === "partner"
                    ? "/partner"
                    : ""
                }/posts/${post._id}/edit`}
                className="btn btn-success"
                style={{ fontSize: "10px" }}
              >
                Sửa
              </Link>
            )}
            {role &&
              (role === "admin 1" ||
                role === "admin 2" ||
                idUser.toString() === post.authorId._id.toString()) && (
                <Button
                  className="btn btn-danger"
                  style={{ fontSize: "10px", marginLeft: "10px" }}
                  onClick={() => deletePost(post._id)}
                >
                  Xoá
                </Button>
              )}
          </div>
        )}
      </Card.Body>
      <Link
        onClick={() => handleLinkClick(post.title || "Bài viết")}
        to={`/posts/${post._id}`}
        className="btn btn-white border-success read-button col-sm-7"
        style={{ fontSize: "10px" }}
      >
        Đọc tiếp
      </Link>
    </Card>
  );
};

export default PostBox;
