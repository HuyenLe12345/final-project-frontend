import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

const ErrorPage = () => {
  const location = useLocation(); // Initialize useLocation
  const error = location.state?.errors; // Access the error from the state
  const status = location.state?.status;
  useEffect(() => {
    document.title = "Lỗi | Donation";
  }, []);

  return (
    <div
      style={{
        width: "95%",
        height: "400px",
        backgroundColor: "white",
        borderRadius: "40px",
        textAlign: "center",
        margin: "80px auto",
        marginBottom: "30px",
        fontSize: "30px",
        color: "gray",
      }}
    >
      {error ? (
        <div>
          <h3>Error:{status || ""}</h3>
          <p>{error || "An unexpected error occurred."}</p>
        </div>
      ) : (
        <p>No errors to display.</p>
      )}
    </div>
  );
};

export default ErrorPage;
