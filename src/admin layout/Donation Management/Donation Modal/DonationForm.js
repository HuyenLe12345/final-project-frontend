import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import FormGroup from "../../../FormGroup/FormGroup";
import DonationAPI from "../../../API/DonationAPI";
import UserAPI from "../../../API/UserAPI";

const DonationForm = ({ name, onClose, typeOfDona }) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.idUser);
  const { contentId } = useParams();
  console.log("proẹctId", contentId);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [typeOfDonation, setTypeOfDonation] = useState(!userId ? "money" : "");
  const [options, setOptions] = useState([{ value: "money", label: "Tiền" }]);
  const [linkQR, setLinkQR] = useState("");
  const [transactionCode, setTransactionCode] = useState("");
  const [donationId, setDonationId] = useState(null);
  const [registeredTransport, setRegisteredTransport] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      typeOfDonation &&
      (typeOfDonation === "book" || typeOfDonation === "clothes")
    ) {
      if (registeredTransport === "") {
        window.alert("Bạn cần chọn hình thức vận chuyển đồ quyên góp");
        return;
      } else if (registeredTransport === "house" && !address) {
        window.alert("Vui lòng nhập địa chỉ để đăng ký thu gom tại nhà.");
        return;
      }
    }

    // Handle form data submission logic here
    const data = new FormData(e.target);
    const response = await DonationAPI.submitDonationInfo(contentId, data);
    if (response && response.success === true) {
      if (response.linkQR) {
        setLinkQR(response.linkQR);
        setTransactionCode(response.transactionCode);
        setDonationId(response.donationId);
      } else {
        window.alert("Bạn đã đăng ký ủng hộ thành công");
        onClose();
      }
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  };
  useEffect(() => {
    async function fetchUserData() {
      if (!userId) return null;
      if (userId) {
        const query = `?type=profile`;
        const response = await UserAPI.getPersonalInfo(query);
        if (response && response.success) {
          const user = response.data;
          console.log(user);
          setFullname(user.fullname);
          setEmail(user.email);
          setPhone(user.phone);
          if (
            user.addressDetail &&
            user.ward &&
            user.district &&
            user.province
          ) {
            const add = `${user.addressDetail},${user.ward}, ${user.district}, ${user.province}`;
            setAddress(add);
          } else {
            setAddress("");
          }
          if (userId && typeOfDona) {
            const options = typeOfDona.map((type) => ({
              value: type,
              label:
                type === "money"
                  ? "Tiền"
                  : type === "clothes"
                  ? "Quần áo"
                  : "Sách",
            }));
            options.unshift({ value: "", label: "Chọn hình thức" });
            console.log(options);
            setOptions(options);
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
    }
    fetchUserData();
  }, []);
  const deleteDonation = async () => {
    if (donationId) {
      const response = await DonationAPI.deleteDonationInfo(donationId);
      if (response && response.success === true) {
        onClose();
      } else if (
        response &&
        (response.status === 500 || response.status === 404)
      ) {
        navigate("/error-page", {
          state: { status: response.status, errors: response.errors },
        });
      }
    }
  };
  return (
    <div className="donation-form">
      <div className="text-end" onClick={onClose}>
        <span className="text-danger"> X </span>
      </div>
      {!linkQR && (
        <form method="POST" onSubmit={handleSubmit}>
          {" "}
          <h5 className="text-center text-success my-0">THÔNG TIN ỦNG HỘ </h5>
          <Row>
            <Col md={6} sm={12}>
              <FormGroup
                type="text"
                label="Họ và tên người ủng hộ:"
                id="fullname"
                name="donorName"
                sharedName="my-1"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="form-control"
                required
              />
            </Col>
            <Col md={6} sm={12}>
              <FormGroup
                type="email"
                label="Địa chỉ email:"
                id="email"
                name="email"
                value={email}
                sharedName="my-1"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <FormGroup
                type="text"
                id="address"
                name="address"
                value={address}
                sharedName="my-1"
                className="form-control"
                onChange={(e) => setAddress(e.target.value)}
                label="Địa chỉ người ủng hộ:"
              />
            </Col>
            <Col md={6} sm={12}>
              <FormGroup
                label="Điện thoại"
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                sharedName="my-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={
                  typeOfDonation &&
                  (typeOfDonation === "book" || typeOfDonation === "clothes")
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <FormGroup
                value={typeOfDonation}
                label="Hình thức ủng hộ:"
                type="select"
                id="typeOfDonation"
                name="typeOfDonation"
                className="form-control"
                sharedName="my-1"
                onChange={(e) => setTypeOfDonation(e.target.value)}
                options={options}
                required
              />
            </Col>
            <Col md={6} sm={12}>
              {typeOfDonation === "money" && (
                <FormGroup
                  type="number"
                  id="money"
                  name="money"
                  className="form-control"
                  sharedName="my-1"
                  min="0"
                  label="Số tiền ủng hộ:"
                  required={typeOfDonation && typeOfDonation === "money"}
                />
              )}
              {typeOfDonation === "clothes" && (
                <FormGroup
                  type="number"
                  id="clothes"
                  name="clothes"
                  className="form-control"
                  sharedName="my-1"
                  min="0"
                  label="Số lượng quần/áo (chiếc):"
                  required={typeOfDonation && typeOfDonation === "clothes"}
                />
              )}
              {typeOfDonation === "book" && (
                <FormGroup
                  type="number"
                  id="book"
                  name="book"
                  className="form-control"
                  sharedName="my-1"
                  min="0"
                  label="Số lượng sách (cuốn):"
                  required={typeOfDonation && typeOfDonation === "book"}
                />
              )}
            </Col>
          </Row>
          {(typeOfDonation === "clothes" || typeOfDonation === "book") && (
            <>
              {" "}
              <FormGroup
                type="select"
                id="post"
                name="registeredTransport"
                className="form-control"
                sharedName="my-1"
                value={registeredTransport}
                onChange={(e) => setRegisteredTransport(e.target.value)}
                options={[
                  { value: "", label: "Chọn hình thức vận chuyển" },
                  {
                    value: "post",
                    label: "Tôi chủ động chuyển qua đường bưu điện.",
                  },
                  { value: "house", label: "Tôi muốn đăng ký thu gom tại nhà" },
                ]}
              />
            </>
          )}
          <FormGroup
            type="checkbox"
            id="anonymous"
            name="anonymous"
            className="form-control"
            sharedName="my-1 border-top border-bottom py-2 bg-light"
            label="Tôi muốn ủng hộ ẩn danh"
          />
          {(typeOfDonation === "clothes" || typeOfDonation === "book") && (
            <div>
              <p className="mb-0">
                <small className="text-danger">
                  ** Đối với hình thức quyên góp quần áo và sách vở, hiện tại,
                  chúng tôi chỉ có thể đi thu gom trong khu vực thành phố nơi mà
                  tổ chức Quỹ kêu gọi đang làm việc.
                </small>
              </p>
              <p>
                <small className="text-danger">
                  ** Bạn có thể xem địa chỉ của Quỹ kêu gọi ở ngay trang dự án.
                </small>
              </p>
            </div>
          )}
          {userId && <input type="hidden" name="userId" value={userId} />}
          <div className="text-center">
            <Button type="submit" className="btn btn-success w-50 mt-3">
              <strong>
                {typeOfDonation === "book" || typeOfDonation === "clothes"
                  ? "ĐĂNG KÝ ỦNG HỘ"
                  : "ỦNG HỘ"}
              </strong>
            </Button>
          </div>
        </form>
      )}
      {linkQR && (
        <>
          <p className="text-center text-success">
            <strong>Mã QR của {name} </strong>
          </p>
          <div className="text-center">
            <img
              src={`http://localhost:8080/${linkQR}`}
              alt="mã QR của ngân hàng tổ chức kêu gọi"
            />
          </div>
          <p className="text-center">
            Nội dung chuyển khoản:{" "}
            <span className="text-danger">{transactionCode}</span>
          </p>
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteDonation}
            >
              Huỷ Ủng Hộ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DonationForm;
