import React from "react";
import { Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";
const Sidebar = lazy(() => import("../Admin page/Sidebar.js"));
const ProfileForm = lazy(() => import("../../ProfileForm/ProfileForm.jsx"));
const CreatePost = lazy(() => import("../../Posts/PostForm.js"));
const PersonalPage = lazy(() =>
  import("../Admin page/PersonalPage/PersonalPage.js")
);
function ClientPage() {
  return (
    <div className="container-fluid admin-page  bg-success">
      <div className="row">
        <div className="col-md-2 pe-0 text-white">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Suspense
            fallback={<div style={{ marginTop: "70px" }}>...Loading</div>}
          >
            <Routes>
              <Route path="personal-page" element={<PersonalPage />} />
              <Route path="profile" element={<ProfileForm />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route path="posts/:postId/edit" element={<CreatePost />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ClientPage;
