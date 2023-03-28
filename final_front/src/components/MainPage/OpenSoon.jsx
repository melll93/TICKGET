import { useState } from "react"
import Carousel  from "react-multi-carousel"
import OpenSoonImg from "./OpenSoonImg"

//예매 오픈 예정 행사 정보
const OpenSoon = ({openSoonList}) => {

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
 return (
    <>
    <div style={{ textAlign: "center", fontSize: "24px" }}>
      <h3>OpenSoon</h3>
        </div>
      <Carousel responsive={responsive} >
      {openSoonList.map((openSoon, index) => (
          <OpenSoonImg key={index} openSoon={openSoon} />
        ))}
        </Carousel>
      </>
  )
}

export default OpenSoon