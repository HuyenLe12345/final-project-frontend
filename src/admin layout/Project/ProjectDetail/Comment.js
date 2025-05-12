import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import UserIcon from "../../../Shared/UserIcon";
import MessageInput from "./MessageInput";

const Comment = ({
  comment,
  username,
  toggleLike,
  replyComment,
  className,
  clickReply,
  isReply,
  idUser,
  type,
}) => {
  console.log(isReply ? `isReply ${isReply}` : comment._id);
  const isLiked = comment.likes.some(
    (like) => like.toString() === idUser.toString()
  );

  return (
    <>
      <Row className={`${className} ${isReply ? "ms-1 me-2" : ""}`}>
        <Col className="align-self-start" md={1}>
          <UserIcon
            avatar={comment.senderId?.avatar}
            username={
              comment.senderId?.username || comment.senderId?.organizationName
            }
          />
        </Col>
        <Col md={10} className="media-body">
          <h6 className="media-heading">
            {comment.senderId?.username ||
              comment.senderId?.organizationName ||
              "Ẩn danh"}
          </h6>
          <p>{comment.content}</p>
          <div className="d-flex justify-content-between">
            <ul className="d-flex list-unstyled list-inline media-detail pull-left">
              <li>
                <FontAwesomeIcon icon={faCalendarDays} />
                <span> </span>
                {new Date(comment.createdAt).toLocaleString()}
              </li>
            </ul>
            <ul
              className={`d-flex list-unstyled list-inline media-detail pull-right ${
                isReply ? "me-3 " : ""
              }`}
            >
              <li>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span> {comment.likes.length}</span>
              </li>
              <li
                className="like"
                onClick={() => toggleLike(comment._id, idUser)}
              >
                <a className={`${isLiked ? "text-primary" : ""}`}>
                  {isLiked ? "Bỏ thích" : "Thích"}
                </a>
              </li>
              {/* {!isReply && ( */}
              <li className="reply" onClick={() => clickReply()}>
                <a>Phản hồi</a>
              </li>
              {/* )} */}
            </ul>
          </div>
        </Col>
      </Row>
      {/* <div className="row mb-0 justify-content-end">
        <Form
          className={`message-reply col-md-11 ps-4 me-1 ${
            show ? "" : "d-none"
          }`}
          onSubmit={replyComment}
        >
          <MessageInput
            username={username}
            idUser={idUser}
            avatar={avatar}
            parentId={!isReply ? comment._id : isReply}
            rows="1"
            contentType={type}
          />
        </Form>
      </div> */}
    </>
  );
};

export default Comment;
