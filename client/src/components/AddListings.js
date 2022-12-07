import React from "react";
import axios from "axios";

window.onload = function () {
  document.querySelector("#inp").addEventListener("change", readFile);

  function readFile(e) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      (function (file) {
        var reader = new FileReader();
        reader.onload = () => {
          var img = document.createElement("img");
          img.id = "img";
          img.src = reader.result;
          img.style.height = "150px";
          document.getElementById("selected-images").appendChild(img);

          document.getElementsByClassName("inpp")[i].value = reader.result;
        };
        reader.readAsDataURL(file);
      })(files[i]);
    }
    setTimeout(tranferData, 1000);
  }

  function tranferData() {
    var space = document.getElementsByClassName("inpp");
    for (var i = 0; i < space.length; i++) {
      var data = space[i].value;
      if (data !== "") {
        picture.push(space[i].value);
      }
    }
    console.log(picture);
  }
};
var picture = [];
const sendData = () => {
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const headers = {
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

  axios
    .post(
      "http://localhost:8080/api/listing/",
      {
        carName,
        company,
        model,
        mileage,
        transmission,
        location,
        rentPerDay,
        picture,
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

      document.getElementById("model").value = null;
      document.getElementById("make").value = null;
      document.getElementById("modelYear").value = null;
      document.getElementById("mileage").value = null;
      document.getElementById("location").value = null;
      document.getElementById("userPrice").value = null;
      document.getElementById("inp").value = null;
      document.querySelector("#img").style.visibility = "hidden";
      document.querySelector("#img").style.position = "absolute";
    })
    .catch((e) => {
      console.log(e);

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
      } else if (e.response.data.error.picture !== undefined) {
        document.getElementById("make").style.border = "none";
        document.getElementById("model").style.border = "none";
        document.getElementById("modelYear").style.border = "none";
        document.getElementById("mileage").style.border = "none";
        document.getElementById("transmission").style.border = "none";
        document.getElementById("location").style.border = "none";
        document.getElementById("userPrice").style.border = "none";
        document.getElementById("errorMessage").innerText = e.response.data.error.picture;
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
      }
    });
};

const AddListings = () => {
  return (
    <>
      <div className="signup-form-container">
        <h1 className="display text-uppercase text-white mb-3 text-center p-4">LIST YOUR CAR</h1>

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

          <div className="col-6 form-group">
            <label for="">Car Images:</label>
            <input
              type="file"
              placeholder=""
              required="required"
              id="inp"
              accept="image/*"
              multiple
            />
            <br /> <br />
            <div id="selected-images"></div>
            <input type="text" name="" class="inpp" />
            <input type="text" name="" class="inpp" />
            <input type="text" name="" class="inpp" />
            <input type="text" name="" class="inpp" />
            <input type="text" name="" class="inpp" />
            <input type="text" name="" class="inpp" />
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

        <div>
          <button className="btn btn-primary py-3 px-5" onClick={sendData}>
            Post Your Car
          </button>
        </div>
      </div>
    </>
  );
};

export default AddListings;
