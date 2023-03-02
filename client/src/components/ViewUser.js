import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// 👇️ View all listings from the API
const ViewUser = () => {
  const location = useLocation();
  console.log(location.state.id);

  // 👇️ Use states for storing data and images from the API
  const [name, setName] = useState({});
  const [img, setImg] = useState([]);
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  useEffect(() => {
    const names = async () => {
      const response = await fetch(
        "http://localhost:8080/api/auth/getUserById/" + location.state.id,
        {
          headers: { Authorization: userDetails },
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data.user);
      setName(data.user);
      setImg(data.user.cnicImages);
    };

    names();
  }, [location.state.id, userDetails]);

  // 👇️ Getting data from the API and setting use states to store data and images form the API

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="container pt-5 pb-3">
          <div className="row align-items-center pb-2">
            {img.length < 3 && img.length > 1 ? (
              <>
                <div className="col-lg-4 mb-4">
                  <img className="img-fluid" src={img[0]} alt="" />
                  <img className="img-fluid" src={img[1]} alt="" />
                </div>
              </>
            ) : img.length < 4 && img.length > 1 ? (
              <>
                <div className="col-lg-4 mb-4">
                  <img className="img-fluid" src={img[0]} alt="" width="100%" />
                  <img className="img-fluid" src={img[1]} alt="" width="100%" />
                </div>
                <div className="col-lg-6 mb-4">
                  <img className="img-fluid" src={img[2]} alt="" />
                </div>{" "}
              </>
            ) : img.length < 5 && img.length > 1 ? (
              <>
                <div className="col-lg-4 mb-4">
                  <img className="img-fluid" src={img[0]} alt="" />
                  <img className="img-fluid" src={img[1]} alt="" />
                </div>
                <div className="col-lg-4 mb-4">
                  <img className="img-fluid" src={img[2]} alt="" />
                  <img className="img-fluid" src={img[3]} alt="" />
                </div>{" "}
              </>
            ) : (
              <div className="col-lg-12 mb-4">
                <h1>CNIC Images Not Uploaded!</h1>
              </div>
            )}
          </div>

          <div className="col-lg-12">
            <hr style={{ backgroundColor: "white" }} />
            <h2 className="mb-4">
              <span style={{ color: "#f77d0a" }}>User Detail</span>
            </h2>
            <hr style={{ backgroundColor: "white" }} />
            <div className="mb-5">
              <div className="row">
                <div className="col-6">
                  <h4>
                    <span style={{ color: "#f77d0a" }}>Name:</span>
                  </h4>
                  <h3> {name.name}</h3>
                </div>

                <div className="col-6">
                  <h4>
                    <span style={{ color: "#f77d0a" }}>Email:</span>
                  </h4>
                  <h3> {name.email}</h3>
                </div>
              </div>
              <br /> <br />
              <div className="row">
                <div className="col-6">
                  <h4>
                    <span style={{ color: "#f77d0a" }}>Phone Number:</span>
                  </h4>
                  <h3> +{name.phoneNumber}</h3>
                </div>
                <div className="col-6">
                  <h4>
                    <span style={{ color: "#f77d0a" }}>CNIC:</span>
                  </h4>
                  <h3> {name.cnic}</h3>
                </div>
              </div>
              <br /> <br />
              <div className="row">
                <div className="col-6">
                  <h4>
                    <span style={{ color: "#f77d0a" }}>Account Type:</span>
                  </h4>
                  <h3> {name.accountType}</h3>
                </div>
                <div className="col-6">
                  <h4>
                    <span style={{ color: "#f77d0a" }}>Email Verification:</span>
                  </h4>
                  <h3> {name.emailVerified === true ? "Verified" : "Not Verified"}</h3>
                </div>
              </div>
              <br /> <br />
              <div className="row">
                <div className="col-12">
                  <h4>
                    <span style={{ color: "#f77d0a" }}>Account Verified:</span>
                  </h4>
                  <h3> {name.verified === true ? "Verified" : "Not Verified"}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
