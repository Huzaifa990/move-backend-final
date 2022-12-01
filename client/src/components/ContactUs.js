import React from "react";
import axios from "axios";

const ContactUs = (props) => {

const sendData = ()=>{
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;
  axios.post("http://localhost:8080/api/contact",{
      name,
      email,
      subject,
      message
  })
  .then((res) => {
      console.log(res);
      document.getElementById("name").value='';
      document.getElementById("email").value='';
      document.getElementById("subject").value='';
      document.getElementById("message").value='';

      document.getElementById("errorApi").style.visibility="hidden";
      document.getElementById("errorApi").style.position="absolute";
      document.getElementById("errorApi").style.width="0%";

      document.getElementById("successApi").style.visibility="visible";
      document.getElementById("successApi").style.position="relative";
      document.getElementById("successApi").style.width="100%";

    }).catch((e) =>{
      console.log(e);
      if(e.response.data.error.name !== undefined){
        document.getElementById("name").style.border="2px solid crimson";
        document.getElementById("errorMessage").innerText = e.response.data.error.name;
        document.getElementById("errorApi").style.visibility="visible";
        document.getElementById("errorApi").style.position="relative";
        document.getElementById("errorApi").style.width="100%";

        document.getElementById("successApi").style.visibility="hidden";
        document.getElementById("successApi").style.position="absolute";
        document.getElementById("successApi").style.width="0%";
      }
      else if(e.response.data.error.email !== undefined){
        document.getElementById("name").style.border="none";
        document.getElementById("email").style.border="2px solid crimson";
        document.getElementById("errorMessage").innerText = e.response.data.error.email;
        document.getElementById("errorApi").style.visibility="visible";
        document.getElementById("errorApi").style.position="relative";

        document.getElementById("successApi").style.visibility="hidden";
        document.getElementById("successApi").style.position="absolute";
        document.getElementById("successApi").style.width="0%";
      }
      else if(e.response.data.error.subject !== undefined){
        document.getElementById("name").style.border="none";
        document.getElementById("email").style.border="none";
        document.getElementById("subject").style.border="2px solid crimson";
        document.getElementById("errorMessage").innerText = e.response.data.error.password;
        document.getElementById("errorApi").style.visibility="visible";
        document.getElementById("errorApi").style.position="relative";

        document.getElementById("successApi").style.visibility="hidden";
        document.getElementById("successApi").style.position="absolute";
        document.getElementById("successApi").style.width="0%";
      }
      else if(e.response.data.error.message !== undefined){
        document.getElementById("name").style.border="none";
        document.getElementById("email").style.border="none";
        document.getElementById("subject").style.border="none";
        document.getElementById("message").style.border="2px solid crimson";
        document.getElementById("errorMessage").innerText = e.response.data.error.confirmPassword;
        document.getElementById("errorApi").style.visibility="visible";
        document.getElementById("errorApi").style.position="relative";

        document.getElementById("successApi").style.visibility="hidden";
        document.getElementById("successApi").style.position="absolute";
        document.getElementById("successApi").style.width="0%";
      }
    });
}

    return (
        <div>
          <div className="container-fluid py-5">
            <div className="container pt-5 pb-3">
              <h1 className="display-1 text-primary text-center">0{props.numbering}</h1>
              <h1 className="display-4 text-uppercase text-center mb-5">Contact Us</h1>
              <div className="row">
                <div className="col-lg-7 mb-2">
                  <div className="contact-form bg-secondary mb-4" style={{padding: '30px'}}>
                  <label htmlFor id="errorApi"> <span id="errorMessage"></span></label>
                  <label htmlFor id="successApi"> <span id="errorMessage">We will get back to you shortly!</span></label>
                    
                      <div className="row">
                        <div className="col-6 form-group">
                          <input type="text" className="form-control p-4" placeholder="Your Name" required="required" id="name" />
                        </div>
                        <div className="col-6 form-group">
                          <input type="email" className="form-control p-4" placeholder="Your Email" required="required" id="email" />
                        </div>
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control p-4" placeholder="Subject" required="required" id="subject" />
                      </div>
                      <div className="form-group">
                        <textarea className="form-control py-3 px-4" rows={5} placeholder="Message" required="required" defaultValue={""} id="message" />
                      </div>
                      <div>
                        <button className="btn btn-primary py-3 px-5" onClick={sendData}>
                          Send Message
                        </button>
                      </div>
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
        </div>
      );
}
export default ContactUs;