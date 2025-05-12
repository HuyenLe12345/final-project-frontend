// ProfilePage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import DonationModal from "../../Donation Management/Donation Modal/DonationModal";
import ConfirmForm from "../../Donation Management//Donation Modal/ConfirmForm";
import UserAPI from "../../../API/UserAPI";
import PostAPI from "../../../API/PostAPI.jsx";
import UploadModal from "./UploadModal";
import StatCard from "./StatCard";
import ProjectList from "../../Project/Project Page/ProjectList.js";
import PostList from "../../../Posts/PostList.js";
import RecentProjects from "../../Dashboard/components/RecentProjects.js";
import { updateAvatar, updateBackground } from "../../../store/user.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhoneFlip,
  faEarthAmericas,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
const PersonalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const path = location.pathname;
  const personalPageId = location.state?.personalPageId;
  const [userData, setUserData] = useState({});
  const { idUser, role } = useSelector((state) => state.user);

  const [getProfile, setGetProfile] = useState({});
  const [donationActivities, setDonationActivities] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [statusProject, setStatusProject] = useState("active");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postId, setPostId] = useState("");
  console.log(userData);
  // lấy profile về ảnh
  async function fetchProfile(id) {
    const response = await UserAPI.getProfile(id);
    if (response && response.success === true) {
      console.log(response.data);
      return setGetProfile(response.data);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }
  // Lấy dữ liệu thống kê
  const fetchStats = async (id) => {
    const response = await UserAPI.getStats(id);
    if (response && response.success === true) {
      setUserData(response.stats);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  };

  // Lấy lịch sử hoạt động quyên góp
  const fetchDonationActivities = async (id) => {
    const response = await UserAPI.getDonationActivities(id);
    if (response && response.success === true) {
      setDonationActivities(response.donationActivities);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  };

  async function fetchProjectsByIdUser(id, stat) {
    const query = `?status=${stat}`;
    console.log("hei");
    const response = await UserAPI.getProjectsById(id, query);
    if (response && response.success === true) {
      console.log(response.projects, idUser);
      setFilteredProjects(response.projects);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }
  async function fetchPostsById(id) {
    const response = await UserAPI.getPostsById(id);
    if (response && response.success === true) {
      setFilteredPosts(response.posts);
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
    if (
      (personalPageId &&
        idUser &&
        personalPageId.toString() === idUser.toString()) ||
      (!personalPageId && idUser)
    ) {
      fetchProfile(idUser);
      fetchStats(idUser);
      fetchPostsById(idUser);
      fetchDonationActivities(idUser);
    } else {
      fetchProfile(personalPageId);
      fetchStats(personalPageId);
      fetchPostsById(personalPageId);
      fetchDonationActivities(personalPageId);
    }
  }, [idUser, personalPageId]);
  useEffect(() => {
    if (
      (personalPageId &&
        idUser &&
        personalPageId.toString() === idUser.toString()) ||
      (!personalPageId && idUser)
    ) {
      console.log("idUser");
      fetchProjectsByIdUser(idUser, statusProject);
    } else {
      console.log("personalpage");
      fetchProjectsByIdUser(personalPageId, statusProject);
    }
  }, [idUser, personalPageId, statusProject]);

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log("start");
    const formData = new FormData(e.target);
    console.log("data", idUser);
    const query = `?type=${uploadType}`;
    const response = await UserAPI.patchImage(idUser, formData, query);
    if (response && response.success === true) {
      fetchProfile(idUser);
      uploadType === "avatar" &&
        dispatch(updateAvatar({ avatar: response.image }));

      uploadType === "background" &&
        dispatch(updateBackground({ background: response.image }));
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  };
  // hộp thoại xác nhận xoá bài viết hay không ?
  const handleOpenModal = (id) => {
    setPostId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setPostId("");
    setIsModalOpen(false);
  };
  const deletePost = async () => {
    if (postId) {
      console.log("hey postId");
      const response = await PostAPI.deletePost(postId);
      if (response && response.success === true) {
        console.log("this is true");
        window.alert(response.message);
        // tải lại trang sau khi xoá.
        if (
          personalPageId &&
          idUser &&
          personalPageId.toString() === idUser.toString()
        ) {
          fetchPostsById(idUser);
        } else {
          fetchPostsById(personalPageId);
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
    return;
  };

  return (
    <div className="profile-page position-relative">
      {/* Background & Avatar */}
      <div
        className="profile-header"
        style={{
          backgroundImage: `url("https://final-project-backend-production-c0dc.up.railway.app/${getProfile?.background}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => {
          if (
            personalPageId &&
            personalPageId.toString() === idUser.toString()
          ) {
            setUploadType("background");
            setShowUploadModal(true);
          } else {
            return null;
          }
        }}
      >
        <div
          className="profile-avatar"
          onClick={(e) => {
            if (
              personalPageId &&
              personalPageId.toString() === idUser.toString()
            ) {
              e.stopPropagation();
              setUploadType("avatar");
              setShowUploadModal(true);
            } else {
              return null;
            }
          }}
        >
          <img
            src={`https://final-project-backend-production-c0dc.up.railway.app/${getProfile?.avatar}`}
            alt="Avatar"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div
          className="text-success "
          style={{
            position: "absolute",
            bottom: "-35%",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          {getProfile.role === "partner"
            ? getProfile.organizationName
            : getProfile.username}
        </div>
      </div>

      {getProfile && getProfile.role === "partner" && (
        <Row
          className=" row justify-content-between text-success mx-5 text-start"
          style={{ marginTop: "150px" }}
        >
          <Col md={6} xs={12}>
            <h6>Giới thiệu về tổ chức:</h6>
            {getProfile && getProfile.summary && (
              <div>
                <div
                  style={{
                    margin: "10px auto",
                    textAlign: "justify",
                    lineHeight: "1.7",
                  }}
                >
                  <q>
                    <i>{getProfile.summary}</i>
                  </q>
                </div>
              </div>
            )}
          </Col>
          <Col md={5} xs={12}>
            <h6>Liên hệ:</h6>
            <div className="pe-0">
              <p className="mb-1 font-weight-normal">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-success me-2"
                  style={{ fontSize: "17px" }}
                />
                {getProfile.email}
              </p>
            </div>
            <div className="pe-0">
              <p className="mb-1 font-weight-normal">
                {" "}
                <FontAwesomeIcon
                  icon={faEarthAmericas}
                  className="text-success me-2"
                  style={{ fontSize: "17px" }}
                />
                {getProfile.website}
              </p>
            </div>
            <div className="pe-0">
              <div className="mb-1 font-weight-normal">
                {" "}
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-success me-2"
                  style={{ fontSize: "17px" }}
                />
                {getProfile.addressDetail}, {getProfile.ward},
                {getProfile.district},{getProfile.province}.
              </div>
            </div>
            <div className="pe-0">
              <p className="mb-1 ">
                <FontAwesomeIcon
                  icon={faPhoneFlip}
                  className="text-success me-2"
                  style={{ fontSize: "17px" }}
                />
                {getProfile.phone}
              </p>
            </div>
          </Col>
        </Row>
      )}
      {getProfile && getProfile.role !== "partner" && (
        <div style={{ height: "100px" }}></div>
      )}

      {/* Thống kê */}
      {userData && (
        <div className="stats-grid  bg-white mx-3 border border-success">
          {userData.role === "client" && (
            <>
              <StatCard
                title="Dự án đã quyên góp"
                value={userData.projectsSupportedCount}
              />
              <StatCard title="Bài viết" value={userData.postsCount} />
              <StatCard title="Ủng hộ" value={userData} />
            </>
          )}
          {userData.role === "partner" && (
            <>
              <StatCard title="Dự án" value={userData.projectsCount} />
              <StatCard title="Bài viết" value={userData.postsCount} />
              <StatCard title="Số lượt ủng hộ" value={userData.totalSupports} />
              <StatCard title="Ủng hộ" value={userData} />
            </>
          )}
        </div>
      )}
      {/* DỰ ÁN CỦA PARTNER */}
      {/* {userData.role === "partner" && ( */}
      <div className="project-part" style={{ borderBottom: "none" }}>
        {" "}
        <div
          className=" row mx-0 justify-content-center"
          style={{ marginTop: "50px" }}
        >
          {userData.role === "partner" && (
            <>
              <h5
                className={`col-sm-6 pt-3  project-active ${
                  statusProject === "active" ? "bg-success text-white" : ""
                }`}
                onClick={() => setStatusProject("active")}
              >
                DỰ ÁN ĐANG KÊU GỌI
              </h5>
              <h5
                className={`col-sm-6 pt-3 project-inactive ${
                  statusProject === "inactive" ? "bg-success text-white" : ""
                }`}
                onClick={() => setStatusProject("inactive")}
              >
                DỰ ÁN ĐÃ KẾT THÚC
              </h5>
            </>
          )}
          {userData.role === "client" && (
            <h5
              className="bg-success text-white py-2"
              style={{
                borderTopRightRadius: "20px",
                borderTopLeftRadius: "20px",
              }}
            >
              DỰ ÁN ĐÃ THAM GIA
            </h5>
          )}
        </div>
        <div>
          {filteredProjects.length === 0 && <h5>Không có dự án nào!</h5>}
          {filteredProjects.length > 0 && (
            <ProjectList projects={filteredProjects} />
          )}
        </div>
      </div>
      {/* )} */}
      {/* BÀI VIẾT CỦA PARTNER / CLIENT */}
      {(userData.role === "partner" || userData.role === "client") && (
        <div className="post-part">
          <h5 className="text-center py-2 text-white bg-success"> BÀI VIẾT </h5>
          {filteredPosts.length === 0 && <h5>Không có viết nào!</h5>}
          {filteredPosts.length > 0 && (
            <PostList posts={filteredPosts} clickHandler={handleOpenModal} />
          )}
        </div>
      )}
      {/* Lịch sử hoạt động từ thiện */}

      {userData.role === "client" &&
        (idUser?.toString() === getProfile?._id?.toString() ||
          role === "admin 1" ||
          role === "admin 2") && (
          <div
            className="donation-part"
            style={{ maxHeight: "500px", overflowY: "scroll" }}
          >
            <h5 className="text-center py-2 text-white bg-success">
              HOẠT ĐỘNG QUYÊN GÓP{" "}
            </h5>
            {donationActivities.length === 0 && (
              <h5>Không có hoạt động quyên góp nào!</h5>
            )}
            {donationActivities.length > 0 && (
              <RecentProjects
                className="personal-donation-table"
                detail={donationActivities}
                type="personal-donation"
              />
            )}
          </div>
        )}

      <UploadModal
        show={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
        type={uploadType}
      />
      <Row>
        <DonationModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ConfirmForm
            content="Bạn có chắc chắn muốn xoá bài viết này?"
            onClose={handleCloseModal}
            deleteUser={deletePost}
          />
        </DonationModal>
      </Row>
    </div>
  );
};

export default PersonalPage;
