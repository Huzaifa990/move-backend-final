import React from "react";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const DeleteBooking = () => {

  //Function that navigates the user to the myBookings Page when called.
    const navigate = useNavigate();
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const goToBookings = () => {
        navigate('/myBookings');
    };
    
    //Storing the specific id of that booking in a variable.
    const location = useLocation();
    


  //Function that sends the id of the booking that was chosen to the delete Api.

  async function BookingReject() {
    var CarId = location.state.id;
    axios
      .put(
        "http://localhost:8080/api/booking/cancel/" + CarId,
        {},
        {
          headers: { Authorization: userDetails },
        }
      )
      .then((res) => {
      document.getElementById("errorMessage").innerText = "Your booking has been cancelled!";
      document.getElementById("errorApi").style.visibility = "visible";
      document.getElementById("errorApi").style.position = "relative";
      document.getElementById("errorApi").style.width = "100%";
      document.getElementById("errorApi").style.background = "green";

      setTimeout(goToBookings, 3000)
      })
      .catch((e) => {
        document.getElementById("errorMessage").innerText = "Your booking could not be cancelled!";
      document.getElementById("errorApi").style.visibility = "visible";
      document.getElementById("errorApi").style.position = "relative";
      document.getElementById("errorApi").style.width = "100%";
      document.getElementById("errorApi").style.background = "red";
      });
  }

  // A box where the user can confirm the deletion or cancel the deletion.
  return (
    <>
      <div className="signup-form-container">
        <h1 className="display text-uppercase text-white mb-3 text-center p-4">Cancel Booking</h1>

        <label htmlFor id="errorApi">
          {" "}
          <span id="errorMessage"></span>
        </label>

        <div className="edit-close">
        <div className="btn-container">
        <button className="btn btn-primaryDelete py-3 px-5 login-btn" onClick={BookingReject}>Confirm</button>
        <button className="btn btn-secondaryDelete py-3 px-5 cancel-btn" onClick={goToBookings}>Cancel</button>
        </div>
        </div>
        
      </div>
    </>
  );
};

export default DeleteBooking;