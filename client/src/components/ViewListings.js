import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";



const ViewListings = () => {
    const location = useLocation(); 
    console.log(location.state.id);
  const [name, setName] = useState([]);
  const [img, setImg] = useState([]);

  useEffect(() => {
    names();
  });
  var imgg = [];
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const names = async () => {
    const response = await fetch("http://localhost:8080/api/listing/"+location.state.id,{
        headers: {Authorization: userDetails}
      });
    console.log(response);
    const data = await response.json();
    imgg = data.item.picture;
    setImg(imgg);
    console.log(imgg)
    console.log(data.item);
    setName(data.item);
  };

  

  return (
    <>
   
           
            
        <div className="container-fluid pt-5">
        <div className="container pt-5 pb-3">
            <h1 className="display-4 text-uppercase mb-5">{name.company} {name.carName}</h1>
            <div className="row align-items-center pb-2">
                {
                    (img.length>1)
                    ? <div className="col-lg-4 mb-4">
                      
                    <img className="img-fluid" src={img[0]} alt=""/>
                    <img className="img-fluid" src={img[1]} alt=""/>
                    </div>
                    : <div className="col-lg-6 mb-4">
                      
                    <img className="img-fluid" src={img[0]} alt=""/>
                    </div>
                }
                
                <div className="col-lg-6 mb-4">
                    <h4 className="mb-2">PKR{name.rentPerDay}/Day</h4>
                    <div className="d-flex mb-3">
                        <h6 className="mr-2">Rating:</h6>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star-half-alt text-primary mr-1"></small>
                            <small>(250)</small>
                        </div>
                    </div>
                    <p>Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam ipsum et, tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor consetetur takimata eirmod, dolores takimata consetetur invidunt</p>
                    <div className="d-flex pt-1">
                        <h6>Share on:</h6>
                        <div className="d-inline-flex">
                            <a className="px-2" href="/"><i className="fab fa-facebook-f"></i></a>
                            <a className="px-2" href="/"><i className="fab fa-twitter"></i></a>
                            <a className="px-2" href="/"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-n3 mt-lg-0 pb-4">
                <div className="col-md-3 col-6 mb-2">
                    <i className="fa fa-car text-primary mr-2"></i>
                    <span>Model: {name.model}</span>
                </div>
                <div className="col-md-3 col-6 mb-2">
                    <i className="fa fa-cogs text-primary mr-2"></i>
                    <span>{name.transmission}</span>
                </div>
                <div className="col-md-3 col-6 mb-2">
                    <i className="fa fa-road text-primary mr-2"></i>
                    <span>20km/liter</span>
                </div>
                <div className="col-md-3 col-6 mb-2">
                    <i className="fa fa-eye text-primary mr-2"></i>
                    <span>GPS Navigation</span>
                </div>
                
            </div>
        </div>
    </div>


    
    <div className="container-fluid pb-5">
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <h2 className="mb-4">Personal Detail</h2>
                    <div className="mb-5">
                        <div className="row">
                            <div className="col-6 form-group">
                                <input type="text" className="form-control p-4" placeholder="First Name" required="required"/>
                            </div>
                            <div class="col-6 form-group">
                                <input type="text" className="form-control p-4" placeholder="Last Name" required="required"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 form-group">
                                <input type="email" className="form-control p-4" placeholder="Your Email" required="required"/>
                            </div>
                            <div class="col-6 form-group">
                                <input type="text" className="form-control p-4" placeholder="Mobile Number" required="required"/>
                            </div>
                        </div>
                    </div>
                    <h2 className="mb-4">Booking Detail</h2>
                    <div className="mb-5">
                        
                        <div className="row">
                            <div className="col-6 form-group">
                                <div clclassNameass="date" id="date2" data-target-input="nearest">
                                    <input type="text" className="form-control p-4 datetimepicker-input" placeholder="Pickup Date"
                                        data-target="#date2" data-toggle="datetimepicker" />
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <div className="time" id="time2" data-target-input="nearest">
                                    <input type="text" className="form-control p-4 datetimepicker-input" placeholder="Pickup Time"
                                        data-target="#time2" data-toggle="datetimepicker" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <textarea className="form-control py-3 px-4" rows="3" placeholder="Special Request" required="required"></textarea>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="bg-secondary p-5 mb-5">
                        <h2 className="text-primary mb-4">Payment</h2>
                        <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="paypal"/>
                                <label className="custom-control-label" for="paypal">Paypal</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="directcheck"/>
                                <label className="custom-control-label" for="directcheck">Credit/ Debit Card</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="banktransfer"/>
                                <label className="custom-control-label" for="banktransfer">Bank Transfer</label>
                            </div>
                        </div>
                    
                        <button className="btn btn-block btn-primary py-3">Reserve Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


              
           
      

    </>
  );
};

export default ViewListings;
