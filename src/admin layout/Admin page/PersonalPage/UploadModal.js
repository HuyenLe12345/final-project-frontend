// UploadModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const UploadModal = ({ show, onClose, onUpload, type }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Cập nhật {type === "avatar" ? "Avatar" : "Background"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onUpload} encType="multipart/form-data">
          <div>
            {" "}
            <input type="file" id="image" name={type} accept="image/*" />
          </div>
          <Button type="submit" className="btn-success mt-4">
            Tải ảnh{" "}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UploadModal;
