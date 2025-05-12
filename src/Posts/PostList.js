import React from "react";
import { Row, Col } from "react-bootstrap";
import PostBox from "./PostBox";

const PostList = ({ posts, clickHandler }) => {
  return (
    <Row className="mx-3 justify-content-start">
      {posts.map((post) => (
        <Col key={post._id} lg={4} md={6} xs={12} className="mb-3">
          <PostBox post={post} deletePost={clickHandler} />
        </Col>
      ))}
    </Row>
  );
};

export default PostList;
