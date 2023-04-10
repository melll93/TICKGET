import React from "react";
import '../../styles/mainhomepage.css'


const CarouselOne = ({ festival }) => {
  // console.log(festival);

  return (
    <>
    <a  href={"/productsDetail/" + festival.festId}>   
    <img className="compo_carouselone_img"
    src={festival.mainImg}   
    style={{ width: '130px', height: '130px', borderRadius: '50%', margin: '5px' }} />
    </a>
    </>
  );
};

export default CarouselOne;
