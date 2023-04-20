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
const [movingImg, setMovingImg] = useState(2);



  return (
    <div className="carouselDiv">
      <Carousel 
      responsive={responsive}
      infinite 
      autoPlay
      autoPlaySpeed={3000}
      sliderClass=""
      beforeChange={() => setMovingImg((prevSlide) => (prevSlide + 1) % festivalToday.length)}
      customTransition="transform 500ms ease-in-out"
      centerMode
/*       centerSlidePercentage={100 / (responsive.desktop.items + 1)} */
     draggable={false}
      swipeable={false}
/*       focusOnSelect={false} */
/*       removeArrowOnDeviceType={["tablet", "mobile"]} */
      arrows={false}
      slidesToSlide={1}
/*       containerClass="carousel-container" */
/*       itemClass="carousel-item" */
      >

        {festivalToday.map((festival, index) => (
          <CarouselOne key={index} festival={festival} 
          isActive={index === movingImg}/>
        ))}
      </Carousel>
    </div>
  );
};

export default MainCarousel;
