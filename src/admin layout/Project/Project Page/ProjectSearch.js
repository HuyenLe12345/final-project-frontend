import React, { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap"; // Assuming you're using React Bootstrap
import FormGroup from "../../../FormGroup/FormGroup"; // Assuming you have a FormGroup component

const ProjectSearch = ({
  organizations,
  projects,
  setFilteredProjects,
  search,
  setSearch,
}) => {
  //  Options for Category Select
  const categoryOptions = [
    { value: "", label: "Chọn danh mục" },
    { value: "education", label: "Giáo dục" },
    { value: "medical", label: "Y tế" },
    { value: "children", label: "Trẻ em" },
    { value: "environment", label: "Môi trường" },
  ];

  // Options for Type of Donation Select
  const typeOfDonationOptions = [
    { value: "", label: "Chọn hình thức" },
    { value: "money", label: "Tiền" },
    { value: "clothes", label: "Quần áo" },
    { value: "book", label: "Sách" },
  ];
  // options về thời gian của cac dự án
  const sortOptions = [
    { value: "newest", label: " Chọn mới nhất" },
    { value: "oldest", label: "Chọn cũ nhất" },
  ];
  const handleSearch = () => {
    let filtered = [...projects];
    filtered = projects.filter((project) => {
      const categoryMatch =
        search.category === "" || project.category === search.category;
      const organizationMatch =
        search.organization === "" ||
        project.organizationId.organizationName === search.organization;

      const typeOfDonationMatch =
        search.typeOfDonation === "" ||
        project.goals.some((goal) => goal.form === search.typeOfDonation); // Assuming project.goals is an array of goal objects

      return categoryMatch && organizationMatch && typeOfDonationMatch;
    });
    // Sort the filtered projects
    if (search.sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest first
    }

    if (search.sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Oldest first
    }

    setFilteredProjects(filtered);
  };

  useEffect(() => {
    if (projects) {
      handleSearch();
    }
  }, [projects, search]);

  const handleCategoryChange = (e) => {
    setSearch({ ...search, category: e.target.value });
  };

  const handleOrganizationChange = (e) => {
    setSearch({ ...search, organization: e.target.value });
  };

  const handleTypeOfDonationChange = (e) => {
    setSearch({ ...search, typeOfDonation: e.target.value });
  };

  const handleSortOrderChange = (e) => {
    setSearch({ ...search, sortOrder: e.target.value });
  };

  return (
    <Row className="my-3 mx-1 py-2 bg-light align-items-center justify-content-center">
      <Col md={3} sm={6} className="mb-2">
        <FormGroup
          label="Danh mục"
          value={search.category}
          type="select"
          id="category"
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          options={categoryOptions}
        />
      </Col>

      <Col md={3} sm={6} className="mb-2">
        <FormGroup
          label="Tổ chức"
          value={search.organization}
          type="select"
          id="organization"
          name="organization"
          className="form-control"
          onChange={handleOrganizationChange}
          options={organizations}
        />
      </Col>

      <Col md={3} sm={6} className="mb-2">
        <FormGroup
          label="Hình thức"
          value={search.typeOfDonation}
          type="select"
          id="typeOfDonation"
          name="typeOfDonation"
          className="form-control"
          onChange={handleTypeOfDonationChange}
          options={typeOfDonationOptions}
        />
      </Col>
      <Col md={3} sm={6} className="mb-2">
        <FormGroup
          label="Sắp xếp"
          value={search.sortOrder}
          type="select"
          id="sortOrder"
          name="sortOrder"
          className="form-control"
          onChange={handleSortOrderChange}
          options={sortOptions}
        />
      </Col>
    </Row>
  );
};
export default ProjectSearch;
