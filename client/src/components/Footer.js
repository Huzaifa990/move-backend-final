import React from "react";
import CG1 from '../img/gallery-1.jpg';
import CG2 from '../img/gallery-2.jpg';
import CG3 from '../img/gallery-3.jpg';
import { Link } from "react-router-dom";

function Footer(){
    return (

        <div className="container-fluid bg-secondary text-left py-5 px-sm-3 px-md-5" style={{marginTop: '90px'}}>
          <div className="row pt-5">
            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-uppercase text-light mb-4">Get In Touch</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt text-white mr-3" />BNU, TAROGIL
                CAMPUS
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt text-white mr-3" />+012 345 67890
              </p>
              <p>
                <i className="fa fa-envelope text-white mr-3" />F2019-297@BNU.EDU.PK
              </p>
              <h6 className="text-uppercase text-white py-2">Follow Us</h6>
              <div className="d-flex justify-content-start">
                <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="Contact.js"><i className="fab fa-twitter" /></a>
                <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="Contact.js"><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="Contact.js"><i className="fab fa-linkedin-in" /></a>
                <a className="btn btn-lg btn-dark btn-lg-square" href="Contact.js"><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-uppercase text-light mb-4">Useful Links</h4>
              <div className="d-flex flex-column justify-content-start">
                <a className="text-body mb-2" href="Contact.js"><i className="fa fa-angle-right text-white mr-2" />Private
                  Policy</a>
                <a className="text-body mb-2" href="/termsandconditions"><i className="fa fa-angle-right text-white mr-2" />Term &amp;
                  Conditions</a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-uppercase text-light mb-4">Car Gallery</h4>
              <div className="rowLis mx-n1">
                <div className="col-4 px-1 mb-2">
                  <a href><img className="w-100" src={CG1} alt="" /></a>
                </div>
                <div className="col-4 px-1 mb-2">
                  <a href><img className="w-100" src={CG2} alt="" /></a>
                </div>
                <div className="col-4 px-1 mb-2">
                  <a href><img className="w-100" src={CG3} alt="" /></a>
                </div>
                <div className="col-4 px-1 mb-2">
                  <a href><img className="w-100" src={CG1} alt="" /></a>
                </div>
                <div className="col-4 px-1 mb-2">
                  <a href><img className="w-100" src={CG2} alt="" /></a>
                </div>
                <div className="col-4 px-1 mb-2">
                  <a href><img className="w-100" src={CG3} alt="" /></a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-uppercase text-light mb-4">Reach Out!</h4>
              <Link to="/contact" className="btn btn-primary p-2">Contact Us</Link>
            </div>
          </div>

            <a href="Contact.js" class="btn btn-lg btn-primary btn-lg-square back-to-top">
            <i class="fa fa-angle-double-up"></i>
            </a>

        </div>
      );
}
export default Footer;