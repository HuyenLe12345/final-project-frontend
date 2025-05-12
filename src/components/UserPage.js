// ProfilePage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import UserAPI from "../API/UserAPI.jsx";
import UploadModal from "../admin layout/Admin page/PersonalPage/UploadModal.js";
import StatCard from "../admin layout/Admin page/PersonalPage/StatCard.js";
import ProjectList from "../admin layout/Project/Project Page/ProjectList.js";
import PostList from "../Posts/PostList";
import RecentProjects from "../admin layout/Dashboard/components/RecentProjects.js";
import { updateAvatar, updateBackground } from "../store/user.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhoneFlip } from "@fortawesome/free-solid-svg-icons";
const UserPage = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const location = useLocation();
  console.log(location);
  const idUser = location.state?.idUser;

  const idClient = useSelector((state) => state.user.idUser);
  const [donationActivities, setDonationActivities] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [statusProject, setStatusProject] = useState("active");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  console.log("idUser", idUser);
  // Lấy dữ liệu thống kê
  useEffect(() => {
    const fetchStats = async () => {
      const res = await UserAPI.getStats(idUser);
      setUserData(res.stats);
    };
    fetchStats();
  }, [idUser]);

  // Lấy lịch sử hoạt động quyên góp
  useEffect(() => {
    const fetchDonationActivities = async () => {
      const response = await UserAPI.getDonationActivities(idUser);
      if (response && response.success === true) {
        setDonationActivities(response.donationActivities);
      } else {
        return null;
      }
    };
    fetchDonationActivities();
  }, [idUser]);
  async function fetchProjectsByIdUser(stat) {
    const query = `?status=${stat}`;
    const response = await UserAPI.getProjectsById(idUser, query);
    if (response && response.success === true) {
      setFilteredProjects(response.projects);
    }
  }
  useEffect(() => {
    fetchProjectsByIdUser(statusProject);
  }, [idUser, statusProject]);
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = `?type=${uploadType}`;
    const response = await UserAPI.patchImage(idUser, formData, query);
    if (response && response.success === true) {
      uploadType === "avatar" &&
        dispatch(updateAvatar({ avatar: response.image }));
      uploadType === "background" &&
        dispatch(updateBackground({ background: response.imag }));
    }
  };
  useEffect(() => {
    async function fetchPostsById() {
      const response = await UserAPI.getPostsById(idUser);
      if (response && response.success === true) {
        console.log(response.posts);
        setFilteredPosts(response.posts);
      }
    }
    fetchPostsById();
  }, [idUser]);
  useEffect(() => {
    document.title = "Tài khoản người dùng | Donation";
  }, []);

  return (
    <div className="profile-page">
      {/* Background & Avatar */}
      <div
        className="profile-header"
        style={{
          backgroundImage: `url(https://final-project-backend-production-c0dc.up.railway.app/${userData.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => {
          if (idClient.toString === idUser.toString()) {
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
            if (idClient.toString === idUser.toString()) {
              e.stopPropagation();
              setUploadType("avatar");
              setShowUploadModal(true);
            } else {
              return null;
            }
          }}
        >
          <img src={`https://final-project-backend-production-c0dc.up.railway.app/${userData.avatar}`} alt="Avatar" />
        </div>
      </div>
      {userData &&
        userData.email &&
        userData.phone &&
        userData.role === "partner" && (
          <div className="row gap-3 justify-content-between mx-3 mt-1">
            <div className="col-md-6  col-12 row justify-content-start align-items-center text-center pe-5 text-success ">
              <div className="col-md-3 pe-0">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-success"
                  style={{ fontSize: "50px" }}
                />
              </div>
              <div className="col-md-6 text-start">
                <h6 className="mb-1">Email:</h6>
                <p className="mb-0">{userData.email}</p>
              </div>
            </div>
            <div className="col-md-5 col-12 row  justify-content-end align-items-center text-success">
              <div className="col-sm-6 text-end">
                <h6 className="mb-1">Điện thoại:</h6>
                <p className="mb-0">{userData.phone}</p>
              </div>
              <div className="col-sm-4  text-start ps-0">
                <FontAwesomeIcon
                  icon={faPhoneFlip}
                  className="text-success"
                  style={{ fontSize: "35px" }}
                />
              </div>
            </div>
          </div>
        )}
      {userData && userData.role !== "partner" && (
        <div style={{ height: "100px" }}></div>
      )}
      <h4>{userData.username}</h4>
      {userData && userData.summary && (
        <q>
          <i>{userData.summary}</i>
        </q>
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
      {userData.role === "partner" && (
        <div className="project-part">
          {" "}
          <div
            className=" row mx-0 justify-content-center"
            style={{ marginTop: "50px" }}
          >
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
              DỰ ÁN ĐANG ĐÃ KẾT THÚC
            </h5>
          </div>
          {filteredProjects.length === 0 && <h3>Không có dự án nào!</h3>}
          {filteredProjects.length > 0 && (
            <ProjectList projects={filteredProjects} />
          )}
        </div>
      )}
      {/* BÀI VIẾT CỦA PARTNER / CLIENT */}
      {(userData.role === "partner" || userData.role === "client") && (
        <div className="post-part">
          <h5 className="text-center py-2 text-white bg-success"> BÀI VIẾT </h5>
          {filteredPosts.length === 0 && <h3>Không có viết nào!</h3>}
          {filteredPosts.length > 0 && <PostList posts={filteredPosts} />}
        </div>
      )}
      {/* Lịch sử hoạt động từ thiện */}
      {userData.role === "client" && (
        <div className="donation-part">
          <h5 className="text-center py-2 text-white bg-success">
            HOẠT ĐỘNG QUYÊN GÓP{" "}
          </h5>
          {donationActivities.length === 0 && (
            <h3>Không có hoạt động quyên góp nào!</h3>
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
      {/* Lịch sử hoạt động */}
      {/* <div className="activity-list">
        {activities.map((activity) => (
          <ActivityItem key={activity._id} activity={activity} />
        ))}
      </div> */}

      <UploadModal
        show={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
        type={uploadType}
      />
    </div>
  );
};

export default UserPage;
