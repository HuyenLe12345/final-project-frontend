// export default CarouselImage;
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./carousel.css";

const CarouselImage = ({ images }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Container className="w-100">
      <Row>
        <Col xs={12}>
          <div className="main-image-container">
            <img
              src={`http://localhost:8080/${images[index]}`}
              alt={images[index]}
              className="main-image"
            />
          </div>
        </Col>
      </Row>
      <Row className="thumbnail-list justify-content-center">
        <button className="prev-button" onClick={handlePrev}>
          <span className="visually-hidden">Previous</span>
          <span className="prev-icon" aria-hidden="true">
            &lt;
          </span>
        </button>
        <div className="thumbnail-carousel">
          {images.map((image, i) => (
            <img
              key={i} // Use i instead of Math.random() for better performance
              src={`http://localhost:8080/${image}`}
              alt={image}
              className={`thumbnail ${image === images[index] ? "active" : ""}`}
              // style={{
              //   transform: `translateX(${(i - index) * 100}%)`, // Move thumbnails based on index
              // }}
              onClick={() => handleSelect(i)}
            />
          ))}
        </div>
        <button className="next-button" onClick={handleNext}>
          <span className="visually-hidden">Next</span>
          <span className="next-icon" aria-hidden="true">
            &gt;
          </span>
        </button>
      </Row>
    </Container>
  );
};

export default CarouselImage;
