import React from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import '../App.css';

const SlickSliderOffers = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <div className="offerSlider">
      <Slider {...settings}>
        <div className="offerSlideContent"><img src="src/assets/images/image1_f50.png" alt="Offer 1" /></div>
        <div className="offerSlideContent"><img src="src/assets/images/image2_f50.png" alt="Offer 2" /></div>
        <div className="offerSlideContent"><img src="src/assets/images/image3_f50.png" alt="Offer 3" /></div>
      </Slider>
    </div>
  );
};

export default SlickSliderOffers;