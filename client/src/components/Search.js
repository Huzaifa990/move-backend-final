import React from "react";

const Search = () => {
  return (
    <div>
      <div class="container-fluid bg-white pt-3 px-lg-5">
        <div class="row mx-n2">
          <div class="col-xl-2 col-lg-4 col-md-6 px-2">
            <select class="custom-select px-4 mb-3 menus" style={{height: 50}}>
              <option selected>Pickup Location</option>
              <option value="1">Lahore</option>
              <option value="2">Karachi</option>
              <option value="3">Islamabad</option>
            </select>
          </div>

          <div class="col-xl-2 col-lg-4 col-md-6 px-2">
            <select class="custom-select px-4 mb-3" style={{height: 50}}>
              <option selected>Select a Category</option>
              <option value="1">Intercity Travel</option>
              <option value="2">Intracity Travel</option>
            </select>
          </div>

          <div class="col-xl-2 col-lg-4 col-md-6 px-2">
            <div class="date mb-3" id="date" data-target-input="nearest">
              <input
                type="date"
                class="form-control p-4 datetimepicker-input"
                placeholder="Pickup Date"
                data-target="#date"
                data-toggle="datetimepicker"
              />
            </div>
          </div>
          <div class="col-xl-2 col-lg-4 col-md-6 px-2">
            <div class="time mb-3" id="time" data-target-input="nearest">
              <input
                type="time"
                class="form-control p-4 datetimepicker-input"
                placeholder="Pickup Time"
                data-target="#time"
                data-toggle="datetimepicker"
              />
            </div>
          </div>

          <div class="col-xl-2 col-lg-4 col-md-6 px-2">
            <select class="custom-select px-4 mb-3" style={{height: 50}}>
              <option selected>Select Vehicle Type</option>
              <option value="1">Car</option>
            </select>
          </div>
          <div class="col-xl-2 col-lg-4 col-md-6 px-2">
            <button
              class="btn btn-primary btn-block mb-3"
              style={{height: 50}}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
