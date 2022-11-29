import React from "react";
import aboutImage from '../img/about.png';

const Introduction = () => {
  return (
    <div>
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-1 text-primary text-center">01</h1>
          <h1 className="display-4 text-uppercase text-center mb-5">
            Welcome To <span className="text-primary">MOVE</span>
          </h1>
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <img className="w-75 mb-4" src={aboutImage} alt="" />
              <p>
                Move is an online car rental marketplace where you can rent any car you want 
                , wherever you want it, according to your budget from a vibrant community of trusted hosts across the Pakistan. Whether
                  you're travleing in from another city or looking for a car close to you, Move allows you to rent a perfect car for any occasion,
                    while hosts can take the wheel of their futures by building an accessible, flexible, and 
                    scalable car sharing business from the ground up.
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-4 mb-2">
              <div
                className="d-flex align-items-center bg-#1d2021 p-4 mb-4"
                style={{height: 150}}
              >
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                  style={{width: 100, height: 100}}
                >
                  <i className="fa fa-2x fa-headset text-secondary"></i>
                </div>
                <h4 className="text-uppercase m-0">24/7 Car Rental Support</h4>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div
                className="d-flex align-items-center bg-secondary p-4 mb-4"
                style={{height: 150}}
              >
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                  style={{width: 100, height: 100}}
                >
                  <i className="fa fa-2x fa-car text-secondary"></i>
                </div>
                <h4 className="text-light text-uppercase m-0">
                  Car Reservation Anytime
                </h4>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div
                className="d-flex align-items-center bg-#1d2021 p-4 mb-4"
                style={{height: 150}}
              >
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                  style={{width: 100, height: 100}}
                >
                  <i className="fa fa-2x fa-map-marker-alt text-secondary"></i>
                </div>
                <h4 className="text-uppercase m-0">Lots Of Pickup Locations</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
