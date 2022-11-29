import React from "react";
import { Link } from "react-router-dom";

        
const SignUp = () => {
  return (
    <div className="signup-form-container">
      <h1 className="display text-uppercase text-white mb-3 text-center p-4">CREATE AN ACCOUNT</h1>
      <label htmlFor id="confirmation">ACCOUNT CREATED! PROCEED TO SIGN IN</label>
      <div className="row">
        <div className="col-6 form-group">
          <input type="text" className="form-control p-4" placeholder="Name" required="required" id="name" />
        </div>
        <div className="col-6 form-group">
          <input type="text" className="form-control p-4" placeholder="Email" required="required" id="email" />
        </div>
      </div>

      <div className="row">
        <div className="col-6 form-group">
          <input type="text" className="form-control p-4" placeholder="Password" required="required" id="password" />
        </div>
        <div className="col-6 form-group">
          <input type="text" className="form-control p-4" placeholder="Confirm Password" required="required" id="confirmPassword" />
        </div>
      </div>

      <label htmlFor id="password-lbl-error">PASSWORD DOES NOT MATCH!</label>

      <div class="form-group">
            <select class="custom-select px-4 mb-3" placeholder="Select Account Type" style={{height: 50}}>
              <option selected>Choose Account Type</option>
              <option value="Lessee">I Want to Rent a Car</option>
              <option value="Lessor">I Want to Upload My Car for Rent</option>
            </select>
          </div>

      <div>
        <button className="btn btn-primary py-3 px-5" onclick="validate()">
          Sign Up
        </button>
        <br /> <br />
        <Link to = '/signin'>Already have an account?</Link>
      </div>
    </div>
  );
  }

export default SignUp;