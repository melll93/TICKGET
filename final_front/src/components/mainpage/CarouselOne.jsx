import React from "react";
import { Link } from "react-router-dom";
import "../../styles/mainhomepage.css";

const CarouselOne = ({ festival, isActive }) => {
  // console.log(festival);

  return (
    <>
    <div className={`carouseloneDiv${isActive ? "active" : ""}`}>
    <Link to={`/productsDetail/${festival.festMId}`}>
    <img className="compo_carouselone_img"  src={festival.festMImg} /> 
       </Link>
    </div>
    </>
  );
};

export default CarouselOne;
