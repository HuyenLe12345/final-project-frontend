// components/StatCard.js
import React from "react";
import { toVND } from "../../../Shared/toVND";
const StatCard = ({ title, value }) => {
  return (
    <div className="stat-card ">
      <h6>{title}</h6>
      <div className={`${title === "Ủng hộ" ? "donate" : ""}`}>
        {title === "Ủng hộ" ? (
          <>
            <div className="donate-part ">
              <>
                <span className="border-bottom border-success">Tiền </span>
                <span> {toVND(String(value.moneyDonations))}đ</span>
              </>
            </div>
            <div className="donate-part ">
              <span className="border-bottom border-success">Quần áo </span>
              <span>{value.clothesDonations} chiếc</span>
            </div>
            <div className="donate-part">
              <span className="border-bottom border-success"> Sách </span>
              <span>{value.bookDonations} cuốn</span>
            </div>
          </>
        ) : (
          <span>{value}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
