import React from "react";
import "./Stats.css";
import { toVND } from "../../Shared/toVND";
function Stats({ stats }) {
  return (
    <section className="stats-section bg-light py-5">
      <h2 className="text-success pb-4">Thống kê</h2>
      <div className="container text-center ">
        <div className="row justify-content-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${
                stat.label === "Ủng hộ tiền" ? "col-md-4" : "col-md-3"
              } mb-3 stat-part`}
            >
              <div className="stat-box p-4 bg-white shadow rounded">
                {(index === 4 || index === 5 || index === 6) && (
                  <p>
                    <strong>{stat.label}</strong>
                  </p>
                )}
                <h3 className="text-success">
                  {stat.label === "Ủng hộ tiền"
                    ? `${toVND(String(stat.number || 0))}đ`
                    : stat.number || 0}
                </h3>
                {(index === 0 || index === 1 || index === 2 || index === 3) && (
                  <p>
                    <strong>{stat.label}</strong>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
