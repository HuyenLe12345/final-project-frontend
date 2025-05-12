import React from "react";
import "./Cooperate.css";

function Coop({ title, partners, description }) {
  return (
    <section className="partners-section py-5 bg-light text-center">
      <h2>{title}</h2>
      {description && <h4>{description}</h4>}
      <div className="container d-flex justify-content-center flex-wrap mt-4">
        {partners.map((partner, index) => (
          <img
            key={partner._id || index}
            src={`http://localhost:8080/${partner.avatar}`}
            alt={partner.organizationName}
            className="partner-logo mx-3 my-2"
            style={{ height: "50px" }}
          />
        ))}
      </div>
    </section>
  );
}

export default Coop;
