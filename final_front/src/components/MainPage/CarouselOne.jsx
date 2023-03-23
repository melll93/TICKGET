import React from 'react'

const CarouselOne = ({ festival }) => {
    console.log(festival);

    return (
        <div>
            <img
                src={festival.main_img}
                style={{
                    width: 280,
                    height: 350,
                    objectFit: "cover",
                    border: "1px solid black",
                }}
            />
        </div>
    )
}

export default CarouselOne