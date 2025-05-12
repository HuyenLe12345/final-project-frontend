import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Modal } from "react-bootstrap";
import Card from "../Shared/Card";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PostAPI from "../API/PostAPI";
import UserIcon from "../Shared/UserIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import CommentBox from "../admin layout/Project/ProjectDetail/CommentBox";
import convertToSlug from "../Shared/convertToSlug";
import "./postform.css";
function PostDetail() {
  const navigate = useNavigate();
  const { contentId } = useParams();
  const userId = useSelector((state) => state.user.idUser);
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [favorites, setFavorites] = useState([]);
  // hàm lấy thông tin chi tiết của một bài viết
  async function fetchPostDetail(id) {
    const response = await PostAPI.getPostDetail(id);
    if (response && response.success === true) {
      console.log("post", response.post);
      setPost(response.post);
      setRecentPosts(response.recentPosts);
      setFavorites(response.post.favorites);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }
  const handleImageClick = (index) => {
    setCurrentImage(index);
    setShowModal(true);
  };
  useEffect(() => {
    if (contentId) {
      console.log(contentId);
      fetchPostDetail(contentId);
    }
  }, [contentId]);
  async function toggleLike() {
    console.log("click like");
    // Tạo bản sao của mảng favorites hiện tại
    const newFavorites = [...favorites];

    // Kiểm tra xem user đã like chưa
    const userIndex = newFavorites.indexOf(userId);

    // Thực hiện thay đổi trên local state trước
    if (userIndex === -1) {
      newFavorites.push(userId); // Thêm userId nếu chưa like
    } else {
      newFavorites.splice(userIndex, 1); // Xóa userId nếu đã like
    }
    setFavorites(newFavorites);

    // Gọi API cập nhật lên server
    const response = await PostAPI.toggleLike(contentId);

    if (response && (response.status === 500 || response.status === 404)) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }
  const [pageTitle, setPageTitle] = useState("Donation");

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const handleLinkClick = (newTitle) => {
    setPageTitle(newTitle);
  };
  return (
    <Card formName="post-page-detail">
      <Container style={{ marginTop: "50px" }}>
        <Row>
          <Col md={8}>
            {/* Nội dung bài viết */}
            <div className=" mb-0" style={{ textAlign: "left" }}>
              <div
                style={{
                  display: "inline-block",
                  width: "30px",
                  height: "30px",
                  marginRight: "10px",
                }}
              >
                <UserIcon
                  avatar={post && post.authorId.avatar}
                  username={
                    post?.authorId?.role === "partner"
                      ? post?.authorId?.organizationName
                      : post?.authorId?.username
                  }
                  href="#"
                />
              </div>
              <div
                style={{
                  display: "inline-block",
                  textAlign: "left",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                <Link
                  to={`${
                    userId.toString() === post?.authorId?._id.toString()
                      ? "/personal-page"
                      : post?.authorId?.role === "partner"
                      ? `/quy/${convertToSlug(
                          post?.authorId?.organizationName
                        )}`
                      : `/taikhoan/${post?.authorId?.username}`
                  }`}
                  state={{ personalPageId: post?.authorId?._id }}
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  {post?.authorId?.role === "partner"
                    ? post?.authorId?.organizationName
                    : post?.authorId?.username}
                </Link>
              </div>
            </div>
            <div
              className="post-date small"
              style={{
                textAlign: "left",
                marginLeft: "40px",
                color: "gray",
              }}
            >
              {post && new Date(post.createdAt).toLocaleString()}
            </div>
            <h5
              className="post-title"
              style={{
                textAlign: "center",
                marginLeft: "60px",
                marginTop: "20px",
              }}
            >
              {post && post.title}
            </h5>
            <div
              className="post-content"
              style={{
                textAlign: "justify",
                marginLeft: "50px",
                marginRight: "50px",
              }}
            >
              {post &&
                post.content
                  .split("\n")
                  .map((con, index) => <p key={index}> {con}</p>)}
            </div>
            <div className="post-media">
              {post &&
                post.images.map((image, index) => (
                  <Image
                    key={index}
                    src={`http://localhost:8080/${image}`}
                    onClick={() => handleImageClick(index)}
                    fluid
                    style={{ width: "45%", margin: "5px" }}
                  />
                ))}
            </div>
            {userId && (
              <div
                className="like-button mt-5"
                style={{ textAlign: "left", marginLeft: "50px" }}
              >
                <button
                  type="button"
                  className="btn btn-default btn-xs me-1"
                  onClick={toggleLike}
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className={`me-2 ${
                      favorites.includes(userId) ? "text-primary" : ""
                    }`}
                  />
                  Like{" "}
                  <span className="pull-right text-muted ms-2">
                    {favorites.length} like{favorites.length > 1 ? "s" : ""}
                  </span>
                </button>
              </div>
            )}
          </Col>
          <Col
            md={4}
            className="bg-success align-self-start rounded mt-5"
            style={{ textAlign: "left", height: "auto" }}
          >
            <h5
              style={{ textAlign: "center", marginTop: "10px", color: "white" }}
            >
              Bài viết gần đây
            </h5>
            {/* Bài viết gần đây */}
            {recentPosts && recentPosts.length === 0 && (
              <p className="text-center">Không có bài viết.</p>
            )}
            {recentPosts &&
              recentPosts.length > 0 &&
              recentPosts.map((post, index) => (
                <div className="row align-items-center each-post mx-1 ">
                  <div key={post._id} className="recent-post px-0 col-sm-3">
                    <Image
                      src={`https://final-project-backend-production-c0dc.up.railway.app/${post.images[0]}`}
                      fluid
                    />
                  </div>

                  <div className="col-sm-9">
                    <h6 className="text-success">
                      <Link
                        onClick={() =>
                          handleLinkClick(post.title || "Donation")
                        }
                        to={`/posts/${post._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {post.title}
                      </Link>
                    </h6>
                    <p style={{ fontSize: "13px" }}>
                      Tác giả:{" "}
                      {post?.authorId?.role === "partner"
                        ? post?.authorId?.organizationName
                        : post?.authorId?.username}
                    </p>
                  </div>
                </div>
              ))}
          </Col>
        </Row>
        {userId && (
          <Row>
            <Col md={8} xs={12}>
              <CommentBox type="post" />
            </Col>
          </Row>
        )}
        {/* Modal xem ảnh phóng to */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Body>
            {post && (
              <>
                <Image
                  src={`https://final-project-backend-production-c0dc.up.railway.app/${post.images[currentImage]}`}
                  fluid
                />
                <div className="modal-controls text-center mt-3">
                  <button
                    className="btn btn-success me-3"
                    onClick={() =>
                      setCurrentImage(
                        (prev) =>
                          (prev - 1 + post.images.length) % post.images.length
                      )
                    }
                  >
                    Trước
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      setCurrentImage((prev) => (prev + 1) % post.images.length)
                    }
                  >
                    Sau
                  </button>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </Card>
  );
}

export default PostDetail;
