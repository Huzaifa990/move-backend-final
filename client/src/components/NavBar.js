import React from "react";

const NavBar = () => {
  return (
    <div>
      <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
        <div className="row">
          <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <a className="text-body pr-3" href="Greet.js">
                <i className="fa fa-phone-alt mr-2"></i>+92-3315069961
              </a>
              <span className="text-body">|</span>
              <a className="text-body px-3" href="Greet.js">
                <i className="fa fa-envelope mr-2"></i>F2019-297@BNU.EDU.PK
              </a>
            </div>
          </div>
          <div className="col-md-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-body px-3" href="Greet.js">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="text-body px-3" href="Greet.js">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-body px-3" href="Greet.js">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="text-body px-3" href="Greet.js">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="text-body pl-3" href="Greet.js">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid position-relative nav-bar p-0">
        <div className="position-relative px-lg-5 navbar-front">
          <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
            <a href="Greet.js" className="navbar-brand">
              <h1 className="text-uppercase text-primary mb-1">MOVE</h1>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between px-3"
              id="navbarCollapse"
            >
              <div className="navbar-nav ml-auto py-0">
                <a href="Greet.js" className="nav-item nav-link active">
                  Home
                </a>
                <a href="Greet.js" className="nav-item nav-link">
                  About
                </a>
                <a href="Greet.js" className="nav-item nav-link">
                  Service
                </a>

                <a href="Greet.js" className="nav-item nav-link">
                  Car Listings
                </a>
               
                <div className="nav-item dropdown">
                  <div className="dropdown-menu rounded-0 m-0">
                    <a href="Greet.js" className="dropdown-item">
                      The Team
                    </a>
                    <a href="Greet.js" className="dropdown-item">
                      Testimonial
                    </a>
                  </div>
                </div>
                <a href="Greet.js" className="nav-item nav-link">
                  Contact
                </a>
                <a href="Greet.js" className="nav-item nav-link">
                  SIGN UP/ LOGIN
                </a>
                <a href="Greet.js" className="nav-item nav-link">
                  My Listings
                </a>
                <a href="Greet.js" className="nav-link btn-primary">
                  LIST YOUR CAR
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
