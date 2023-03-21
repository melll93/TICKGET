import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const MainCarousel = () => {
  return (
    <Carousel responsive={responsive}>
      <div>
        <img
          src="assets/1.jpg"
          style={{
            width: 280,
            height: 350,
            objectFit: "contain",
            border: "1px solid black",
          }}
        />
      </div>
      <div>
        <img
          src="assets/2.jpg"
          style={{
            width: 280,
            height: 350,
            objectFit: "contain",
            border: "1px solid black",
          }}
        />
      </div>
      <div>
        <img
          src="assets/3.jpg"
          style={{
            width: 280,
            height: 350,
            objectFit: "contain",
            border: "1px solid black",
          }}
        />
      </div>
      <div>
        <img
          src="assets/4.jpg"
          style={{
            width: 280,
            height: 350,
            objectFit: "contain",
            border: "1px solid black",
          }}
        />
      </div>
      <div>
        <img
          src="assets/5.jpg"
          style={{
            width: 280,
            height: 350,
            objectFit: "contain",
            border: "1px solid black",
          }}
        />
      </div>
      <div>
        <img
          src="assets/6.jpg"
          style={{
            width: 280,
            height: 350,
            objectFit: "contain",
            border: "1px solid black",
          }}
        />
      </div>
    </Carousel>
  );
};

export default MainCarousel;
