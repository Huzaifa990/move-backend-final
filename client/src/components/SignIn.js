import React from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
        
const SignIn = () => {
  const sendData = () =>{
    let email = document.getElementById("signInEmail").value;
    let password = document.getElementById("signInPassword").value;

    axios.post("http://localhost:8080/api/auth/login",{
        email,
        password
    })
    .then((res) => {
        console.log(res.data.user.name);
        navigateToHome();
      }).catch((e) =>{
        console.log(e)
        if(e.response.data.error.email !== undefined){
          document.getElementById("signInEmail").style.border="2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.email;
          document.getElementById("errorApi").style.visibility="visible";
          document.getElementById("errorApi").style.position="relative";
        }
        else if(e.response.data.error.password !== undefined){
          document.getElementById("signInEmail").style.border="none";
          document.getElementById("signInPassword").style.border="2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.password;
          document.getElementById("errorApi").style.visibility="visible";
          document.getElementById("errorApi").style.position="relative";
        }
      });
}
const navigate = useNavigate();

const navigateToHome = () => {
    // 👇️ navigate to /home page
    navigate('/');
};
return (

    <div className="signin-form-container">
        
      <h1 className="display text-uppercase text-white mb-3 text-center p-4">SIGN IN</h1>
      <label htmlFor id="errorApi"> <span id="errorMessage"></span></label>
      <div className="form-group">
        <input type="Email" className="login-inps form-control p-4" placeholder="Email" required="required" id="signInEmail" />
      </div>
      <div className="form-group">
        <input type="password" className="form-control p-4 login-inps" placeholder="Password" required="required" id="signInPassword" />
      </div>
      <div className="btn-container">
        <button className="btn btn-primary py-3 px-5 login-btn" onClick={sendData}>
          Sign In
        </button>
        <br /> <br />
        <Link to='/signup'>SignUp Instead</Link>
      </div>
    </div>
  );

}

export default SignIn;