import React from "react";
import "../../styles/mainhomepage.css";

const CarouselOne = ({ festival }) => {
  // console.log(festival);

  return (
    <>
      <a href={"/productsDetail/" + festival.festId}>
        <img className="compo_carouselone_img" src={festival.festMImg} />
      </a>
    </>
  );
};

export default CarouselOne;
