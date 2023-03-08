import React from "react";
import M1 from "../../img/carousel-1.jpg";
import M2 from "../../img/carousel-2.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex(index + 1);
    if (index === 1) {
      setIndex(0);
    }
  };
  const handlePrev = () => {
    setIndex(index - 1);
    if (index === 0) {
      setIndex(1);
    }
  };

  setTimeout(() => {
    handleNext();
  }, 5000);

  return (
    <div className="container-fluid p-0" style={{ marginBottom: "90px" }}>
      <div id="header-carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="w-100" src={index === 0 ? M1 : M2} alt="Carousel" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "900px" }}>
                <h4 className="text-white text-uppercase mb-md-3">
                  {index === 0 ? "Reserve Now" : "Reserve Now"}
                </h4>
                <h1 className="display-1 text-white mb-md-4">
                  {index === 0
                    ? "Best Rental Cars In Your Location"
                    : "Quality Cars with Unlimited Miles"}
                </h1>
                <Link className="btn btn-primary py-md-3 px-md-5 mt-2" to="/listings">
                  Reserve Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
          <div className="btn btn-dark" style={{ width: "45px", height: "45px" }}>
            <span className="carousel-control-prev-icon mb-n2" onClick={handlePrev} />
          </div>
        </a>
        <a className="carousel-control-next" href="#header-carousel" data-slide="next">
          <div className="btn btn-dark" style={{ width: "45px", height: "45px" }}>
            <span className="carousel-control-next-icon mb-n2" onClick={handleNext} />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Slider;
