import React from "react";
import M1 from '../../img/M1.jpg';
import M2 from '../../img/M2.jpg';

const Slider = () => {
          return (
            <div className="container-fluid p-0" style={{marginBottom: '90px'}}>
              <div id="header-carousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img className="w-100" src={M1} alt="Image" />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{maxWidth: '900px'}}>
                        <h4 className="text-white text-uppercase mb-md-3">Rent A Car</h4>
                        <h1 className="display-1 text-white mb-md-4">
                          Best Rental Cars In Your Location
                        </h1>
                        <a href className="btn btn-primary py-md-3 px-md-5 mt-2">Reserve Now</a>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img className="w-100" src={M2} alt="Image" />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{maxWidth: '900px'}}>
                        <h4 className="text-white text-uppercase mb-md-3">Rent A Car</h4>
                        <h1 className="display-1 text-white mb-md-4">
                          Quality Cars with Unlimited Miles
                        </h1>
                        <a href className="btn btn-primary py-md-3 px-md-5 mt-2">Reserve Now</a>
                      </div>
                    </div>
                  </div>
                </div>
                <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                  <div className="btn btn-dark" style={{width: '45px', height: '45px'}}>
                    <span className="carousel-control-prev-icon mb-n2" />
                  </div>
                </a>
                <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                  <div className="btn btn-dark" style={{width: '45px', height: '45px'}}>
                    <span className="carousel-control-next-icon mb-n2" />
                  </div>
                </a>
              </div>
            </div>
          );
};

export default Slider;