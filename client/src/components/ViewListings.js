import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

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

  const bookingCar = () => {

    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const headers = {
        Authorization: userDetails,
    };

    var pickupDate = document.getElementById("pickDate").value+"Z";
    var dropOffDate = document.getElementById("dropDate").value+"Z";
    var paymentMethod = document.getElementById("COD").value;
    
    var car = location.state.id;

    console.log(car, dropOffDate, pickupDate,paymentMethod);

    axios
    .post(
      "http://localhost:8080/api/booking/",
      {
        car,
        pickupDate,
        dropOffDate,
        paymentMethod
      },
      {
        headers: headers,
      }
    )
    .then((res) => {
        console.log(res);
        document.getElementById("errorMessage").innerText = "Your Car Has Been Listed Successfully!";
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
        document.getElementById("errorApi").style.background = "green";

        document.getElementById("pickDate").style.border = "none";
        document.getElementById("dropDate").style.border = "none";

        document.getElementById("pickDate").value = "";
        document.getElementById("dropDate").value = "";

      

    }).catch((e)=>{
        console.log(e);

        if (e.response.data.msg !== undefined) {
            document.getElementById("errorMessage").innerText = e.response.data.msg;
            document.getElementById("pickDate").style.border = "none";
            document.getElementById("dropDate").style.border = "none";
            document.getElementById("errorApi").style.visibility = "visible";
            document.getElementById("errorApi").style.backgroundColor = "crimson";
            document.getElementById("errorApi").style.position = "relative";
          } else if (e.response.data.error.pickupDate !== undefined) {
            document.getElementById("errorApi").style.backgroundColor = "crimson";
            document.getElementById("pickDate").style.border = "2px solid crimson";
            document.getElementById("errorMessage").innerText = e.response.data.error.pickupDate;
            document.getElementById("errorApi").style.visibility = "visible";
            document.getElementById("errorApi").style.position = "relative";
            document.getElementById("errorApi").style.width = "100%";
          } else if (e.response.data.error.dropOffDate !== undefined) {
            document.getElementById("errorApi").style.backgroundColor = "crimson";
            document.getElementById("pickDate").style.border = "none";
            document.getElementById("dropDate").style.border = "2px solid crimson";
            document.getElementById("errorMessage").innerText = e.response.data.error.dropOffDate;
            document.getElementById("errorApi").style.visibility = "visible";
            document.getElementById("errorApi").style.position = "relative";
            document.getElementById("errorApi").style.width = "100%";
          }
    })


  }

  

  return (
    <>
   
           
            
        <div className="container-fluid pt-5">
        <div className="container pt-5 pb-3">
            <h1 className="display-4 text-uppercase mb-5">{name.company} {name.carName}</h1>
            <div className="row align-items-center pb-2">
                {
                    (img.length<3 && img.length > 1)
                    ? <><div className="col-lg-4 mb-4">
                      
                    <img className="img-fluid" src={img[0]} alt=""/>
                    <img className="img-fluid" src={img[1]} alt=""/>
                    </div>
                     </>
                    :(img.length<4 && img.length > 1)
                    ? <><div className="col-lg-4 mb-4">
                      
                    <img className="img-fluid" src={img[0]} alt=""/>
                    <img className="img-fluid" src={img[1]} alt=""/>
                    </div>
                    <div className="col-lg-6 mb-4">
                      
                    <img className="img-fluid" src={img[2]} alt=""/>
                    </div> </>

                    :(img.length<5  && img.length > 1)
                    ? <><div className="col-lg-4 mb-4">
                    
                    <img className="img-fluid" src={img[0]} alt=""/>
                    <img className="img-fluid" src={img[1]} alt=""/>
                    </div>
                    <div className="col-lg-4 mb-4">
                    
                    <img className="img-fluid" src={img[2]} alt=""/>
                    <img className="img-fluid" src={img[3]} alt=""/>
                    </div> </>
                    
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
                    
                    <h2 className="mb-4">Booking Detail</h2>
                    <label htmlFor id="errorApi">
                    {" "}
                    <span id="errorMessage"></span>
                    </label>
                    <div className="mb-5">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label for="">Pickup Date: </label>
                                <div className="date" id="date2" data-target-input="nearest">
                                    <input type="datetime-local" id="pickDate" className="form-control p-4 datetimepicker-input" placeholder="Pickup Date"
                                        data-target="#date2" data-toggle="datetimepicker" />
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <label for="">Dropoff Date: </label>
                                <div className="date" id="date2" data-target-input="nearest">
                                    <input type="datetime-local" id="dropDate" className="form-control p-4 datetimepicker-input" placeholder="Pickup Date"
                                        data-target="#date2" data-toggle="datetimepicker" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label for="">A Note For The Lessor: </label>
                            <textarea className="form-control py-3 px-4" rows="3" placeholder="Note.." required="required"></textarea>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="bg-secondary p-5 mb-5">
                        <h2 className="text-primary mb-4">Payment</h2>
                        <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="paypal" disabled/>
                                <label className="custom-control-label" for="paypal">Paypal</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="directcheck" disabled/>
                                <label className="custom-control-label" for="directcheck">Credit/ Debit Card</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="custom-control custom-radio">
                                <input checked type="radio" className="custom-control-input" name="payment" value="COD" id="COD"/>
                                <label className="custom-control-label" for="banktransfer">COD</label>
                            </div>
                        </div>
                    
                        <button className="btn btn-block btn-primary py-3" onClick={() => bookingCar()}>Reserve Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


              
           
      

    </>
  );
};

export default ViewListings;
