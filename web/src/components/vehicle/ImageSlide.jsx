import React from "react";
import Slider from "react-slick";
function ImageSlide(props) {
  const vehicle = props.vehicle;
  return (
    <div className="vehicle__header">
      <Slider
        dots={true}
        infinite={true}
        slidesToShow={3}
        speed={800}
        responsive={[
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {vehicle.images.map((item, index) => {
          return (
            <div className="image-wrapper">
              <img src={"http://127.0.0.1:8000/"+item.link} alt="vl" className="d-block w-100" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default React.memo(ImageSlide);
