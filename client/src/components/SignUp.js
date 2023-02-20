import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const sendData = () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let account = document.getElementById("accountType");
    let accountType = account[account.selectedIndex].value;
    axios
      .post("http://localhost:8080/api/auth/sign-up", {
        name,
        email,
        password,
        confirmPassword,
        accountType,
      })
      .then((res) => {
        console.log(res);
        document.getElementById("errorMessage").innerText =
          "Please check your email to verify your account";
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.backgroundColor = "#00ad5f";
        document.getElementById("errorApi").style.width = "100%";

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
        document.getElementById("accountType").value = "Choose Account Type";
      })
      .catch((e) => {
        console.log(e);
        // document.getElementById("emailError").innerText = e.response.data.error.email;
        if (e.response.data.msg !== undefined) {
          document.getElementById("name").style.border = "none";
          document.getElementById("password").style.border = "none";
          document.getElementById("confirmPassword").style.border = "none";
          document.getElementById("email").style.border = "2px solid crimson";

          document.getElementById("errorMessage").innerText = e.response.data.msg;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
        } else if (e.response.data.error.name !== undefined) {
          document.getElementById("name").style.border = "2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.name;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
          document.getElementById("errorApi").style.width = "100%";
        } else if (e.response.data.error.email !== undefined) {
          document.getElementById("name").style.border = "none";
          document.getElementById("email").style.border = "2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.email;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
        } else if (e.response.data.error.password !== undefined) {
          document.getElementById("name").style.border = "none";
          document.getElementById("email").style.border = "none";
          document.getElementById("password").style.border = "2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.password;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
        } else if (e.response.data.error.confirmPassword !== undefined) {
          document.getElementById("name").style.border = "none";
          document.getElementById("email").style.border = "none";
          document.getElementById("password").style.border = "none";
          document.getElementById("confirmPassword").style.border = "2px solid crimson";

          document.getElementById("errorMessage").innerText = e.response.data.error.confirmPassword;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
        } else if (e.response.data.error.accountType !== undefined) {
          document.getElementById("name").style.border = "none";
          document.getElementById("email").style.border = "none";
          document.getElementById("password").style.border = "none";
          document.getElementById("confirmPassword").style.border = "none";
          document.getElementById("accountType").style.border = "2px solid crimson";

          document.getElementById("errorMessage").innerText = e.response.data.error.accountType;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
        }
      });
  };

  return (
    <div className="signup-form-container">
      <h1 className="display text-uppercase text-white mb-3 text-center p-4">CREATE AN ACCOUNT</h1>
      <label htmlFor id="errorApi">
        {" "}
        <span id="errorMessage"></span>
      </label>
      <div className="row">
        <div className="col-6 form-group">
          <input
            type="text"
            className="form-control p-4"
            placeholder="Name"
            required="required"
            id="name"
          />
        </div>
        <div className="col-6 form-group">
          <input
            type="text"
            className="form-control p-4"
            placeholder="Email"
            required="required"
            id="email"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6 form-group">
          <input
            type="password"
            className="form-control p-4"
            placeholder="Password"
            required="required"
            id="password"
          />
        </div>
        <div className="col-6 form-group">
          <input
            type="password"
            className="form-control p-4"
            placeholder="Confirm Password"
            required="required"
            id="confirmPassword"
          />
        </div>
      </div>

      <label htmlFor id="password-lbl-error">
        PASSWORD DOES NOT MATCH!
      </label>

      <div class="form-group">
        <select
          class="custom-select px-4 mb-3 bg-dark"
          placeholder="Select Account Type"
          id="accountType"
          style={{ height: 50 }}
        >
          <option selected>Choose Account Type</option>
          <option value="Lessee">I Want to Rent a Car</option>
          <option value="Lessor">I Want to Upload My Car for Rent</option>
        </select>
      </div>

      <div>
        <button className="btn btn-primary py-3 px-5" onClick={sendData}>
          Sign Up
        </button>
        <br /> <br />
        <Link to="/signin">Already have an account?</Link>
      </div>
    </div>
  );
};

export default SignUp;
