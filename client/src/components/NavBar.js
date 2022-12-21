import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem("userName")
    localStorage.removeItem("userDetails");
    localStorage.removeItem("accountType");
    navigate("/");
    window.location.reload();
  }
  console.log(localStorage.getItem("userName"))
  var userName= JSON.parse(localStorage.getItem("userName")); 
  
  return (
    <div>
      <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
        <div className="row">
          <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <a className="text-body pr-3" href="Greet.js">
                <i className="fa fa-phone-alt mr-2"></i>+92-3315069961
              </a>
              <span className="text-body">|</span>
              <a className="text-body px-3" href="Greet.js">
                <i className="fa fa-envelope mr-2"></i>F2019-297@BNU.EDU.PK
              </a>
            </div>
          </div>
          <div className="col-md-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-body px-3" href="Greet.js">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="text-body px-3" href="Greet.js">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-body px-3" href="Greet.js">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="text-body px-3" href="Greet.js">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="text-body pl-3" href="Greet.js">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid position-relative nav-bar p-0">
        <div className="position-relative bg-dark px-lg-5 navbar-front">
          <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
            <Link to="/" className="navbar-brand">
              <h1 className="text-uppercase text-primary mb-1">MOVE</h1>
            </Link>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between px-3"
              id="navbarCollapse"
            >
              <div className="navbar-nav ml-auto py-0">

                <Link to='/' className="nav-item nav-link active">Home</Link>
                
                <Link to='/about' className="nav-item nav-link active">About</Link>

                <Link to='/services' className="nav-item nav-link active">Services</Link>


                <Link to='/listings' className="nav-item nav-link active">Car Listings</Link>

                { 
                  (userName !== null)
                    ? <Link to='/addListings' className="nav-item nav-link active">List a Car</Link>
                    : null
                }

                {
                  (userName !== null)
                ? <Link to='/myListings' className="nav-item nav-link active">My Listings</Link>
                : null
                }
               
                <div className="nav-item dropdown">
                  <div className="dropdown-menu rounded-0 m-0">
                    <a href="Greet.js" className="dropdown-item">
                      The Team
                    </a>
                    <a href="Greet.js" className="dropdown-item">
                      Testimonial
                    </a>
                  </div>
                </div>

                <Link to='/Contact' className="nav-item nav-link active">Contact</Link>
                {
                  (userName !== null)
                ? <Link to='/changepassword' className="nav-item nav-link active">Change Password</Link>
                : null
                }

                { 
                  (userName !== null)
                    ? <button className="nav-item nav-link active" style={{background:"none", border:"none", paddingBottom:"35px"}} onClick={logout}>Logout</button>
                    : null
                }


                { 
                  (userName === null)
                    ? <Link to='/signin' className="nav-item nav-link active">Sign In</Link>
                    : <div>
                        <Link to="/" className="nav-link btn-primary active">Welcome {userName}</Link>
                      </div>
                }

                

                
                
                {/* <Link to='/singup' className="nav-item nav-link active">Sign Up/ Login</Link>

                <Link to='/myListings' className="nav-item nav-link active">My Listings</Link>
                
                <Link to='/' className="nav-link btn-primary">LIST YOUR CAR</Link> */}

              
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;