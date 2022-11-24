import React from "react";

const Discount = () => {
  return (
    <div>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="bg-banner py-5 px-4 text-center">
            <div className="py-5">
              <h1 className="display-1 text-uppercase text-primary mb-4">
                10% OFF
              </h1>
              <h1 className="text-uppercase text-light mb-4">
                Special Offer For New Members
              </h1>
              <p className="mb-4">Only for Sunday from 1st Jan to 30th Jan 2023</p>
              <a className="btn btn-primary mt-2 py-3 px-5" href="SubServices.js">
                Sign Up Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
