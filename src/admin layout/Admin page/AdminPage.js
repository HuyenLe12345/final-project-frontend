// AdminPersonalPage.js
import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("../Dashboard/Dashboard.js"));
const ProfileForm = lazy(() => import("../../ProfileForm/ProfileForm.jsx"));
const CreatePost = lazy(() => import("../../Posts/PostForm"));
const CreateAdminAccount = lazy(() =>
  import("../Create Account/CreateAdminAccount.js")
);
const CreatePartnerAccount = lazy(() =>
  import("../Create Account/CreatePartnerAccount.js")
);

const ProjectForm = lazy(() =>
  import("../Project/Project Form/ProjectForm.js")
);
const ClientManagement = lazy(() =>
  import("../Manage Users/ClientManagement.js")
);
const SeniorManagement = lazy(() =>
  import("../Manage Users/ SeniorManagement.js")
);
const PersonalPage = lazy(() =>
  import("../Admin page/PersonalPage/PersonalPage.js")
);
const DonationManagement = lazy(() =>
  import("../Donation Management/DonationManagement.js")
);

function AdminPersonalPage() {
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
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="personal-page" element={<PersonalPage />} />
              <Route path="profile/" element={<ProfileForm />} />
              <Route path="posts/:postId/edit" element={<CreatePost />} />
              <Route path="profile" element={<ProfileForm />} />

              <Route path="project-form" element={<ProjectForm />} />
              <Route
                path="projects/edit/:projectId"
                element={<ProjectForm />}
              />
              <Route path="user-management/:userId" element={<ProfileForm />} />

              <Route
                path="user-management/client"
                element={<ClientManagement />}
              />
              <Route
                path="user-management/senior"
                element={<SeniorManagement />}
              />
              <Route
                path="create-account/admin"
                element={<CreateAdminAccount />}
              />

              <Route
                path="create-account/partner"
                element={<CreatePartnerAccount />}
              />
              <Route
                path="donation-management"
                element={<DonationManagement />}
              />
              <Route
                path="*"
                element={<Navigate to="/admin/dashboard" replace />}
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AdminPersonalPage;
