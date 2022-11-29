import React from "react";
import { Link } from "react-router-dom";
        
const SignIn = () => {

return (

    <div className="signin-form-container">
        
      <h1 className="display text-uppercase text-white mb-3 text-center p-4">SIGN IN</h1>
      <label htmlFor id="confirmation">ACCOUNT CREATED! PROCEED TO SIGN IN</label>
      <div className="form-group">
        <input type="Email" className="login-inps form-control p-4" placeholder="Email" required="required" id="signInEmail" />
      </div>
      <label htmlFor id="password-lbl-error">PASSWORD DOES NOT MATCH!</label>
      <div className="form-group">
        <input type="password" className="form-control p-4 login-inps" placeholder="Password" required="required" id="signInPassword" />
      </div>
      <div className="btn-container">
        <button className="btn btn-primary py-3 px-5 login-btn" onclick="validate()">
          Sign In
        </button>
        <br /> <br />
        <Link to='/signup'>SignUp Instead</Link>
      </div>
    </div>
  );

}

export default SignIn;