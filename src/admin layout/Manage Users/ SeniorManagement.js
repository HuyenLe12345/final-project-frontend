import React, { useState, useEffect } from "react";
import UserManagement from "./UserManagement";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

const SeniorManagement = () => {
  const pagination = {
    page: "1",
    count: "10",
    searchStatus: "active",
    searchContent: "",
    searchTypeOfSenior: "partner",
  };
  const { role } = useSelector((state) => state.user);
  const [options, setOptions] = useState([
    { value: "partner", label: "Đối tác" },
  ]);
  useEffect(() => {
    if (role && role === "admin 1") {
      setOptions([
        { value: "admin", label: "Admin" },
        { value: "partner", label: "Đối tác" },
      ]);
    } else if (role && role === "admin 2") {
      setOptions([{ value: "partner", label: "Đối tác" }]);
    }
  }, [role]);

  return (
    <Container className="pc-container bg-white rounded p-4">
      <h4 className="title-dashboard">Quản lý cấp cao</h4>

      <UserManagement
        options={options}
        type="senior"
        paginationOnSeniorPage={pagination}
      />
    </Container>
  );
};

export default SeniorManagement;
