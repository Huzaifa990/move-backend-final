import React from "react";
import {useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const ResetPassword = () => {
    const search = useLocation().search;
    const otp =new URLSearchParams(search).get("otp");

  const sendData = () =>{
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    axios.put("http://localhost:8080/api/auth/setPassword",{
        otp,
        password,
        confirmPassword
    })
    .then((res) => {
        console.log(res);
        navigateToHome();
      }).catch((e) =>{
        console.log(e)

        if(e.response.data.msg !== undefined){
          document.getElementById("errorMessage").innerText = e.response.data.msg;
          document.getElementById("errorApi").style.visibility="visible";
          document.getElementById("errorApi").style.position="relative";
        }
        
        else if(e.response.data.error.password !== undefined){
          document.getElementById("password").style.border="2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.password;
          document.getElementById("errorApi").style.visibility="visible";
          document.getElementById("errorApi").style.position="relative";
        }

        else if(e.response.data.error.confirmPassword !== undefined){
            document.getElementById("password").style.border="none";
            document.getElementById("confirmPassword").style.border="2px solid crimson";
  
            document.getElementById("errorMessage").innerText = e.response.data.error.confirmPassword;
            document.getElementById("errorApi").style.visibility="visible";
            document.getElementById("errorApi").style.position="relative";
          }
      });
}
const navigate = useNavigate();

const navigateToHome = () => {
    // 👇️ navigate to /home page
    navigate('/signin');
};
return (

    <div className="signin-form-container">
        
      <h1 className="display text-uppercase text-white mb-3 text-center p-4">RESET PASSWORD</h1>
      <label htmlFor id="errorApi"> <span id="errorMessage"></span></label>
      <div className="form-group">
        <input type="password" className="login-inps form-control p-4" placeholder="Password" required="required" id="password" />
      </div>
      <div className="form-group">
        <input type="password" className="form-control p-4 login-inps" placeholder="Confirm Password" required="required" id="confirmPassword" />
      </div>
      <div className="btn-container">
        <button className="btn btn-primary py-3 px-5 login-btn" onClick={sendData}>
          Reset
        </button>
       
      </div>
    </div>
  );

}

export default ResetPassword;