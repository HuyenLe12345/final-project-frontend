import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ProvinceAPI from "../API/ProvinceAPI.jsx";
import UserAPI from "../API/UserAPI.jsx";
import FormGroup from "../FormGroup/FormGroup.js";
import Card from "../Shared/Card.js";
import {
  handleChangeAndFetch,
  fetchDistrictWard,
  fetchProvinces,
} from "../Shared/handleChangeAndFetch.js";
import "../admin layout/Project/Project Form/projectform.css";

const ProfileForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileId = location.state?.profileId;
  console.log("profileForm", location);
  const idUser = useSelector((state) => state.user.idUser);

  const role = useSelector((state) => state.user.role);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [summary, setSummary] = useState("");
  const [roleInProfile, setRoleInProfile] = useState("");
  const [status, setStatus] = useState("");
  const [errorName, setErrorName] = useState("");
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
  const [addressDetail, setAddressDetail] = useState("Số nhà và tên đường");
  const [websiteLink, setWebsiteLink] = useState("");
  const [linkQR, setLinkQR] = useState("");
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
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
    async function fetchProfile(id) {
      const response = await UserAPI.getProfile(id);
      if (response && response.data) {
        const info = response.data;
        console.log(info);
        setErrorName("");
        setUsername(info.username || "");
        setEmail(info.email || "");
        setFullname(info.fullname || "");
        setGender(info.gender || "");
        setPhone(info.phone || "");
        setSummary(info.summary || "");
        setOrganizationName(info.organizationName || "");
        setAddressDetail(info.addressDetail || "");
        setWebsiteLink(info.website || "");
        setRoleInProfile(info.role || "");
        setStatus(info.status || "");
        setLinkQR(info.linkQR || "");
        setAvatar(info.avatar || "");
        setBackground(info.background || "");
        await fetchProvinces(
          ProvinceAPI.getProvinces,
          "Tỉnh, Thành phố",
          setProvinces
        );

        if (info.province) {
          console.log("info.province");
          setChosenProvince(info.province);
          await fetchDistrictWard(
            ProvinceAPI.postDistricts,
            { value: info.province },
            "Quận, Huyện",
            setDistricts
          );
          if (info.district) {
            console.log("info.district");
            setChosenDistrict(info.district);
            await fetchDistrictWard(
              ProvinceAPI.postWards,
              { provinceName: info.province, districtName: info.district },
              "Phường, Xã",
              setWards
            );
            if (info.ward) {
              setChosenWard(info.ward);
            }
          }
        } else {
          return;
        }
      } else if (
        response &&
        (response.status === 500 || response.status === 404)
      ) {
        navigate("/error-page", {
          state: { status: response.status, errors: response.errors },
        });
      }
    }
    if (idUser && profileId && idUser.toString() !== profileId.toString()) {
      console.log("profileId", profileId);
      fetchProfile(profileId);
    } else {
      console.log(idUser, profileId);
      fetchProfile(idUser);
    }
  }, []);
  console.log(role, roleInProfile);
  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorName("");
    console.log("lấy đata");
    const data = new FormData(e.target);
    const response = await UserAPI.postUpdatePersonalInfo(idUser, data);

    if (response && response.success === true) {
      window.alert("Bạn đã cập nhật thành công!");
    } else if (response && response.success === false) {
      setErrorName(response.message);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  };
  console.log(
    role,
    role !== "admin 1",
    role !== "admin 2",
    !avatar,
    role && role !== "amdin 1" && role !== "admin 2" && !avatar
  );
  return (
    <Card formName="layout-form" formTitle="THÔNG TIN CÁ NHÂN">
      <form
        method="POST"
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="col-sm-6 pt-3 column-1">
            {roleInProfile !== "partner" && (
              <>
                <FormGroup
                  label="Tên người dùng"
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {errorName && (
                  <p className="text-danger">
                    <small>{errorName}</small>
                  </p>
                )}
              </>
            )}
            {roleInProfile === "partner" && (
              <>
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
                {errorName && (
                  <p className="text-danger">
                    <small>{errorName}</small>
                  </p>
                )}
              </>
            )}
            <FormGroup
              label="Email"
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={role === "client" || role === "partner"}
              required
            />
            {(roleInProfile === "client" ||
              roleInProfile === "admin 2" ||
              roleInProfile === "admin 1") && (
              <FormGroup
                label="Họ và tên"
                type="text"
                id="fullname"
                name="fullname"
                className="form-control"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required={role && role !== "admin 1" && role !== "admin 2"}
              />
            )}
            <FormGroup
              label="Điện thoại"
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required={role && role !== "admin 1" && role !== "admin 2"}
            />{" "}
            {roleInProfile === "partner" && (
              <>
                <FormGroup
                  type="text"
                  label="Đường dẫn website của tổ chức:"
                  id="website"
                  name="website"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                  placeholder="Đường dẫn đến trang web của tổ chức"
                  required
                />
                <FormGroup
                  value={summary}
                  label="Tóm tắt về tổ chức"
                  type="textarea"
                  id="summary"
                  name="summary"
                  className="form-control"
                  rows="6"
                  onChange={(e) => setSummary(e.target.value)}
                />
              </>
            )}
          </div>
          <div className="col-sm-6 pt-3 column-2">
            <h6 className="pb-2">
              Địa chỉ: <sup className="text-danger">*</sup>
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
              required={role && role !== "admin 1" && role !== "admin 2"}
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
              required={role && role !== "admin 1" && role !== "admin 2"}
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
              required={role && role !== "admin 1" && role !== "admin 2"}
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
              required={role && role !== "admin 1" && role !== "admin 2"}
            />
            {(roleInProfile === "admin 1" ||
              roleInProfile === "admin 2" ||
              roleInProfile === "client") && (
              <FormGroup
                value={gender}
                label="Giới tính"
                type="select"
                id="gender"
                name="gender"
                className="form-control"
                sharedName="category gender"
                onChange={(e) => setGender(e.target.value)}
                options={[
                  { value: "", label: "Chọn" },
                  { value: "Female", label: "Nữ" },
                  { value: "Male", label: "Nam" },
                  { value: "Other", label: "Khác" },
                ]}
              />
            )}

            {(role === "admin 1" || role === "admin 2") &&
              roleInProfile === "partner" && (
                <>
                  <FormGroup
                    label="Mã QR ngân hàng:"
                    type="file"
                    id="linkQR"
                    name="linkQR"
                    sharedName="line linkQR"
                    required={!linkQR}
                  />
                </>
              )}
            <FormGroup
              label="Hình đại diện:"
              type="file"
              id="avatar"
              name="avatar"
              sharedName="line"
              required={
                role && role !== "admin 1" && role !== "admin 2" && !avatar
              }
            />
            <FormGroup
              label="Hình nền:"
              type="file"
              id="background"
              name="background"
              sharedName="line"
              required={
                role && role !== "admin 1" && role !== "admin 2" && !background
              }
            />
            {(role === "admin 1" || role === "admin 2") && (
              <FormGroup
                value={status}
                label="Trạng thái"
                type="select"
                id="status"
                name="status"
                className="form-control"
                sharedName="category status"
                onChange={(e) => setStatus(e.target.value)}
                options={[
                  { value: "hoạt động", label: "Hoạt động" },
                  { value: "dừng hoạt động", label: "Dừng hoạt động" },
                ]}
              />
            )}
            <input
              type="hidden"
              name="userId"
              value={
                profileId && profileId.toString() !== idUser.toString()
                  ? profileId
                  : idUser
              }
            />
          </div>
          <p>
            <small>
              <span>Lưu ý:</span> Mục (<span className="text-danger">*</span>
              ): không được để trống.
            </small>
          </p>
          <div className="container-button">
            <button type="submit" className="btn btn-success text-center">
              Cập nhật
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ProfileForm;
