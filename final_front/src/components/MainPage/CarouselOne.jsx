import React from "react";

const CarouselOne = ({ festival }) => {
  // console.log(festival);

  return (
    <img
      src={festival.mainImg}
      style={{
        width: 280,
        height: 350,
        objectFit: "cover",
        border: "1px solid black",
      }}
    />
  );
};

export default CarouselOne;
