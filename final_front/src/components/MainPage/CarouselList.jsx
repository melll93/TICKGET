import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselOne from "./CarouselOne";
import '../../styles/mainhomepage.css'


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MainCarousel = ({ festivalToday }) => {
  // console.log(festivalToday);

  return (
    <>
      <Carousel responsive={responsive}>
        {festivalToday.map((festival, index) => (
          <CarouselOne key={index} festival={festival} />
          ))}
      </Carousel>
    </>
  );
};

export default MainCarousel;
