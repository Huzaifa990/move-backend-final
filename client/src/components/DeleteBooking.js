import React from "react";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const DeleteBooking = () => {

    const navigate = useNavigate();

    const goToBookings = () => {
        navigate('/myBookings');
    };
    
 
    const location = useLocation();
    var CarId = location.state.id;
    async function getData(){

        var userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const response = await fetch("http://localhost:8080/api/listing/" + location.state.id, {
            headers: { Authorization: userDetails },
        });
        console.log(response);
        const data = await response.json();
        console.log(data.item);
    }

  getData();

  
  function deleteCar(){

    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const headers = {
        Authorization: userDetails,
    };


    axios.delete(
      "http://localhost:8080/api/booking/" + CarId,
      {
        headers: headers,
      }
    )
    .then((res) => {
      console.log(res);
      document.getElementById("errorMessage").innerText = "Your booking has been deleted!";
      document.getElementById("errorApi").style.visibility = "visible";
      document.getElementById("errorApi").style.position = "relative";
      document.getElementById("errorApi").style.width = "100%";
      document.getElementById("errorApi").style.background = "green";

      setTimeout(goToBookings, 3000)
    })
;
  }

  return (
    <>
      <div className="signup-form-container">
        <h1 className="display text-uppercase text-white mb-3 text-center p-4">Delete Booking</h1>

        <label htmlFor id="errorApi">
          {" "}
          <span id="errorMessage"></span>
        </label>

        <div className="edit-close">
        <div className="btn-container">
        <button className="btn btn-primaryDelete py-3 px-5 login-btn" onClick={deleteCar}>Confirm</button>
        <button className="btn btn-secondaryDelete py-3 px-5 cancel-btn" onClick={goToBookings}>Cancel</button>
        </div>
        </div>
        
      </div>
    </>
  );
};

export default DeleteBooking;