import React from "react";
import FormGroup from "../../../FormGroup/FormGroup";
import { Button } from "react-bootstrap";
import { toVND } from "../../../Shared/toVND";
const ConfirmForm = ({
  action,
  registered,
  typeOfDona,
  selectedIDs,
  onClose,
  onBulkConfirm,
  onBulkReject,
  onCorrect,
  content,
  deleteUser,
}) => {
  console.log(registered, typeOfDona);
  const submitHandler = (e) => {
    e.preventDefault();
    if (action === "confirm") {
      console.log(selectedIDs, action);
      onBulkConfirm(selectedIDs, action);
    } else if (action === "reject") {
      const data = new FormData(e.target);
      const reasonForRejection = data.get("reasonForRejection");
      console.log(selectedIDs, action);
      onBulkReject(selectedIDs, action, reasonForRejection);
    } else if (action === "correct") {
      const fd = new FormData(e.target);
      const exact = fd.get(typeOfDona);

      onCorrect(selectedIDs, action, exact);
    } else if (content) {
      console.log("ehy");
      deleteUser();
    }
    onClose();
  };
  return (
    <div className="donation-form text-start">
      <div className="text-end" onClick={onClose}>
        <span className="text-danger"> X </span>
      </div>
      <form method="POST" onSubmit={submitHandler}>
        {content && <p>{content}</p>}
        {action === "reject" && (
          <>
            <p>Lý do từ chối Quyên góp: </p>
            <FormGroup
              type="text"
              label=""
              id="reason"
              name="reasonForRejection"
              sharedName="my-1"
              className="form-control"
              required
            />
          </>
        )}
        {action === "confirm" && (
          <p>Bạn có chắc chắn "Đã nhận" các phần Quyên góp này không? </p>
        )}
        {action === "correct" && (
          <>
            <h4 className="text-success text-center">Đính chính</h4>
            <p>
              Theo thông tin, bạn đã đăng ký ủng hộ{" "}
              {typeOfDona &&
                (typeOfDona === "money"
                  ? "tiền"
                  : typeOfDona === "clothes"
                  ? "quần áo"
                  : "sách")}{" "}
              với giá trị là{" "}
              {typeOfDona && typeOfDona === "money"
                ? toVND(String(registered))
                : registered}{" "}
              {typeOfDona &&
                (typeOfDona === "money"
                  ? "đồng"
                  : typeOfDona === "clothes"
                  ? "chiếc"
                  : "cuốn")}
              .
            </p>
            <p>
              Sau khi trao đổi và xác nhận thông tin với người ủng hộ, chúng tôi
              đính chính{" "}
              {typeOfDona &&
                (typeOfDona === "money"
                  ? "số tiền"
                  : typeOfDona === "clothes"
                  ? "số lượng quần áo"
                  : "số lượng sách")}{" "}
              mà chúng tôi đã nhận được là:{" "}
              <input type="number" name={typeOfDona && typeOfDona} />
            </p>
          </>
        )}
        <div className="mt-3 text-center">
          <Button type="button" className="btn btn-danger" onClick={onClose}>
            Huỷ bỏ{" "}
          </Button>{" "}
          <Button type="submit" className="btn btn-success">
            {action === "confirm"
              ? "Đã nhận"
              : action === "reject"
              ? "Từ chối"
              : content
              ? "Chắc chắn"
              : "Đính chính"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmForm;
