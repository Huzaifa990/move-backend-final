import React from "react";
import verify from "../img/approval.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ActivateAccount() {
  const search = useLocation().search;
  const otp = new URLSearchParams(search).get("otp");
  const navigate = useNavigate();

  axios
    .put("http://localhost:8080/api/auth/activateAccount", {
      otp,
    })
    .then(() => {
      console.log("Account Verified!");
      setTimeout(goToLogin, 1500);
    })
    .catch((e) => {
      console.log(e);
      document.getElementById("verifi").innerText = "Oops Something Went Wrong!";
      document.getElementById("verifi").style.color = "crimson";
      document.getElementById("veri-img").style.visibility = "hidden";
      document.getElementById("veri-img").style.position = "absolute";
      document.getElementById("verifi-2").innerText = "Returning to sign up ...";
      setTimeout(goToSignup, 1500);
    });

  function goToLogin() {
    navigate("/signin");
  }
  function goToSignup() {
    navigate("/signup");
  }

  return (
    <div className="acc-verified">
      <center>
        <h1 id="verifi" style={{ color: "#00ad5f" }}>
          Account Was Verified Successfully
        </h1>
        <img src={verify} alt="ver" id="veri-img" width={300} />
        <h2 id="verifi-2">Proceeding to log in ...</h2>
      </center>
    </div>
  );
}
