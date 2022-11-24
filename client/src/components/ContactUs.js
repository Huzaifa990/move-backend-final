import React from "react";

function ContactUs(){

    return (
        <div className="container-fluid py-5">
          <div className="container pt-5 pb-3">
            <h1 className="display-1 text-primary text-center">04</h1>
            <h1 className="display-4 text-uppercase text-center mb-5">Contact Us</h1>
            <div className="row">
              <div className="col-lg-7 mb-2">
                <div className="contact-form bg-light mb-4" style={{padding: '30px'}}>
                  <form>
                    <div className="row">
                      <div className="col-6 form-group">
                        <input type="text" className="form-control p-4" placeholder="Your Name" required="required" />
                      </div>
                      <div className="col-6 form-group">
                        <input type="email" className="form-control p-4" placeholder="Your Email" required="required" />
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control p-4" placeholder="Subject" required="required" />
                    </div>
                    <div className="form-group">
                      <textarea className="form-control py-3 px-4" rows={5} placeholder="Message" required="required" defaultValue={""} />
                    </div>
                    <div>
                      <button className="btn btn-primary py-3 px-5" type="submit">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-5 mb-2">
                <div className="bg-secondary d-flex flex-column justify-content-center px-5 mb-4" style={{height: '435px'}}>
                  <div className="d-flex mb-3">
                    <i className="fa fa-2x fa-map-marker-alt text-primary flex-shrink-0 mr-3" />
                    <div className="mt-n1">
                      <h5 className="text-light">Head Office</h5>
                      <p>BNU, TAROGIL CAMPUS</p>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <i className="fa fa-2x fa-map-marker-alt text-primary flex-shrink-0 mr-3" />
                    <div className="mt-n1">
                      <h5 className="text-light">Branch Office</h5>
                      <p>BNU, TAROGIL CAMPUS</p>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3" />
                    <div className="mt-n1">
                      <h5 className="text-light">Customer Service</h5>
                      <p>F2019-297@BNU.EDU.PK</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3" />
                    <div className="mt-n1">
                      <h5 className="text-light">Return &amp; Refund</h5>
                      <p className="m-0">F2019-297@BNU.EDU.PK</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
export default ContactUs;