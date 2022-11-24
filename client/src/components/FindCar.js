import React from "react";
import '../index.css'
import Car1 from '../img/c180.jpg';
import Car2 from '../img/m3.jpg';


function FindCar(){
    return (
            <div className="container-fluid py-5">
              <div className="container pt-5 pb-3">
                <h1 className="display-1 text-primary text-center">03</h1>
                <h1 className="display-4 text-uppercase text-center mb-5">Find Your Car</h1>
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-2">
                    <div className="rent-item mb-4">
                      <img className="img-fluid mb-4 car-listings" src={Car1} alt="" />
                      <h4 className="text-uppercase mb-4">Mercedes Benz C180</h4>
                      <div className="d-flex justify-content-center mb-4">
                        <div className="px-2">
                          <i className="fa fa-car text-primary mr-1" />
                          <span>2015</span>
                        </div>
                        <div className="px-2 border-left border-right">
                          <i className="fa fa-cogs text-primary mr-1" />
                          <span>AUTO</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-road text-primary mr-1" />
                          <span>25K</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-map-marker text-primary mr-1" />
                          <span>LAHORE</span>
                        </div>
                      </div>
                      <a className="btn btn-primary px-3" href="Footer.js">$99.00/Day</a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <div className="rent-item active mb-4">
                      <img className="img-fluid mb-4 car-listings" src={Car2} alt="" />
                      <h4 className="text-uppercase mb-4">BMW M3 COMPETITION</h4>
                      <div className="d-flex justify-content-center mb-4">
                        <div className="px-2">
                          <i className="fa fa-car text-primary mr-1" />
                          <span>2019</span>
                        </div>
                        <div className="px-2 border-left border-right">
                          <i className="fa fa-cogs text-primary mr-1" />
                          <span>MANUAL</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-road text-primary mr-1" />
                          <span>55K</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-map-marker text-primary mr-1" />
                          <span>Karachi</span>
                        </div>
                      </div>
                      <a className="btn btn-primary px-3" href="Footer.js">$100.00/Day</a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <div className="rent-item mb-4">
                      <img className="img-fluid mb-4 car-listings" src={Car1} alt="" />
                      <h4 className="text-uppercase mb-4">Honda Civic Type-R</h4>
                      <div className="d-flex justify-content-center mb-4">
                        <div className="px-2">
                          <i className="fa fa-car text-primary mr-1" />
                          <span>2019</span>
                        </div>
                        <div className="px-2 border-left border-right">
                          <i className="fa fa-cogs text-primary mr-1" />
                          <span>MANUAL</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-road text-primary mr-1" />
                          <span>55K</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-map-marker text-primary mr-1" />
                          <span>Karachi</span>
                        </div>
                      </div>
                      <a className="btn btn-primary px-3" href="Footer.js">$100.00/Day</a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <div className="rent-item mb-4">
                      <img className="img-fluid mb-4 car-listings" src={Car1} alt="" />
                      <h4 className="text-uppercase mb-4">Mercedes Benz C180</h4>
                      <div className="d-flex justify-content-center mb-4">
                        <div className="px-2">
                          <i className="fa fa-car text-primary mr-1" />
                          <span>2015</span>
                        </div>
                        <div className="px-2 border-left border-right">
                          <i className="fa fa-cogs text-primary mr-1" />
                          <span>AUTO</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-road text-primary mr-1" />
                          <span>25K</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-map-marker text-primary mr-1" />
                          <span>LAHORE</span>
                        </div>
                      </div>
                      <a className="btn btn-primary px-3" href="Footer.js">$99.00/Day</a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <div className="rent-item active mb-4">
                      <img className="img-fluid mb-4 car-listings" src={Car2} alt="" />
                      <h4 className="text-uppercase mb-4">BMW M3 COMPETITION</h4>
                      <div className="d-flex justify-content-center mb-4">
                        <div className="px-2">
                          <i className="fa fa-car text-primary mr-1" />
                          <span>2019</span>
                        </div>
                        <div className="px-2 border-left border-right">
                          <i className="fa fa-cogs text-primary mr-1" />
                          <span>MANUAL</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-road text-primary mr-1" />
                          <span>55K</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-map-marker text-primary mr-1" />
                          <span>Karachi</span>
                        </div>
                      </div>
                      <a className="btn btn-primary px-3" href="Footer.js">$100.00/Day</a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-2">
                    <div className="rent-item mb-4">
                      <img className="img-fluid mb-4 car-listings" src={Car1} alt="" />
                      <h4 className="text-uppercase mb-4">Honda Civic Type-R</h4>
                      <div className="d-flex justify-content-center mb-4">
                        <div className="px-2">
                          <i className="fa fa-car text-primary mr-1" />
                          <span>2019</span>
                        </div>
                        <div className="px-2 border-left border-right">
                          <i className="fa fa-cogs text-primary mr-1" />
                          <span>MANUAL</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-road text-primary mr-1" />
                          <span>55K</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-map-marker text-primary mr-1" />
                          <span>Karachi</span>
                        </div>
                      </div>
                      <a className="btn btn-primary px-3" href="Footer.js">$100.00/Day</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
}
export default FindCar;