import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Nav from "./Navigation/nav";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "./components/Footer/Footer";
const Login = lazy(() => import("./components/login"));
const SignUp = lazy(() => import("./components/signup"));
const VerifyEmail = lazy(() => import("./components/VerifyEmail"));
const ProfileForm = lazy(() => import("./ProfileForm/ProfileForm"));
const ProjectDetail = lazy(() =>
  import("./admin layout/Project/ProjectDetail/ProjectDetail")
);
const AdminPersonalPage = lazy(() =>
  import("./admin layout/Admin page/AdminPage")
);
const PartnerPersonalPage = lazy(() =>
  import("./admin layout/Admin page/PartnerPage.js")
);
const ClientPage = lazy(() => import("./admin layout/Client Page/ClientPage"));
const ProjectPage = lazy(() =>
  import("./admin layout/Project/Project Page/ProjectPage")
);
const PostDetail = lazy(() => import("./Posts/PostDetail"));
const PersonalPage = lazy(() =>
  import("./admin layout/Admin page/PersonalPage/PersonalPage")
);
const PostPage = lazy(() => import("./Posts/PostPage"));
const HomePage = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const ErrorPage = lazy(() => import("./components/ErrorPage"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword.js"));
const ResetPassword = lazy(() => import("./components/ResetPassword.js"));

// Add ProtectedRoute component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, idUser } = useSelector((state) => state.user);
  console.log(role, idUser);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (role && idUser) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{ marginTop: "70px", height: "500px", textAlign: "center" }}>
        loading...
      </div>
    );
  }
  if (!idUser) return <Navigate to="/sign-in" />;
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};
function App() {
  return (
    <div className="App">
      <Nav />
      <Suspense
        fallback={
          <div style={{ marginTop: "100px", color: "white" }}>Loading...</div>
        }
      >
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/profile/:userId" element={<ProfileForm />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:contentId" element={<ProjectDetail />} />
          <Route path="/quy/:organizationName" element={<PersonalPage />} />
          <Route path="/taikhoan/:name" element={<PersonalPage />} />
          {/* Admin/Partner routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin 1", "admin 2"]}>
                <AdminPersonalPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/partner/*"
            element={
              <ProtectedRoute allowedRoles={["partner"]}>
                <PartnerPersonalPage />
              </ProtectedRoute>
            }
          />

          {/* Client routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientPage />
              </ProtectedRoute>
            }
          />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/posts/:contentId" element={<PostDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/error-page" element={<ErrorPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
export default App;
