import React from "react";
import "../../styles/mainhomepage.css";

const CarouselOne = ({ festival }) => {
  // console.log(festival);

  return (
    <>
<<<<<<< HEAD
    <a  href={"/productsDetail/" + festival.festId}>   
    <img className="compo_carouselone_img"
    src={festival.mainImg}   
    />
    </a>
=======
      <a href={"/productsDetail/" + festival.festId}>
        <img className="compo_carouselone_img" src={festival.festMImg} />
      </a>
>>>>>>> 8daac155e7484f19dc6d8580eb1ce43d6fd18ae5
    </>
  );
};

export default CarouselOne;
