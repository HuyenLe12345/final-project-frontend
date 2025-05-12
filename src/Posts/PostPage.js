import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import PostAPI from "../API/PostAPI";
import Card from "../Shared/Card";
import PostSearch from "./PostSearch";
import { useNavigate } from "react-router-dom";
// import "./postpage.css";

const PostPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState({
    author: "",
    sortOrder: "newest", // newest, oldest, popular
  });

  async function fetchPosts() {
    const response = await PostAPI.getAllPosts();
    if (response && response.success === true) {
      console.log(response.posts);
      setPosts(response.posts);
      setFilteredPosts(response.posts);
    } else if (
      response &&
      (response.status === 500 || response.status === 404)
    ) {
      navigate("/error-page", {
        state: { status: response.status, errors: response.errors },
      });
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to filter posts based on search criteria
  const filterPosts = () => {
    let filtered = [...posts];

    // Filter by author
    if (search.author) {
      filtered = filtered.filter(
        (post) =>
          post.authorId?.username
            ?.toLowerCase()
            .includes(search.author.toLowerCase()) ||
          post.authorId?.organizationName
            ?.toLowerCase()
            .includes(search.author.toLowerCase())
      );
    }

    // Sort posts
    if (search.sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (search.sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (search.sortOrder === "popular") {
      filtered.sort((a, b) => b.favorites.length - a.favorites.length);
    }

    setFilteredPosts(filtered);
  };

  useEffect(() => {
    filterPosts();
  }, [search, posts]);

  return (
    <Card formName="post-page">
      <PostSearch search={search} setSearch={setSearch} />
      {filteredPosts.length === 0 ? (
        <p>Không có bài viết nào!</p>
      ) : (
        <PostList posts={filteredPosts} />
      )}
    </Card>
  );
};

export default PostPage;
