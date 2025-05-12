import { useState } from "react";
import FormGroup from "../../FormGroup/FormGroup";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import AdminAPI from "../../API/AdminAPI";

const CreateAdminAccount = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorEmailDetail, setErrorEmailDetail] = useState(""); // nội dung lỗi email nếu có
  const [errorUsernameDetail, setErrorUsernameDetail] = useState(""); //nội dung lỗi username nếu có
  const [errorPasswordDetail, setErrorPasswordDetail] = useState(""); // nội dung lỗi password
  const [errorConfirmPasswordDetail, setErrorConfirmPasswordDetail] =
    useState("");

  const createHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const response = await AdminAPI.createAccountAdmin(data);

    if (response && response.status === 400) {
      const err = response.errors;
      setErrorEmail(false);
      setErrorUsername(false);
      setErrorPassword(false);
      setErrorConfirmPassword(false);
      setErrorEmailDetail("");
      setErrorUsernameDetail("");
      setErrorPasswordDetail("");
      setErrorConfirmPasswordDetail("");

      for (let i = 0; i < err.length; i++) {
        if (err[i].path === "email") {
          setErrorEmail(true);
          setErrorEmailDetail(err[i].msg);
        }
        if (err[i].path === "username") {
          setErrorUsername(true);
          setErrorUsernameDetail(err[i].msg);
        }
        if (err[i].path === "password") {
          setErrorPassword(true);
          setErrorPasswordDetail(err[i].msg);
        }
        if (err[i].path === "confirm") {
          setErrorConfirmPassword(true);
          setErrorConfirmPasswordDetail(err[i].msg);
        }
      }
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    } else if (response && response.success === true) {
      console.log("here");
      window.alert("Tạo tài khỏan thành công");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setUserRole("");
      setErrorEmail(false);
      setErrorUsername(false);
      setErrorPassword(false);
      setErrorConfirmPassword(false);
      setErrorEmailDetail("");
      setErrorUsernameDetail("");
      setErrorPasswordDetail("");
      setErrorConfirmPasswordDetail("");
    }
  };

  return (
    <div className="auth-wrapper mt-4 py-5">
      <div className="auth-inner">
        <form method="POST" onSubmit={createHandler}>
          <h3 className="text-success">TẠO TÀI KHOẢN ADMIN</h3>
          <FormGroup
            type="email"
            label="Email"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errorEmail && (
            <p style={{ color: "red", fontSize: "12px" }}>{errorEmailDetail}</p>
          )}
          <FormGroup
            type="text"
            label="Tên người dùng"
            id="username"
            name="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errorUsername && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errorUsernameDetail}
            </p>
          )}
          <FormGroup
            type="password"
            label="Mật khẩu"
            id="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorPassword && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errorPasswordDetail}
            </p>
          )}
          <FormGroup
            type="password"
            label="Xác nhận mật khẩu"
            id="confirm"
            name="confirm"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorConfirmPassword && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errorConfirmPasswordDetail}
            </p>
          )}
          <small>
            <span>Lưu ý:</span> Mục (<span className="text-danger">*</span>):
            không được để trống.
          </small>
          <Button type="submit" className="btn btn-success w-100 mt-3 px-4">
            Tạo
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminAccount;
