import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { toVND } from "../../../Shared/toVND";
import { translate } from "../../../Shared/translate";
const GoalBox = ({
  goals,
  days,
  userId,
  openModal,
  status,
  numberOfDonations,
}) => {
  return (
    <div
      className=" bg-success border rounded p-3 mb-3  text-white"
      style={{ backgroundColor: "#084c1a", border: "1px solid #084c1a" }}
    >
      <h6 style={{ textAlign: "center" }}>CẬP NHẬT</h6>
      <Table className="mb-0 hover borderless">
        <thead className="table-success text-white">
          <tr>
            <th>Hình thức</th>
            <th>Mục tiêu </th>
            <th>Đạt được </th>
          </tr>
        </thead>
        <tbody>
          {goals &&
            goals.map((goal, index) => {
              return (
                <tr
                  key={goal._id}
                  className={`text-start ${index % 2 === 0 ? "bg-light" : ""}`}
                >
                  <td>{translate(goal.form)}</td>
                  <td>
                    <p className="mb-0">
                      {goal.form === "money"
                        ? toVND(String(goal.goal))
                        : goal.goal}
                      {goal.form === "money"
                        ? " đ"
                        : goal.form === "clothes"
                        ? " chiếc"
                        : " cuốn"}
                    </p>
                    {/* <p className="py-0 my-0">
                      
                    </p> */}
                  </td>
                  <td>
                    {" "}
                    {goal.form === "money"
                      ? toVND(String(goal.raised))
                      : goal.raised}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <p className="bg-light border rounded ps-1 text-success mt-3">
        <strong> Lượt ủng hộ: </strong>
        <span className="ms-2">{numberOfDonations}</span>
      </p>
      <p className="bg-light border rounded ps-1 text-success mt-3">
        <strong> Hạn cuối:</strong>
        <span className="ms-2">{days}</span>
      </p>
      <div style={{ textAlign: "center" }}>
        <Button
          type="button"
          className="btn btn-danger"
          onClick={openModal}
          disabled={status === "Kết thúc"}
        >
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: "white", marginRight: "5px" }}
          />
          <strong>ỦNG HỘ</strong>
        </Button>
      </div>
    </div>
  );
};
export default GoalBox;
