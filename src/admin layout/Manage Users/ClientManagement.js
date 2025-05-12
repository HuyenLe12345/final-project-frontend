import UserManagement from "./UserManagement";
import { Container } from "react-bootstrap";
const ClientManagement = () => {
  const pagination = {
    page: "1",
    count: "10",
    searchStatus: "active",
    searchContent: "",
  };
  const options = [{ value: "partner", label: "Đối tác" }];
  return (
    <Container className="pc-container bg-white rounded p-4">
      <h4 className="title-dashboard">Quản lý người dùng</h4>
      <UserManagement
        options={options}
        type="client"
        paginationOnSeniorPage={pagination}
      />
      ;
    </Container>
  );
};

export default ClientManagement;
