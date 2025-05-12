import React from "react";
import { Row, Col } from "react-bootstrap";
import FormGroup from "../FormGroup/FormGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const PostSearch = ({ search, setSearch }) => {
  const handleSearchChange = (e) => {
    setSearch({ ...search, author: e.target.value });
  };

  const handleSortChange = (e) => {
    setSearch({ ...search, sortOrder: e.target.value });
  };
  return (
    <div className="search-post-bar p-2  pb-1 text-start bg-light mb-2">
      <form>
        <Row className="align-items-center justify-content-start">
          <Col className="search-input-container col-auto position-relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="search-icon ms-3 "
              style={{
                position: "absolute",
                top: "15px",
                color: "gray",
                left: "10px",
              }}
            />
            <FormGroup
              value={search.author}
              type="text"
              className="rounded-pill w-auto search-input"
              sharedName="search-post"
              placeholder="Nhập tên tác giả"
              onChange={handleSearchChange}
            />
          </Col>
          <Col className="col-auto">
            <FormGroup
              value={search.sortOrder}
              type="select"
              className="rounded-pill w-100"
              placeholder=""
              onChange={handleSortChange}
              options={[
                { value: "newest", label: "Chọn mới nhât" },
                { value: "oldest", label: "Chọn cũ nhất" },
                { value: "popular", label: "Chọn phổ biến" },
              ]}
            />
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default PostSearch;
