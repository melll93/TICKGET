import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselOne from "./CarouselOne";
import "../../styles/mainhomepage.css";




const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 40,
    transitionDuration: 500, // 추가
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 5,
    slideToslide: 1 ,
    transitionDuration: 500, // 추가
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
const [movingImg, setMovingImg] = useState(2);


const customTransition = {
  enter: {
    transform: 'translateX(0)',
    opacity: 1,
  },
  exit: {
    transform: 'translateX(-50px)',
    opacity: 0.5,
  },
};


  return (
    <div className="carouselDiv">
<Carousel
  responsive={responsive}
  infinite
  autoPlay
  autoPlaySpeed={3000}
  beforeChange={() =>
    setMovingImg((prevSlide) => (prevSlide + 1) % festivalToday.length)
  }
  arrows={true}
  draggable={true}
  swipeable={true}
  customTransition={customTransition} // 추가
  
>
      {festivalToday.map((festival, index) => (
        <CarouselOne key={index} festival={festival} isActive={index === movingImg} />
      ))}
    </Carousel>
  </div>
);
};
export default MainCarousel;
