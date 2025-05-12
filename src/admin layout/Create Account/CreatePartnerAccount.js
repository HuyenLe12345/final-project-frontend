import React, { useEffect, useState } from "react";
import ProvinceAPI from "../../API/ProvinceAPI.jsx";
import { useNavigate } from "react-router-dom";

import FormGroup from "../../FormGroup/FormGroup.js";
import Card from "../../Shared/Card.js";
import {
  handleChangeAndFetch,
  fetchDistrictWard,
  fetchProvinces,
} from "../../Shared/handleChangeAndFetch.js";
import AdminAPI from "../../API/AdminAPI.jsx";
import "../Project/Project Form/projectform.css";

const CreatePartnerAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorEmailDetail, setErrorEmailDetail] = useState(""); // nội dung lỗi email nếu có
  const [errorPasswordDetail, setErrorPasswordDetail] = useState(""); // nội dung lỗi password
  const [errorConfirmPasswordDetail, setErrorConfirmPasswordDetail] =
    useState("");
  const [errorOrganizationName, setErrorOrganizationName] = useState("");

  const [provinces, setProvinces] = useState([
    {
      id: String(Math.random()),
      value: "",
      label: "Tỉnh, Thành phố",
    },
  ]);
  const [chosenProvince, setChosenProvince] = useState("");
  const [districts, setDistricts] = useState([
    {
      id: String(Math.random()),
      value: "",
      label: "Quận, Huyện",
    },
  ]);
  const [chosenDistrict, setChosenDistrict] = useState("");
  const [wards, setWards] = useState([
    {
      id: String(Math.random()),
      value: "",
      label: "Xã, Phường",
    },
  ]);
  const [chosenWard, setChosenWard] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [website, setWebsite] = useState("");
  // xử lý  việc thay đổi province,city
  const handleProvinceChange = (e) => {
    handleChangeAndFetch(
      e,
      "Quận, Huyện",
      chosenProvince,
      setChosenProvince,
      ProvinceAPI.postDistricts,
      { value: e.target.value },
      setDistricts
    );
    console.log("districts", districts);
  };
  // xử lý việc thay đổi district
  const handleDistrictChange = (e) => {
    const districtData = {
      provinceName: chosenProvince,
      districtName: e.target.value,
    };
    handleChangeAndFetch(
      e,
      "Phường, Xã",
      chosenDistrict,
      setChosenDistrict,
      ProvinceAPI.postWards,
      districtData,
      setWards
    );
  };
  useEffect(() => {
    async function fetchProvince() {
      await fetchProvinces(
        ProvinceAPI.getProvinces,
        "Tỉnh, Thành phố",
        setProvinces
      );
    }
    fetchProvince();
  }, []);
  const createHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const response = await AdminAPI.createAccountPartner(data);
    console.log("This is response", response.errors);

    if (response && response.status === 400) {
      const err = response.errors;
      setErrorEmail(false);
      setErrorPassword(false);
      setErrorConfirmPassword(false);
      setErrorEmailDetail("");
      setErrorPasswordDetail("");
      setErrorConfirmPasswordDetail("");
      setErrorOrganizationName("");

      for (let i = 0; i < err.length; i++) {
        if (err[i].path === "email") {
          setErrorEmail(true);
          setErrorEmailDetail(err[i].msg);
        }

        if (err[i].path === "password") {
          setErrorPassword(true);
          setErrorPasswordDetail(err[i].msg);
        }
        if (err[i].path === "confirm") {
          setErrorConfirmPassword(true);
          setErrorConfirmPasswordDetail(err[i].msg);
        }
        if (err[i].path === "organizationName") {
          setErrorOrganizationName(err[i].msg);
        }
      }
      await fetchProvinces(
        ProvinceAPI.getProvinces,
        "Tỉnh, Thành phố",
        setProvinces
      );
      if (chosenProvince) {
        await fetchDistrictWard(
          ProvinceAPI.postDistricts,
          { value: chosenProvince },
          "Quận, Huyện",
          setDistricts
        );
        if (chosenDistrict) {
          console.log("info.district");
          setChosenDistrict(chosenDistrict);
          await fetchDistrictWard(
            ProvinceAPI.postWards,
            { provinceName: chosenProvince, districtName: chosenDistrict },
            "Phường, Xã",
            setWards
          );
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
      setPassword("");
      setConfirmPassword("");
      setErrorEmail(false);
      setErrorPassword(false);
      setErrorConfirmPassword(false);
      setErrorEmailDetail("");
      setErrorPasswordDetail("");
      setErrorConfirmPasswordDetail("");
      setErrorOrganizationName("");
      setProvinces([
        {
          id: String(Math.random()),
          value: "",
          label: "Tỉnh, Thành phố",
        },
      ]);
      setChosenProvince("");
      setDistricts([
        {
          id: String(Math.random()),
          value: "",
          label: "Quận, Huyện",
        },
      ]);
      setChosenDistrict("");
      setWards([
        {
          id: String(Math.random()),
          value: "",
          label: "Xã, Phường",
        },
      ]);
      setChosenWard("");
      setAddressDetail("");
      setWebsite("");
      setOrganizationName("");
      setPhone("");
    }
  };

  return (
    <Card formName="layout-form" formTitle="TẠO TÀI KHOẢN ĐỐI TÁC">
      <form
        method="POST"
        onSubmit={createHandler}
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="col-sm-6 pt-3 column-1">
            <FormGroup
              label="Tên tổ chức"
              type="text"
              id="organizationName"
              name="organizationName"
              className="form-control"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
            />
            {errorOrganizationName && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errorOrganizationName}
              </p>
            )}
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
              <p style={{ color: "red", fontSize: "12px" }}>
                {errorEmailDetail}
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
            <FormGroup
              label="Điện thoại"
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />{" "}
          </div>
          <div className="col-sm-6 pt-3 column-2">
            <h6 className="pb-2">
              Địa chỉ:<sup className="text-danger">*</sup>
            </h6>
            <FormGroup
              value={chosenProvince}
              type="select"
              id="province"
              name="province"
              className="form-control"
              sharedName="provinces"
              onChange={handleProvinceChange}
              options={provinces}
              required
            />
            <FormGroup
              value={chosenDistrict}
              type="select"
              id="district"
              name="district"
              className="form-control"
              sharedName="provinces"
              onChange={handleDistrictChange}
              options={districts}
              required
            />
            <FormGroup
              value={chosenWard}
              type="select"
              id="ward"
              name="ward"
              className="form-control"
              sharedName="provinces"
              onChange={(e) => setChosenWard(e.target.value)}
              options={wards}
              required
            />
            <FormGroup
              type="text"
              id="addressDetail"
              name="addressDetail"
              className="form-control"
              sharedName="provinces"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              placeholder="Số nhà và tên đường"
              required
            />
            <FormGroup
              type="text"
              label="Đường dẫn website của tổ chức:"
              id="website"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Đường dẫn đến trang web của tổ chức"
              required
            />

            <FormGroup
              label="Mã QR ngân hàng:"
              type="file"
              id="linkQR"
              name="linkQR"
              sharedName="line linkQR"
              required
            />
            <FormGroup
              label="Hình đại diện:"
              type="file"
              id="avatar"
              name="avatar"
              sharedName="line"
              required
            />
            <FormGroup
              label="Hình nền:"
              type="file"
              id="background"
              name="background"
              sharedName="line"
              required
            />
          </div>
          <p>
            <small>
              <span>Lưu ý:</span> Mục (<span className="text-danger">*</span>):
              không được để trống.
            </small>
          </p>
          <div className="container-button">
            <button type="submit" className="btn btn-success text-center px-5">
              Tạo
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CreatePartnerAccount;
