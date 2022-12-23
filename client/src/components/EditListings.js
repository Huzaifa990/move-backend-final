import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const EditListing = () => {

    const navigate = useNavigate();

    const goToListings = () => {
        // 👇️ navigate to my listings
        navigate('/myListings');
    };
 
    const location = useLocation();
    var CarId = location.state.id;

    // 👇️ Get data form the API
    async function getData(){

        var userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const response = await fetch("http://localhost:8080/api/listing/" + location.state.id, {
          // 👇️ Sending AUTH TOKEN to the API
            headers: { Authorization: userDetails },
        });
        console.log(response);
        const data = await response.json();
        console.log(data.item);
        fillForm(data.item)

    }

  getData();
    // 👇️filling data from API into the form
  function fillForm(data) {
    document.getElementById("model").value = data.carName;
    document.getElementById("make").value = data.company;
    document.getElementById("modelYear").value = data.model;
    document.getElementById("mileage").value = data.mileage;
    document.getElementById("location").value = data.location;
    document.getElementById("userPrice").value = data.rentPerDay;
    if(data.transmission === "auto"){
        document.getElementById("transmission").selectedIndex = 1;
    }
    else{
        document.getElementById("transmission").selectedIndex = 2;
    }
  }

  // 👇️ Allows user to edit and update data 
  function editData(){

    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const headers = {
      // 👇️ Sending AUTH TOKEN to the API
        Authorization: userDetails,
    };

    let carName = document.getElementById("model").value;
    let company = document.getElementById("make").value;
    let model = parseInt(document.getElementById("modelYear").value);
    let mileage = parseInt(document.getElementById("mileage").value);
    let location = document.getElementById("location").value;
    let rentPerDay = parseInt(document.getElementById("userPrice").value);
    let transmissio = document.getElementById("transmission");
    let transmission = transmissio[transmissio.selectedIndex].value;
    // 👇️ Axios command to edit and update data 
    axios
    .put(
      "http://localhost:8080/api/listing/" + CarId,
      {
        carName,
        company,
        model,
        mileage,
        transmission,
        location,
        rentPerDay,
      },
      {
        headers: headers,
      }
    )
    .then((res) => {
      console.log(res);
      
      // 👇️ Displaying confirmation message on the screen and clearing input values

      document.getElementById("errorMessage").innerText = "Your Details Have Been Updated Successfully!";
      document.getElementById("errorApi").style.visibility = "visible";
      document.getElementById("errorApi").style.position = "relative";
      document.getElementById("errorApi").style.width = "100%";
      document.getElementById("errorApi").style.background = "green";

      document.getElementById("model").value = null;
      document.getElementById("make").value = null;
      document.getElementById("modelYear").value = null;
      document.getElementById("mileage").value = null;
      document.getElementById("location").value = null;
      document.getElementById("userPrice").value = null;

      setTimeout(goToListings, 3000)
    })
    .catch((e) => {
      console.log(e);
      // 👇️ Displaying the error codes on the screen from the API

      if (e.response.data.msg !== undefined) {
        document.getElementById("errorMessage").innerText = e.response.data.msg;
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
      } else if (e.response.data.error.company !== undefined) {
        document.getElementById("make").style.border = "2px solid crimson";
        document.getElementById("errorMessage").innerText = e.response.data.error.company;
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
      } else if (e.response.data.error.carName !== undefined) {
        document.getElementById("make").style.border = "none";
        document.getElementById("model").style.border = "2px solid crimson";
        document.getElementById("errorMessage").innerText = e.response.data.error.carName;
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
      } else if (e.response.data.error.model !== undefined) {
        document.getElementById("make").style.border = "none";
        document.getElementById("model").style.border = "none";
        document.getElementById("modelYear").style.border = "2px solid crimson";
        document.getElementById("errorMessage").innerText = e.response.data.error.model;
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
      } else if (e.response.data.error.mileage !== undefined) {
        document.getElementById("make").style.border = "none";
        document.getElementById("model").style.border = "none";
        document.getElementById("modelYear").style.border = "none";
        document.getElementById("mileage").style.border = "2px solid crimson";
        document.getElementById("errorMessage").innerText = e.response.data.error.mileage;
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
      } else if (e.response.data.error.transmission !== undefined) {
        document.getElementById("make").style.border = "none";
        document.getElementById("model").style.border = "none";
        document.getElementById("modelYear").style.border = "none";
        document.getElementById("mileage").style.border = "none";
        document.getElementById("transmission").style.border = "2px solid crimson";
        document.getElementById("errorMessage").innerText = e.response.data.error.transmission;
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
      } else if (e.response.data.error.location !== undefined) {
        document.getElementById("make").style.border = "none";
        document.getElementById("model").style.border = "none";
        document.getElementById("modelYear").style.border = "none";
        document.getElementById("mileage").style.border = "none";
        document.getElementById("transmission").style.border = "none";
        document.getElementById("location").style.border = "2px solid crimson";
        document.getElementById("errorMessage").innerText = e.response.data.error.location;
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
      } else if (e.response.data.error.rentPerDay !== undefined) {
        document.getElementById("make").style.border = "none";
        document.getElementById("model").style.border = "none";
        document.getElementById("modelYear").style.border = "none";
        document.getElementById("mileage").style.border = "none";
        document.getElementById("transmission").style.border = "none";
        document.getElementById("location").style.border = "none";
        document.getElementById("userPrice").style.border = "2px solid crimson";
        document.getElementById("errorMessage").innerText = e.response.data.error.rentPerDay;
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
      }
    });
  }

  return (
    <>
      <div className="signup-form-container">
        <h1 className="display text-uppercase text-white mb-3 text-center p-4"> EDIT DETAILS </h1>

        <p className="sub-form-heading">Car Details:</p>
        <label htmlFor id="errorApi">
          {" "}
          <span id="errorMessage"></span>
        </label>
        <div className="row">
          <div className="col-6 form-group">
            <label for="">Company </label>
            <input type="text" className="form-control p-4" required="required" id="make" />
          </div>
          <div className="col-6 form-group">
            <label for="">Car Name</label>
            <input
              type="text"
              className="form-control p-4"
              placeholder=""
              required="required"
              id="model"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 form-group">
            <label for="">Model Year</label>
            <input
              type="number"
              className="form-control p-4"
              placeholder=""
              required="required"
              id="modelYear"
              min="2000"
              max="2023"
            />
          </div>
          <div className="col-6 form-group">
            <label for="">Mileage:</label>
            <input
              type="text"
              className="form-control p-4"
              placeholder=""
              required="required"
              id="mileage"
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-6 form-group">
            <label for="">Transmission: </label>
            <select
              class="custom-select px-4 mb-3 bg-dark"
              placeholder="Select Account Type"
              id="transmission"
              style={{ height: 50 }}
            >
              <option selected>Choose Transmission</option>
              <option value="auto">Auto</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div className="col-6 form-group">
            <label for="">Location:</label>
            <input
              type="text"
              className="form-control p-4"
              placeholder=""
              required="required"
              id="location"
            />
          </div>
        </div>

        <br />
        <p className="sub-form-heading">Pricing:</p>

        <div className="row">
          <div className="col-6 form-group">
            <label for="">Your Price (per day): </label>
            <input
              type="number"
              className="form-control p-4"
              required="required"
              id="userPrice"
              min="500"
            />
          </div>
        </div>

        <div className="edit-close">
            <div>
            <button className="btn btn-primary py-3 px-5" onClick={editData}>Edit Details</button>
            </div>

            <div>
            <Link to="/listings" className="btn btn-secondary py-3 px-5 cancel-btn">Cancel</Link>
            </div>
        </div>
        
      </div>
    </>
  );
};

export default EditListing;
