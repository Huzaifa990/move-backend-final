import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const RequestForget = () => {
  const sendData = () =>{
    let email = document.getElementById("signInEmail").value;
    

    axios.post("http://localhost:8080/api/auth/forgotPassword",{
        email,
    })
    .then((res) => {
        console.log(res);
        document.getElementById("errorMessage").innerText = res.data.msg;
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
        document.getElementById("errorApi").style.background = "green";
        document.getElementById("signInEmail").value = "";
      }).catch((e) =>{
        console.log(e)

        if(e.response.data.msg !== undefined){
          document.getElementById("errorMessage").innerText = e.response.data.msg;
          document.getElementById("errorApi").style.visibility="visible";
          document.getElementById("errorApi").style.position="relative";
        }
        
        else if(e.response.data.error.email !== undefined){
          document.getElementById("signInEmail").style.border="2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.email;
          document.getElementById("errorApi").style.visibility="visible";
          document.getElementById("errorApi").style.position="relative";
        }
      });
}

return (

    <div className="signin-form-container">
        
      <h1 className="display text-uppercase text-white mb-3 text-center p-4">Forgot Password</h1>
      <label htmlFor id="errorApi"> <span id="errorMessage"></span></label>
      <div className="form-group">
        <input type="Email" className="login-inps form-control p-4" placeholder="Email" required="required" id="signInEmail" />
      </div>
      <div className="btn-container">
        <button className="btn btn-primary py-3 px-5 login-btn" onClick={sendData}>
          Reset
        </button>
        <br /> <br />
        <Link to='/signin'>Cancel</Link>
      </div>
    </div>
  );

}

export default RequestForget;