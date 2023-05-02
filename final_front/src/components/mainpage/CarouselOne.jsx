import React from "react";
import { Link } from "react-router-dom";
import "../../styles/mainhomepage.css";

const CarouselOne = ({ festival, isActive }) => {
  const containerStyle = {
    position: "relative",
    height: "400px",
    width: "300px", // 이미지 크기 조절을 위해 추가
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover", // 이미지 비율 유지를 위해 추가
  };

  const titleStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    textAlign: "center",
    padding: "10px",
  };

  return (
    <div className={`carouseloneDiv${isActive ? "" : ""}`} style={containerStyle}>
      <Link to={`/productsDetail/${festival.festMId}`}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img className="compo_carouselone_img" src={festival.festMImg} style={imageStyle} />
          <div style={titleStyle}>
            <p style={{fontSize:'0.8rem'}}>{festival.festMName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarouselOne;