import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatisticCard = ({ title, value, unit, icon, types }) => {
  return (
    <Card style={{ border: "2px solid rgb(23, 110, 46) " }}>
      <Row className="align-items-center">
        <Col xs={3} className=" ms-2">
          <div
            className="bg-success py-2 px-1 ms-1 "
            style={{
              border: "1px solid rgb(23, 110, 46) ",
              borderRadius: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={icon}
              style={{ color: "white", fontWeight: "bold" }}
            />
          </div>
        </Col>
        <Col md={6} xs={7} className="my-3" style={{ textAlign: "left" }}>
          <p
            className="mb-1 f-w-400 text-muted "
            style={{ color: "rgb(225, 223, 223" }}
          >
            {title}
          </p>
          <h5 className="mb-1">
            {value} {unit}
          </h5>
        </Col>
      </Row>
    </Card>
  );
};

export default StatisticCard;
