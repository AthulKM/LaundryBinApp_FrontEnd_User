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
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <div className="offerSlider">
      <Slider {...settings} className="offerSlideContent">
        <img className='h-100 w-100' src="src/assets/images/image1_f50.png" alt="Offer 1" />
        <img className='h-100 w-100' src="src/assets/images/image2_f50.png" alt="Offer 2" />
        <img src="src/assets/images/image3_f50.png" alt="Offer 3" />
      </Slider>
    </div>
  );
};

export default SlickSliderOffers;