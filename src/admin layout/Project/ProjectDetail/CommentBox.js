import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./comment.css"; // Import your custom CSS
import CommentAPI from "../../../API/CommentAPI";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import MessageInput from "./MessageInput";

// CommentBox.js
const CommentBox = React.memo(({ type }) => {
  const navigate = useNavigate();
  const { contentId } = useParams(); // Changed from projectId/postId to contentId
  console.log(contentId);
  const avatar = useSelector((state) => state.user.avatar);
  const username = useSelector((state) => state.user.username);
  const idUser = useSelector((state) => state.user.idUser);
  const [comments, setComments] = useState([]);
  const [replyingCommentId, setReplyingCommentId] = useState(null);

  // Hàm để bật/tắt hộp thoại phản hồi cho từng bình luận
  function showReply(commentId) {
    setReplyingCommentId((prev) => (prev === commentId ? null : commentId));
  }
  // Fetch comments
  async function fetchComments() {
    const response = await CommentAPI.getComments(contentId, type);
    if (response && response.success === true) {
      setComments(response.comments);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }

  // Submit main comment
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await CommentAPI.createComment(contentId, type, formData);
    if (response && response.success === true) {
      fetchComments();
      e.target.reset();
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  };

  // Reply to comment
  const replyComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await CommentAPI.replyComment(contentId, type, formData);
    if (response && response.success === true) {
      fetchComments();
      e.target.reset();
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  };

  // Toggle like
  const toggleLike = useCallback(
    async (commentId, userId) => {
      const response = await CommentAPI.likeComment({
        commentId,
        userId,
      });

      if (response && response.success) {
        console.log(response);
        setComments((prev) =>
          prev.map((commentGroup) => {
            // Update parent comment
            if (commentGroup.comment._id.toString() === commentId.toString()) {
              return {
                ...commentGroup,
                comment: {
                  ...commentGroup.comment,
                  likes: response.isLiked
                    ? [...commentGroup.comment.likes, userId]
                    : commentGroup.comment.likes.filter(
                        (id) => id.toString() !== userId.toString()
                      ),
                },
              };
            }

            // Update replies
            const updatedReplies = commentGroup.replies.map((reply) => {
              if (reply._id.toString() === commentId.toString()) {
                return {
                  ...reply,
                  likes: response.isLiked
                    ? [...reply.likes, userId]
                    : reply.likes.filter(
                        (id) => id.toString() !== userId.toString()
                      ),
                };
              }
              return reply;
            });

            return { ...commentGroup, replies: updatedReplies };
          })
        );
      } else if (
        response &&
        (response.status === 500 || response.status === 404)
      ) {
        navigate("/error-page", {
          state: { status: response.status, errors: response.errors },
        });
      }
    },
    [type]
  );

  useEffect(() => {
    fetchComments();
  }, [contentId, type]);

  return (
    <section id="comments" className="content-item ms-3 ps-4">
      <Container>
        <Row>
          <Col sm={8} md={12}>
            <Form method="post" onSubmit={submitHandler}>
              <h3 className="pull-left">Bình luận mới</h3>
              <Button type="submit" className="btn btn-success pull-right">
                Gửi
              </Button>
              <MessageInput
                avatar={avatar}
                username={username}
                idUser={idUser}
                rows="2"
                contentType={type}
              />
            </Form>
          </Col>
        </Row>

        {comments.length === 0 ? (
          <h3>Không có bình luận nào.</h3>
        ) : (
          comments.map((commentGroup) => (
            <div key={commentGroup.comment._id} style={{ textAlign: "left" }}>
              <Comment
                comment={commentGroup.comment}
                username={username}
                toggleLike={toggleLike}
                replyComment={replyComment}
                clickReply={() => showReply(commentGroup.comment._id)}
                idUser={idUser}
                type={type}
              />

              {commentGroup.replies.map((reply) => (
                <Comment
                  key={reply._id}
                  className="message-reply justify-content-end"
                  comment={reply}
                  username={reply.senderId?.username}
                  toggleLike={toggleLike}
                  clickReply={() => showReply(commentGroup.comment._id)}
                  isReply={commentGroup.comment._id}
                  idUser={idUser}
                />
              ))}
              {replyingCommentId === commentGroup.comment._id && (
                <div className="row mb-0 justify-content-end">
                  <Form
                    className={`message-reply col-md-11 ps-4 me-1`}
                    onSubmit={replyComment}
                  >
                    <MessageInput
                      username={username}
                      idUser={idUser}
                      avatar={avatar}
                      parentId={commentGroup.comment._id}
                      rows="1"
                      contentType={type}
                    />
                  </Form>
                </div>
              )}
            </div>
          ))
        )}
      </Container>
    </section>
  );
});
export default CommentBox;
