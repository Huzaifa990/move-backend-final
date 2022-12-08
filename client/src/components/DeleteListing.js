import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const DeleteListing = () => {

    const navigate = useNavigate();

    const goToListings = () => {
        // 👇️ navigate to /listings
        navigate('/listings');
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
      "http://localhost:8080/api/listing/" + CarId,
      {
        headers: headers,
      }
    )
    .then((res) => {
      console.log(res);
      document.getElementById("errorMessage").innerText = "Your listing has been deleted!";
      document.getElementById("errorApi").style.visibility = "visible";
      document.getElementById("errorApi").style.position = "relative";
      document.getElementById("errorApi").style.width = "100%";
      document.getElementById("errorApi").style.background = "green";

      setTimeout(goToListings, 3000)
    })
;
  }

  return (
    <>
      <div className="signup-form-container">
        <h1 className="display text-uppercase text-white mb-3 text-center p-4">Delete Listing</h1>

        <label htmlFor id="errorApi">
          {" "}
          <span id="errorMessage"></span>
        </label>

        <div className="edit-close">
            <div>
            <button className="btn btn-primary py-3 px-5" onClick={deleteCar}>Confirm</button>
            </div>

            <div>
            <Link to="/listings" className="btn btn-secondary py-3 px-5 cancel-btn">Cancel</Link>
            </div>
        </div>
        
      </div>
    </>
  );
};

export default DeleteListing;