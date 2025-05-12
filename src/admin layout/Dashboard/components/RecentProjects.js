import React, { useState, useEffect } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toVND } from "../../../Shared/toVND";
import { translate } from "../../../Shared/translate.js";
import convertToSlug from "../../../Shared/convertToSlug.js";

import "./table.css";

const RecentProjects = React.memo(
  ({
    title,
    detail,
    type,
    users,
    onOpen,
    actionHandler,
    className,
    senior,
    role,
  }) => {
    // Thêm state để lưu danh sách donation được chọn
    const [selectedDonations, setSelectedDonations] = useState([]);

    console.log(role);
    // Xử lý khi checkbox thay đổi
    const handleCheckboxChange = (donationId) => {
      setSelectedDonations((prev) =>
        prev.includes(donationId)
          ? prev.filter((id) => id !== donationId)
          : [...prev, donationId]
      );
    };

    // Xử lý chọn tất cả
    const handleSelectAll = (e) => {
      if (e.target.checked) {
        // Chỉ lọc những donation có status là 'pending'
        const pendingIds = detail
          .filter((d) => d.status === "pending")
          .map((d) => d._id);
        setSelectedDonations(pendingIds);
      } else {
        setSelectedDonations([]);
      }
    };
    useEffect(() => {
      setSelectedDonations([]);
    }, [detail]);
    const [pageTitle, setPageTitle] = useState("Donation");

    useEffect(() => {
      document.title = pageTitle;
    }, [pageTitle]);

    const handleLinkClick = (newTitle) => {
      setPageTitle(newTitle);
    };
    return (
      <Card className={`${className} `}>
        <Card.Body className="px-0 py-0">
          {type !== "personal-donation" && (
            <h5 className="mb-2 text-muted py-2">{title}</h5>
          )}

          {/* Nút xác nhận/từ chối hàng loạt */}

          <div className="table-responsive">
            <Table className="mb-0 hover borderless ">
              <thead className="table-success text-white text-center">
                <tr style={{ textAlign: "left" }}>
                  {type === "dashboard-donation" && (
                    <>
                      <th>Trạng thái </th>
                      <th>Dự án </th>
                      <th>Ngày</th>
                      <th>Hình thức</th>
                      <th>Đăng ký</th>
                      <th>Đã nhận</th>
                    </>
                  )}
                  {type === "donation" && (
                    <>
                      {role === "partner" && (
                        <th>
                          <input
                            type="checkbox"
                            checked={
                              selectedDonations.length ===
                                detail?.filter((d) => d.status === "pending")
                                  .length &&
                              detail.filter((d) => d.status === "pending")
                                .length > 0
                            }
                            onChange={handleSelectAll}
                          />
                        </th>
                      )}
                      <th>Dự án </th>
                      <th>Ngày</th>
                      <th>Mã quyên góp</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Hình thức</th>
                      <th>Đăng ký</th>
                      <th>Đã nhận</th>
                      <th>Trạng thái </th>
                      {role === "partner" && (
                        <>
                          <th>
                            {" "}
                            <div style={{ width: "100px" }}>
                              Vận chuyển
                            </div>{" "}
                          </th>
                          <th>Đính chính </th>
                        </>
                      )}
                      <td>
                        <div style={{ width: "auto" }}>
                          <strong>Lý do từ chối</strong>
                        </div>
                      </td>
                    </>
                  )}
                  {type === "users" && (
                    <>
                      <th>
                        {senior && senior === "partner"
                          ? "Tên tổ chức"
                          : "Tên người dùng"}{" "}
                      </th>
                      <th>Email </th>
                      <th>Trạng thái </th>
                      <th>Hoạt động </th>
                    </>
                  )}
                  {!type && (
                    <>
                      <th>STT</th>
                      <th>TIÊU ĐỀ</th>
                      <th>PHÂN MỤC</th>
                      <th>TRẠNG THÁI </th>
                    </>
                  )}
                  {type === "expired" && (
                    <>
                      <th>STT</th>
                      <th>TIÊU ĐỀ</th>
                      <th>NGÀY</th>
                    </>
                  )}
                  {type === "personal-donation" && (
                    <>
                      <th>Thời gian </th>
                      <th> Dự án</th>
                      <th>Hình thức</th>
                      <th>Ủng hộ</th>
                      <th>Trạng thái </th>
                      <th>Ghi chú </th>
                    </>
                  )}
                  {type === "total-donation" && (
                    <>
                      <th></th>
                      <th> Tiền</th>
                      <th>Quần áo</th>
                      <th>Sách</th>
                    </>
                  )}
                  {type === "project-donation" && (
                    <>
                      <th> Người ủng hộ </th>
                      <th> Hình thức </th>
                      <th> Giá trị </th>
                      <th>Thời gian </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody
                className={`${
                  type === "project-donation"
                    ? "project-donation text-start"
                    : "text-start"
                }`}
                style={{ textAlign: "left" }}
              >
                {type !== "total-donation" &&
                  detail &&
                  detail.map((deta, index) => (
                    <tr
                      key={deta._id}
                      className={`${
                        index % 2 !== 0 ? "table-secondary" : ""
                      } align-middle`}
                    >
                      {type === "donation" && (
                        <>
                          {role === "partner" && (
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedDonations.includes(deta._id)}
                                onChange={() => handleCheckboxChange(deta._id)}
                                disabled={deta.status !== "pending"}
                              />
                            </td>
                          )}
                          <td>
                            <div
                              style={{
                                width: "200px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {deta.projectId.title}
                            </div>
                          </td>
                          <td>
                            {" "}
                            <div
                              className="text-muted"
                              style={{
                                minWidth: "200px",
                              }}
                            >
                              {new Date(deta.createdAt).toLocaleString()}
                            </div>
                          </td>
                          <td className="donation-code">
                            <div>{deta.transactionCode}</div>
                          </td>
                          <td
                            style={{
                              minWidth: "180px",
                            }}
                          >
                            {deta.donorName}
                          </td>
                          <td>{deta.email}</td>
                          <td
                            style={{
                              minWidth: "120px",
                            }}
                          >
                            {deta.typeOfDonation === "money"
                              ? "Tiền"
                              : deta.typeOfDonation === "clothes"
                              ? "Quần áo"
                              : "Sách"}
                          </td>
                          <td
                            style={{
                              minWidth: "150px",
                            }}
                          >
                            {deta.typeOfDonation === "money"
                              ? toVND(String(deta.registered))
                              : deta.registered}
                          </td>
                          <td
                            style={{
                              minWidth: "150px",
                            }}
                          >
                            {deta.typeOfDonation === "money"
                              ? toVND(String(deta.raised))
                              : deta.raised}
                          </td>
                          <td
                            className={`${
                              deta.status === "pending"
                                ? "text-danger"
                                : deta.status === "confirm"
                                ? "text-success"
                                : "gray"
                            }`}
                            style={{
                              minWidth: "100px",
                            }}
                          >
                            {deta.status === "pending"
                              ? "Chờ duyệt"
                              : deta.status === "confirm"
                              ? "Đã nhận"
                              : "Từ chối"}
                          </td>
                          {role === "partner" && (
                            <>
                              <td>
                                {deta.registeredTransport === "post"
                                  ? "Bưu điện"
                                  : deta.registeredTransport === "house"
                                  ? "Đăng ký tại nhà"
                                  : ""}
                              </td>
                              <td>
                                <div
                                  style={{
                                    width: "150px",
                                  }}
                                >
                                  <Button
                                    type="button"
                                    className=" correct-button  bg-primary border-0 text-white rounded"
                                    onClick={() => {
                                      actionHandler(
                                        "correct",
                                        [deta._id],
                                        deta.registered,
                                        deta.typeOfDonation
                                      );
                                    }}
                                    disabled={deta.status !== "pending"}
                                  >
                                    Đính chính
                                  </Button>
                                </div>
                              </td>
                            </>
                          )}
                          <td>
                            <div style={{ width: "200px" }}>
                              {deta.status === "reject" &&
                                deta.reasonForRejection}
                            </div>
                          </td>
                        </>
                      )}
                      {type === "dashboard-donation" && (
                        <>
                          <td
                            className={` ${
                              deta.status === "pending"
                                ? "text-danger"
                                : deta.status === "confirm"
                                ? "text-success"
                                : "text-secondary"
                            }`}
                          >
                            {deta.status === "pending"
                              ? "Chờ duyệt"
                              : deta.status === "confirm"
                              ? "Đã nhận"
                              : "Từ chối"}{" "}
                          </td>
                          <td>
                            <div
                              style={{
                                width: "150px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {deta.projectId.title}
                            </div>{" "}
                          </td>
                          <td>{new Date(deta.createdAt).toLocaleString()}</td>
                          <td>{translate(deta?.typeOfDonation)}</td>
                          <td>
                            {deta?.typeOfDonation === "money"
                              ? toVND(deta.registered)
                              : deta.registered}
                          </td>
                          <td>
                            {deta?.typeOfDonation === "money"
                              ? toVND(deta.raised)
                              : deta.raised}
                          </td>
                        </>
                      )}
                      {type === "users" && (
                        <>
                          <td>
                            <div
                              style={{
                                width: `${senior !== "partner" && "100px"}`,
                              }}
                            >
                              <Link
                                onClick={() =>
                                  handleLinkClick(
                                    deta.username ||
                                      deta.organizationName ||
                                      "Donation"
                                  )
                                }
                                to={`${
                                  senior === "partner"
                                    ? "/quy"
                                    : senior === "client"
                                    ? "/taikhoan"
                                    : "/admin"
                                }/${convertToSlug(
                                  senior === "partner"
                                    ? deta.organizationName
                                    : senior === "client"
                                    ? deta.username
                                    : "profile"
                                )}
                          `}
                                state={{
                                  personalPageId: deta._id,
                                  profileId: deta._id,
                                }}
                                style={{
                                  color: "black",
                                  textDecoration: "none",
                                }}
                              >
                                {senior && senior === "partner"
                                  ? deta.organizationName
                                  : deta.username}
                              </Link>
                            </div>
                          </td>
                          <td>
                            <div>{deta.email}</div>
                          </td>
                          <td>
                            <div>{deta.status}</div>
                          </td>
                          <td>
                            <div className="d-flex gap-2 justify-content-start">
                              <button className="btn btn-success">
                                <Link
                                  to={`/admin/user-management/${deta._id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                  }}
                                  state={{ profileId: deta._id }}
                                >
                                  Sửa
                                </Link>
                              </button>
                              {deta?.role !== "partner" && (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => onOpen(deta._id)}
                                >
                                  Xoá
                                </button>
                              )}
                            </div>
                          </td>
                        </>
                      )}
                      {!type && (
                        <>
                          <td>{index + 1}</td>
                          <td style={{ width: "200px" }}>
                            <div
                              style={{
                                width: "100px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {deta.title}
                            </div>
                          </td>
                          <td>{deta.category}</td>
                          <td>
                            <span className="d-flex align-items-center justify-content-center gap-2">
                              <i className="fas fa-circle text-danger f-10 m-r-5"></i>
                              {deta.status}
                            </span>
                          </td>
                        </>
                      )}
                      {type === "expired" && (
                        <>
                          <td className="text-center" style={{ width: "15%" }}>
                            {index + 1}
                          </td>
                          <td>{deta.title}</td>
                          <td className="w-25">{deta.deadline}</td>
                        </>
                      )}
                      {type === "personal-donation" && (
                        <>
                          <td style={{ fontSize: "12px" }}>
                            {new Date(deta.createdAt).toLocaleString()}
                          </td>
                          <td className="w-25">
                            <div
                              style={{
                                whiteSpace: "nowrap",
                                width: "250px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Link
                                onClick={() =>
                                  handleLinkClick(
                                    deta.projectId.title || "Donation"
                                  )
                                }
                                to={`/projects/${deta.projectId._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {" "}
                                {deta.projectId.title}
                              </Link>
                            </div>
                          </td>
                          <td style={{ width: "120px", textAlign: "center" }}>
                            {deta.typeOfDonation === "money"
                              ? "Tiền"
                              : deta.typeOfDonation === "clothes"
                              ? "Quần áo"
                              : "Sách"}
                          </td>
                          <td style={{ width: "150px" }}>
                            {deta.status === "pending" ||
                            deta.status === "reject"
                              ? deta.typeOfDonation === "money"
                                ? toVND(String(deta.registered))
                                : deta.registered
                              : deta.typeOfDonation === "money"
                              ? toVND(String(deta.raised))
                              : deta.raised}
                          </td>
                          <td style={{ width: "150px", textAlign: "center" }}>
                            {deta.status === "confirm"
                              ? "Xác nhận"
                              : deta.status === "pending"
                              ? "Chờ duyệt"
                              : "Từ chối"}
                          </td>
                          <td style={{ width: "200px" }}>
                            {deta.status === "reject" &&
                              deta.reasonForRejection}
                          </td>
                        </>
                      )}
                      {type === "project-donation" && (
                        <>
                          <td>{deta.anonymous ? "Ẩn danh" : deta.donorName}</td>
                          <td>{translate(deta.typeOfDonation)}</td>
                          <td>
                            {deta.typeOfDonation === "money"
                              ? `${toVND(String(deta.raised))}đ`
                              : `${deta.raised}${
                                  deta.typeOfDonation === "clothes"
                                    ? "chiếc"
                                    : "cuốn"
                                }`}
                          </td>
                          <td>{new Date(deta.createdAt).toLocaleString()}</td>
                        </>
                      )}
                    </tr>
                  ))}
                {detail && type === "total-donation" && (
                  <>
                    <tr>
                      <td style={{ width: "100px" }}>
                        Tháng {new Date().getMonth() + 1}
                      </td>
                      <td style={{ width: "150px" }}>
                        {toVND(String(detail?.byMonth?.money || 0))}đ
                      </td>
                      <td style={{ width: "150px" }}>
                        {detail?.byMonth?.clothes || 0} chiếc
                      </td>
                      <td style={{ width: "150px" }}>
                        {" "}
                        {detail?.byMonth?.books || 0} cuốn
                      </td>
                    </tr>
                    <tr>
                      <td>Tổng </td>
                      <td>{toVND(String(detail?.amount?.money || 0))}đ</td>
                      <td>{detail?.amount?.clothes || 0} chiếc</td>
                      <td>{detail?.amount?.books || 0} cuốn</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>

            {(!detail || detail.length === 0) && (
              <p style={{ textAlign: "center", fontSize: "15px" }}>
                Không có thông tin nào được tìm thấy.
              </p>
            )}
          </div>
        </Card.Body>
        {type === "donation" && role === "partner" && (
          <div className="d-flex gap-2 mx-3 my-3 justify-content-start align-items-center">
            <div>Đã chọn ({selectedDonations.length})</div>
            <button
              className="btn btn-success rounded-pill"
              disabled={selectedDonations.length === 0}
              onClick={() => {
                actionHandler("confirm", selectedDonations);
              }}
            >
              Xác nhận
            </button>
            <button
              className="btn btn-danger rounded-pill"
              disabled={selectedDonations.length === 0}
              onClick={() => {
                actionHandler("reject", selectedDonations);
              }}
            >
              Từ chối
            </button>
          </div>
        )}
      </Card>
    );
  }
);

export default RecentProjects;
