import React, { useState, useEffect } from "react";
import FormGroup from "../FormGroup/FormGroup";
import Card from "../Shared/Card";
import PostAPI from "../API/PostAPI";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./postform.css";

function PostForm() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.idUser);
  const { role } = useSelector((state) => state.user);
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  async function fetchPostInfo(id) {
    const response = await PostAPI.getPostDetail(id);
    if (response && response.success === true) {
      const post = response.post;
      setTitle(post.title || "");
      setContent(post.content || "");
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let response;
    if (postId) {
      response = await PostAPI.updatePost(postId, formData);
    } else {
      response = await PostAPI.createPost(formData);
    }
    if (response && response.success === true) {
      window.alert(postId ? "Cập nhật thành công" : "Đăng bài thành công");
      navigate(
        role === "partner" ? "/partner/personal-page" : "/personal-page",
        { state: { personalPageId: userId } }
      );
    } else if (response && response.status === 403) {
      window.alert(response.errors);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostInfo(postId);
    }
  }, []);
  return (
    <Card style={{ marginTop: "100px" }} formName="py-3 px-4 post-form">
      <div className="post-form-header">
        <h2 className="text-success">Đăng Bài</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="form"
        encType="multipart/form-data"
      >
        <FormGroup
          label="Tiêu đề"
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề"
          className="form-control"
        />

        <FormGroup
          label="Nội dung"
          type="textarea"
          id="content"
          name="content"
          required
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập nội dung"
          className="form-control"
        />

        <FormGroup
          label="Tải ảnh"
          type="file"
          id="images"
          name="images"
          multiple
          sharedName="file-input"
        />

        <input type="hidden" name="userId" value={userId} />
        <div style={{ textAlign: "center" }}>
          <Button type="submit" className="btn btn-success">
            {postId ? "Cập nhật" : "Đăng bài"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default PostForm;
