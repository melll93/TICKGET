import React from "react";
import { Link } from "react-router-dom";
import "../../styles/mainhomepage.css";

const CarouselOne = ({ festival, isActive }) => {
  // console.log(festival);

  return (
    <>
    <div className={`carouseloneDiv${isActive ? "" : ""}`} style={{height:'350px'}}>
    <Link to={`/productsDetail/${festival.festMId}`}>
    <img className="compo_carouselone_img"  src={festival.festMImg} /> 
       </Link>
    <p style={{textAlign:'center'}}>{festival.festMName}</p>
    </div>
    </>
  );
};

export default CarouselOne;
