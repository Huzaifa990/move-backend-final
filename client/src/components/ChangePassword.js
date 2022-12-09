import React from "react";
import axios from "axios";
// import {useNavigate} from "react-router-dom";

const ChangePassword = () => {

  var userDetails= JSON.parse(localStorage.getItem("userDetails")); 
    const headers = {
        'Authorization': userDetails
    }
  //   const navigate = useNavigate();
  //   const goToHome = () => {
  //     navigate('/');
  // };

  const sendData = () =>{
    
    let password = document.getElementById("password").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmNewPassword = document.getElementById("confirmNewPassword").value;


    axios.put("http://localhost:8080/api/auth/updatePassword",{
        password,
        newPassword,
        confirmNewPassword
    },
    {
      headers: headers
    })
    .then((res) => {
      console.log(res);
      document.getElementById("password").value='';
      document.getElementById("newPassword").value='';
      document.getElementById("confirmNewPassword").value='';

      document.getElementById("password").style.border="none";
      document.getElementById("newPassword").style.border="none";
      document.getElementById("confirmNewPassword").style.border="none";

      document.getElementById("errorApi").style.visibility="hidden";
      document.getElementById("errorApi").style.position="absolute";
      document.getElementById("errorApi").style.width="0%";

      document.getElementById("successApi").style.visibility="visible";
      document.getElementById("successApi").style.position="relative";
      document.getElementById("successApi").style.width="100%";
      // setTimeout(goToHome, 15000)
    })
    .catch((e) =>{
        console.log(e);
        if(e.response.data.msg !== undefined){
          document.getElementById("errorMessage").innerText = e.response.data.msg;
          document.getElementById("errorApi").style.visibility="visible";
          document.getElementById("errorApi").style.position="relative";
          document.getElementById("errorApi").style.width="100%";
        }
        else if(e.response.data.error.password !== undefined){
          document.getElementById("password").style.border="2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.password;
          document.getElementById("errorApi").style.visibility="visible";
          document.getElementById("errorApi").style.position="relative";
          document.getElementById("errorApi").style.width="100%";

          document.getElementById("successApi").style.visibility="hidden";
          document.getElementById("successApi").style.position="absolute";
          document.getElementById("successApi").style.width="0%";
        }
        else if(e.response.data.error.newPassword !== undefined){
          document.getElementById("password").style.border="none";
          document.getElementById("newPassword").style.border="2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.newPassword;
          document.getElementById("errorApi").style.visibility="visible";
          document.getElementById("errorApi").style.position="relative";
          document.getElementById("errorApi").style.width="100%";

          document.getElementById("successApi").style.visibility="hidden";
          document.getElementById("successApi").style.position="absolute";
          document.getElementById("successApi").style.width="0%";
        }
        else if(e.response.data.error.confirmNewPassword !== undefined){
            document.getElementById("password").style.border="none";
            document.getElementById("newPassword").style.border="none";
            document.getElementById("confirmNewPassword").style.border="2px solid crimson";
            document.getElementById("errorMessage").innerText = e.response.data.error.confirmNewPassword;
            document.getElementById("errorApi").style.visibility="visible";
            document.getElementById("errorApi").style.position="relative";
            document.getElementById("errorApi").style.width="100%";

            document.getElementById("successApi").style.visibility="hidden";
            document.getElementById("successApi").style.position="absolute";
            document.getElementById("successApi").style.width="0%";
          }
      });
}

return (

    <div className="signin-form-container">
        
      <h1 className="display text-uppercase text-white mb-3 text-center p-4">Update Password</h1>
      <label htmlFor id="errorApi"> <span id="errorMessage"></span></label>
      <label htmlFor id="successApi"> <span id="successMessage">Password Updated</span></label>
      <div className="form-group">
        <input type="password" className="form-control p-4 login-inps" placeholder="Old Password" required="required" id="password" />
      </div>
      <div className="form-group">
        <input type="password" className="form-control p-4 login-inps" placeholder="New Password" required="required" id="newPassword" />
      </div>
      <div className="form-group">
        <input type="password" className="form-control p-4 login-inps" placeholder="Confirm Password" required="required" id="confirmNewPassword" />
      </div>
      <div className="btn-container">
        <button className="btn btn-primary py-3 px-5 login-btn" onClick={sendData}>
          Change
        </button>
        <br /> <br />
      </div>
    </div>
  );

}

export default ChangePassword;