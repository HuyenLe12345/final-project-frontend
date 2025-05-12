import React from "react";
import charity from "../../images/charity.jpg";
// import "./About.css";

function About() {
  return (
    <section className="about-section mx-5 py-5">
      <div className="container d-flex align-items-center">
        {/* Hình ảnh */}
        <div className="col-md-6">
          <img src={charity} alt="Donation" className="img-fluid rounded" />
        </div>

        {/* Nội dung */}
        <div className="col-md-6 ps-md-5 mt-3 mt-md-0 text-start">
          <h2 className="text-success">Donation là gì?</h2>
          <p>
            Donation là nền tảng gây quỹ cộng đồng trực tuyến tiện lợi, tin cậy
            và minh bạch, là nơi mọi người có thể tham gia ủng hộ để giúp đỡ các
            hoàn cảnh khó khăn và đóng góp vào các dự án xây dựng từ thiện dưới
            mọi hình thức kêu gọi: tài chỉnh, quần áo, sách.
          </p>
          <p>
            Các dự án mà Donation tham gia luôn mở rộng, đa dạng dưới nhiều phân
            mục: Trẻ em, Y tế, Giáo dục, Môi trường, Công nghệ,...
          </p>
          <p>
            Donation được tin dùng bởi các tổ chức uy tín như Quỹ Thiện Nguyện
            Cộng đồng,...
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
