import React from "react";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";



const EditBooking = () => {

    const location = useLocation();
    const navigate = useNavigate();


    async function getData(){   
        var userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const response = await fetch("http://localhost:8080/api/booking/" + location.state.id, {
            headers: { Authorization: userDetails },
        });
        console.log(response);
        const data = await response.json();
        console.log(data.carBooking);
        fillForm(data.carBooking)
    }

    getData();
    var car = "";
    function fillForm(data){
        var pickUpDate = data.pickupDate;
        var dropOffDate = data.dropOffDate;
        car = data.car._id;
        console.log(car);
        var requiredPickDate = "";
        var requiredDropDate = "";

        for(var i = 0; i < pickUpDate.length-1; i++){
            requiredPickDate += pickUpDate[i];
        }

        for(var x = 0; x < dropOffDate.length-1; x++){
            requiredDropDate += dropOffDate[x];
        }

        document.getElementById("pickDate").value = requiredPickDate;
        document.getElementById("dropDate").value = requiredDropDate;
    }

    function editBooking(){
        alert("Funcation");
        var pickupDate = document.getElementById("pickDate").value+"Z";
        var dropOffDate = document.getElementById("dropDate").value+"Z";
        var paymentMethod = document.getElementById("COD").value;

        var userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const headers = {
            Authorization: userDetails,
        };

        axios
    .put(
      "http://localhost:8080/api/booking/" + location.state.id,
      {
        car,
        pickupDate,
        dropOffDate,
        paymentMethod
      },
      {
        headers: headers,
      }
    ).then((res)=>{
        console.log(res);
        document.getElementById("errorMessage").innerText = "Your Booking Has Been Updated Successfully!";
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
        document.getElementById("errorApi").style.background = "green";

        document.getElementById("pickDate").style.border = "none";
        document.getElementById("dropDate").style.border = "none";

        document.getElementById("pickDate").value = "";
        document.getElementById("dropDate").value = "";

         setTimeout(()=>{
            navigate("/myBookings");
         }, 2000) 
    }).catch((e)=>{
        console.log(e);
        if (e.response.data.msg !== undefined) {
            document.getElementById("errorMessage").innerText = e.response.data.msg;
            document.getElementById("pickDate").style.border = "none";
            document.getElementById("dropDate").style.border = "none";
            document.getElementById("errorApi").style.visibility = "visible";
            document.getElementById("errorApi").style.backgroundColor = "crimson";
            document.getElementById("errorApi").style.position = "relative";
          } else if (e.response.data.error.car !== undefined) {
            document.getElementById("errorApi").style.backgroundColor = "crimson";
            document.getElementById("pickDate").style.border = "2px solid crimson";
            document.getElementById("errorMessage").innerText = e.response.data.error.car;
            document.getElementById("errorApi").style.visibility = "visible";
            document.getElementById("errorApi").style.position = "relative";
            document.getElementById("errorApi").style.width = "100%";
          }
           else if (e.response.data.error.pickupDate !== undefined) {
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
      <div className="container-fluid pb-5" style={{paddingTop: "60px"}}>
        <div className="container">
          <div className="row p-30">
            <div className="col-lg-8 pt-30">
              <h2 className="mb-4">Edit Booking Details</h2>
              <label htmlFor id="errorApi">
                {" "}
                <span id="errorMessage"></span>
              </label>
              <div className="mb-5">
                <div className="row">
                  <div className="col-6 form-group">
                    <label for="">Edit Pickup Date: </label>
                    <div className="date" id="date2" data-target-input="nearest">
                      <input
                        type="datetime-local"
                        id="pickDate"
                        className="form-control p-4 datetimepicker-input"
                        placeholder="Pickup Date"
                        data-target="#date2"
                        data-toggle="datetimepicker"
                      />
                    </div>
                  </div>
                  <div className="col-6 form-group">
                    <label for="">Edit Dropoff Date: </label>
                    <div className="date" id="date2" data-target-input="nearest">
                      <input
                        type="datetime-local"
                        id="dropDate"
                        className="form-control p-4 datetimepicker-input"
                        placeholder="Pickup Date"
                        data-target="#date2"
                        data-toggle="datetimepicker"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label for="">A Note For The Lessor: </label>
                  <textarea
                    className="form-control py-3 px-4"
                    rows="3"
                    placeholder="Note.."
                    required="required"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="bg-secondary p-5 mb-5">
                <h2 className="text-primary mb-4">Payment</h2>
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="paypal"
                      disabled
                    />
                    <label className="custom-control-label" for="paypal">
                      Paypal
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="directcheck"
                      disabled
                    />
                    <label className="custom-control-label" for="directcheck">
                      Credit/ Debit Card
                    </label>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <div className="custom-control custom-radio">
                    <input
                      checked
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      value="COD"
                      id="COD"
                    />
                    <label className="custom-control-label" for="banktransfer">
                      COD
                    </label>
                  </div>
                </div>

                <button className="btn btn-block btn-primary py-3" onClick={editBooking}>
                  Update Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBooking;
