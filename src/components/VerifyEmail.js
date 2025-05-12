import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

import UserAPI from "../API/UserAPI";
const VerifyEmail = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [redirect, setRedirect] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await UserAPI.getVerifyEmail(token);
        if (response && response.status === 400) {
          setMessage(response.errors);
        } else if (response && response.status === 500) {
          navigate("/error-page", {
            state: { status: "500", errors: response.errors },
          });
        } else {
          console.log(response);
          setMessage(response.message);
          setTimeout(() => {
            setRedirect(true);
          }, 2000);
        }
      } catch {
        setMessage("Verification failed. The link may have expired.");
      }
    };
    if (token) {
      verify();
    }
  }, [token]);

  return (
    <div
      style={{
        height: "400px",
        color: "red",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "150px",
          backgroundColor: "white",
          border: "2px solid green",
          borderRadius: "40px",
          margin: "20px auto",
          paddingTop: "20px",
        }}
      >
        <h2> Thông báo</h2>
        <p>{message}</p>
        {redirect && <Navigate to="/sign-in" replace />}
      </div>
    </div>
  );
};
export default VerifyEmail;
