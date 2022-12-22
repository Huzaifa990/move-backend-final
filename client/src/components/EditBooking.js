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
        var requiredPickTime = "";
        var requiredDropDate = "";
        var requiredDropTime = "";
        var chk1 = false;
        var chk2 = false;

        for(var i = 0; i < pickUpDate.length-1; i++){
            if(pickUpDate[i] === "T"){
                chk1=true;
                i++;
            }
            if(chk1 !== true){
              requiredPickDate += pickUpDate[i];
            }
            else{
              requiredPickTime +=pickUpDate[i];
            }
            
        }

        for(var x = 0; x < dropOffDate.length-1; x++){
          if(dropOffDate[x] === "T"){
            chk2=true;
            x++;
        }
        if(chk2 !== true){
          requiredDropDate += dropOffDate[x];
        }
        else{
          requiredDropTime +=dropOffDate[x];
        }
        }

         document.getElementById("pickDate").value = requiredPickDate;
         document.getElementById("dropDate").value = requiredDropDate;
         document.getElementById("pickTime").value = requiredPickTime;
         document.getElementById("dropTime").value = requiredDropTime;
        
    }

    
  function timeFix(){
    const timeInput1 = document.getElementById('pickTime');

        timeInput1.addEventListener('input', (e) => {
        let hour = e.target.value.split(':')[0]
        e.target.value = `${hour}:00`
        })

        const timeInput2 = document.getElementById('dropTime');

        timeInput2.addEventListener('input', (e) => {
        let hour = e.target.value.split(':')[0]
        e.target.value = `${hour}:00`
        })
  }

  setTimeout(timeFix, 2000);

    function editBooking(){
      var pickDate = document.getElementById("pickDate").value;
      var pickTime = document.getElementById("pickTime").value;
      var dropDate = document.getElementById("dropDate").value;
      var dropTime = document.getElementById("dropTime").value;

      let hour1 = pickTime.split(':')[0]
      pickTime = `${hour1}:00`

      let hour2 = dropTime.split(':')[0]
      dropTime = `${hour2}:00`
  
      var pickupDate = pickDate+"T"+pickTime+"Z";
      var dropOffDate = dropDate+"T"+dropTime+"Z";
      console.log(pickupDate);
      console.log(dropOffDate);
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
        document.getElementById("pickTime").style.border = "none";
        document.getElementById("dropTime").style.border = "none";

        document.getElementById("pickDate").value = "";
        document.getElementById("dropDate").value = "";
        document.getElementById("pickTime").value = "";
        document.getElementById("dropTime").value = "";

         setTimeout(()=>{
            navigate("/myBookings");
         }, 2000) 
    }).catch((e)=>{
        console.log(e);
        if (e.response.data.msg !== undefined) {
          document.getElementById("errorMessage").innerText = e.response.data.msg;
          document.getElementById("pickDate").style.border = "none";
          document.getElementById("dropDate").style.border = "none";
          document.getElementById("pickTime").style.border = "none";
          document.getElementById("dropTime").style.border = "none";
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.backgroundColor = "crimson";
          document.getElementById("errorApi").style.position = "relative";
        } else if (e.response.data.error.pickupDate !== undefined) {
          document.getElementById("errorApi").style.backgroundColor = "crimson";
          document.getElementById("pickDate").style.border = "2px solid crimson";
          document.getElementById("pickTime").style.border = "2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.pickupDate;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
          document.getElementById("errorApi").style.width = "100%";
        } else if (e.response.data.error.dropOffDate !== undefined) {
          document.getElementById("errorApi").style.backgroundColor = "crimson";
          document.getElementById("pickDate").style.border = "none";
          document.getElementById("pickTime").style.border = "none";
          document.getElementById("dropDate").style.border = "2px solid crimson";
          document.getElementById("dropTime").style.border = "2px solid crimson";
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
                                    <input type="date" id="pickDate" className="form-control p-4 datetimepicker-input" placeholder="Pickup Date"
                                        data-target="#date2"/>
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <label for="">Edit Pickup Time: </label>
                                <div className="date" id="date2" data-target-input="nearest">
                                    <input type="time" id="pickTime" className="form-control p-4 datetimepicker-input" placeholder="Pickup Date"
                                        data-target="#date2"/>
                                </div>
                           
                  </div>
                  <div className="col-6 form-group">
                                <label for="">Edit Dropoff Date: </label>
                                <div className="date" id="date2" data-target-input="nearest">
                                    <input type="date" id="dropDate" className="form-control p-4 datetimepicker-input" placeholder="Pickup Date"
                                        data-target="#date2"/>
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <label for="">Edit Dropoff Time: </label>
                                <div className="date" id="date2" data-target-input="nearest">
                                    <input type="time" id="dropTime" className="form-control p-4 datetimepicker-input" placeholder="Pickup Date"
                                        data-target="#date2"/>
                                </div>
                            </div>
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
