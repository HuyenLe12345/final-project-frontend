// AdminPersonalPage.js
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProfileForm = lazy(() => import("../../ProfileForm/ProfileForm.jsx"));
const CreatePost = lazy(() => import("../../Posts/PostForm"));
const DonationManagement = lazy(() =>
  import("../Donation Management/DonationManagement.js")
);
const ProjectForm = lazy(() =>
  import("../Project/Project Form/ProjectForm.js")
);
const PersonalPage = lazy(() =>
  import("../Admin page/PersonalPage/PersonalPage.js")
);

function PartnerPersonalPage() {
  return (
    <div className="container-fluid admin-page  bg-success">
      <div className="row justify-content-center">
        <div className="col-lg-2 col-1 text-white">
          <Sidebar />
        </div>
        <div className="col-lg-10 col-11">
          <Suspense
            fallback={<div style={{ marginTop: "70px" }}>...Loading</div>}
          >
            <Routes>
              <Route path="personal-page" element={<PersonalPage />} />
              <Route path="profile" element={<ProfileForm />} />
              <Route path="create-post" element={<CreatePost />} />

              <Route path="posts/:postId/edit" element={<CreatePost />} />
              <Route path="profile/" element={<ProfileForm />} />

              <Route path="project-form" element={<ProjectForm />} />
              <Route
                path="projects/edit/:projectId"
                element={<ProjectForm />}
              />
              <Route
                path="donation-management"
                element={<DonationManagement />}
              />
              <Route
                path="*"
                element={<Navigate to="/admin/personal-page" replace />}
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default PartnerPersonalPage;
