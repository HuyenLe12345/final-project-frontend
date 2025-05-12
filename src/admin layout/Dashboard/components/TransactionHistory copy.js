import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const TransactionHistory = () => {
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item action>
          <div className="d-flex">
            <div className="flex-shrink-0">
              <div className="avtar avtar-s rounded-circle text-success bg-light-success">
                <i className="ti ti-gift f-18"></i>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <h6 className="mb-1">Order #002434</h6>
              <p className="mb-0 text-muted">Today, 2:00 AM</p>
            </div>
            <div className="flex-shrink-0 text-end">
              <h6 className="mb-1">+ $1,430</h6>
              <p className="mb-0 text-muted">78%</p>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item action>
          <div className="d-flex">
            <div className="flex-shrink-0">
              <div className="avtar avtar-s rounded-circle text-primary bg-light-primary">
                <i className="ti ti-message-circle f-18"></i>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <h6 className="mb-1">Order #984947</h6>
              <p className="mb-0 text-muted">5 August, 1:45 PM</p>
            </div>
            <div className="flex-shrink-0 text-end">
              <h6 className="mb-1">- $302</h6>
              <p className="mb-0 text-muted">8%</p>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item action>
          <div className="d-flex">
            <div className="flex-shrink-0">
              <div className="avtar avtar-s rounded-circle text-danger bg-light-danger">
                <i className="ti ti-settings f-18"></i>
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <h6 className="mb-1">Order #988784</h6>
              <p className="mb-0 text-muted">7 hours ago</p>
            </div>
            <div className="flex-shrink-0 text-end">
              <h6 className="mb-1">- $682</h6>
              <p className="mb-0 text-muted">16%</p>
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default TransactionHistory;
