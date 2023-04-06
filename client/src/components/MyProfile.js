import React from "react";
import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";
import { MDBCardImage } from "mdb-react-ui-kit";
import logo from "../img/info.png";
import edit from "../img/edit-round-line-icon.png";
import cnic1 from "../img/cnic1.jpg";
import cnic2 from "../img/cnic2.jpg";
import selfie from "../img/cnic-sample.jpg";
import { InputMask } from "primereact/inputmask";
import moment from "moment";
import loadingLogo from "../img/loader.gif";

export default function MyProfile() {
  var userName = JSON.parse(localStorage.getItem("userName"));
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  var userEmail = JSON.parse(localStorage.getItem("userEmail"));
  var accountType = JSON.parse(localStorage.getItem("accountType"));
  var [Analytics, setAnalytics] = useState({});
  var [anal, setAnal] = useState({});
  var [userInfo, setUserInfo] = useState([]);
  var [cnicImg, setCnincImg] = useState([]);
  const [ingnored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/lesseeAnalytics", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      setAnalytics(data.analytics);
    }

    getData();

    async function getPersonalInfo() {
      const response = await fetch("http://localhost:8080/api/auth/user", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      console.log(data);
      setCnincImg(data.user.cnicImages);

      if (data.user.cnicImages.length > 0) {
        var images = data.user.cnicImages;
        var box = document.getElementsByClassName("imgHolder");
        for (var i = 0; i < images.length; i++) {
          box[i].src = images[i];
        }
      } else {
      }
    }

    getPersonalInfo();

    async function getUserData() {
      const response = await fetch("http://localhost:8080/api/auth/user", {
        headers: { Authorization: userDetails },
      });
      var uInfo = await response.json();
      setUserInfo(uInfo.user);
      console.log(uInfo.user);
    }
    getUserData();
  }, [userDetails, ingnored]);

  const headers = {
    Authorization: userDetails,
  };

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/api/analytics/lessorAnalytics?pageSize=10&page=0", {
        headers: { Authorization: userDetails },
      });

      var data = await response.json();
      console.log(data);
      setAnal(data.analytics);
    }

    getData();
  }, [userDetails]);

  const sendName = () => {
    let updatedName = document.getElementById("Name").value;

    axios
      .put(
        "http://localhost:8080/api/auth/updateName",
        {
          updatedName,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        document.getElementById("successApi").innerText = res.data.msg;
        document.getElementById("successApi").style.visibility = "visible";
        document.getElementById("successApi").style.position = "relative";
        document.getElementById("successApi").style.width = "100%";
      })
      .catch((e) => {
        console.log(e);
      });
    localStorage.setItem("userName", JSON.stringify(updatedName));
    setTimeout(function () {
      window.location.reload();
    }, 2500);
    // setOpen(!open);
  };

  const updateNumber = () => {
    let phone = document.getElementById("Number").value;
    let phoneStrip = "";
    for (var j = 0; j < phone.length; j++) {
      if (phone[j] !== "(" && phone[j] !== ")" && phone[j] !== "+" && phone[j] !== "-") {
        phoneStrip += phone[j];
      }
    }
    let updatedPhoneNumber = parseInt(phoneStrip);
    console.log(updatedPhoneNumber);

    axios
      .put(
        "http://localhost:8080/api/auth/updatePhoneNumber",
        {
          updatedPhoneNumber,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        document.getElementById("successApi").innerText = res.data.msg;
        document.getElementById("successApi").style.visibility = "visible";
        document.getElementById("successApi").style.position = "relative";
        document.getElementById("successApi").style.width = "100%";
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendEmail = () => {
    let updatedEmail = document.getElementById("Email").value;

    axios
      .put(
        "http://localhost:8080/api/auth/updateEmail",
        {
          updatedEmail,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        document.getElementById("successApi").innerText = res.data.msg;
        document.getElementById("successApi").style.visibility = "visible";
        document.getElementById("successApi").style.position = "relative";
        document.getElementById("successApi").style.width = "100%";
      })
      .catch((e) => {
        console.log(e);
      });
    localStorage.setItem("userEmail", JSON.stringify(userEmail));
  };

  const sendPassword = () => {
    let password = document.getElementById("password").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmNewPassword = document.getElementById("confirmNewPassword").value;

    axios
      .put(
        "http://localhost:8080/api/auth/updatePassword",
        {
          password,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        document.getElementById("password").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmNewPassword").value = "";

        document.getElementById("password").style.border = "none";
        document.getElementById("newPassword").style.border = "none";
        document.getElementById("confirmNewPassword").style.border = "none";

        document.getElementById("errorApi").style.visibility = "hidden";
        document.getElementById("errorApi").style.position = "absolute";
        document.getElementById("errorApi").style.width = "0%";

        document.getElementById("successApi").innerText = res.data.msg;
        document.getElementById("successApi").style.visibility = "visible";
        document.getElementById("successApi").style.position = "relative";
        document.getElementById("successApi").style.width = "100%";
        // setTimeout(goToHome, 15000)
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.msg !== undefined) {
          document.getElementById("errorMessage").innerText = e.response.data.msg;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
          document.getElementById("errorApi").style.width = "100%";
        } else if (e.response.data.error.password !== undefined) {
          document.getElementById("password").style.border = "2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.password;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
          document.getElementById("errorApi").style.width = "100%";

          document.getElementById("successApi").style.visibility = "hidden";
          document.getElementById("successApi").style.position = "absolute";
          document.getElementById("successApi").style.width = "0%";
        } else if (e.response.data.error.newPassword !== undefined) {
          document.getElementById("password").style.border = "none";
          document.getElementById("newPassword").style.border = "2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.newPassword;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
          document.getElementById("errorApi").style.width = "100%";

          document.getElementById("successApi").style.visibility = "hidden";
          document.getElementById("successApi").style.position = "absolute";
          document.getElementById("successApi").style.width = "0%";
        } else if (e.response.data.error.confirmNewPassword !== undefined) {
          document.getElementById("password").style.border = "none";
          document.getElementById("newPassword").style.border = "none";
          document.getElementById("confirmNewPassword").style.border = "2px solid crimson";
          document.getElementById("errorMessage").innerText =
            e.response.data.error.confirmNewPassword;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
          document.getElementById("errorApi").style.width = "100%";

          document.getElementById("successApi").style.visibility = "hidden";
          document.getElementById("successApi").style.position = "absolute";
          document.getElementById("successApi").style.width = "0%";
        }
      });
  };

  const sendProfielPicture = () => {
    let updatedProfilePic = document.getElementById("profile-pic").value;

    axios
      .put(
        "http://localhost:8080/api/auth/updatedProfilePic",
        {
          updatedProfilePic,
        },
        {
          headers: headers,
        }
      )
      .then(async (res) => {
        console.log(res);
        document.getElementById("successApi").innerText = res.data.msg;
        document.getElementById("successApi").style.visibility = "visible";
        document.getElementById("successApi").style.position = "relative";
        document.getElementById("successApi").style.width = "100%";
        var img = document.getElementById("uPp");
        img.style.background = "none";
        toggleOffPP();
        forceUpdate();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function readFile(e) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      (function (file) {
        var reader = new FileReader();
        reader.onload = () => {
          var img = document.getElementById("uPp");
          img.style.backgroundImage = `url(${reader.result})`;

          document.getElementById("profile-pic").value = reader.result;
        };
        reader.readAsDataURL(file);
      })(files[i]);
    }
  }

  function readFile1(e) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      (function (file) {
        var reader = new FileReader();
        reader.onload = () => {
          var img = document.getElementById("b2");
          img.style.backgroundImage = `url(${reader.result})`;

          document.getElementById("cnic1").value = reader.result;
        };
        reader.readAsDataURL(file);
      })(files[i]);
    }
  }

  function readFile2(e) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      (function (file) {
        var reader = new FileReader();
        reader.onload = () => {
          var img = document.getElementById("b3");
          img.style.backgroundImage = `url(${reader.result})`;

          document.getElementById("cnic2").value = reader.result;
        };
        reader.readAsDataURL(file);
      })(files[i]);
    }
  }

  function readFile3(e) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      (function (file) {
        var reader = new FileReader();
        reader.onload = () => {
          var img = document.getElementById("b4");
          img.style.backgroundImage = `url(${reader.result})`;

          document.getElementById("cnic3").value = reader.result;
        };
        reader.readAsDataURL(file);
      })(files[i]);
    }
  }
  function togglePopup() {
    const popupContainer = document.getElementById("pop");
    if (popupContainer.style.display === "block") {
      popupContainer.style.display = "none";
    } else {
      popupContainer.style.display = "block";
    }
  }

  function toggleOff() {
    const popupContainer = document.getElementById("pop");
    popupContainer.style.display = "none";
  }

  function togglePopupPP() {
    const popupContainer = document.getElementById("popPP");
    if (popupContainer.style.display === "block") {
      popupContainer.style.display = "none";
    } else {
      popupContainer.style.display = "block";
    }
  }

  function toggleOffPP() {
    const popupContainer = document.getElementById("popPP");
    popupContainer.style.display = "none";
  }

  function uploadCnic() {
    var allPics = document.getElementsByClassName("cnic-pics");
    var cnicImages = [];
    for (var i = 0; i < allPics.length; i++) {
      cnicImages.push(allPics[i].value);
    }

    console.log(cnicImages);
    var payload = {
      cnicImages,
    };
    axios
      .put("http://localhost:8080/api/auth/uploadCNIC", payload, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        document.getElementById("errorApi").style.visibility = "hidden";
        document.getElementById("errorApi").style.position = "absolute";
        document.getElementById("errorApi").style.width = "0%";
        document.getElementById("successApi").innerText = res.data.msg;
        document.getElementById("successApi").style.visibility = "visible";
        document.getElementById("successApi").style.position = "relative";
        document.getElementById("successApi").style.width = "100%";
      })
      .catch((e) => {
        console.log(e);
        document.getElementById("errorMessage").innerText =
          "Please upload all three image or visit the info section";
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
      });
  }


  return (
    <div>
      <div class="container">
        <div class="row-gutters">
          {userInfo.verified === true ? (
            <div>
              <h1 class="pl-3 mb-4 text-primary">Account Status: 100%</h1>
              <div class="progress mb-4">
                <div
                  class="progress-bar w-100"
                  role="progressbar"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          ) : (
            <div>
              <h1 class="pl-3 mb-4 text-primary">Account Status: 50%</h1>
              <div class="progress mb-4">
                <div
                  class="progress-bar w-50"
                  role="progressbar"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          )}
        </div>
        <div class="row gutters">
          <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <div class="logoxTwo" onClick={togglePopupPP}>
                      <img src={edit} alt="info" className="edit-logo" />
                    </div>
                    <div class="user-avatar">
                      <MDBCardImage
                        src={userInfo.profilePicture}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "175px" }}
                        fluid
                      />
                      <div class="popup-containerTwo" id="popPP">
                        <div class="popupPP">
                          <div className="container-3">
                            <div className="box" id="uPp">
                              <input
                                onChange={readFile}
                                type="file"
                                id="fileImg"
                                name="file1"
                                accept="image/*"
                              />
                              <label for="fileImg" className="camera-icon"></label>
                            </div>

                            <input type="text" id="profile-pic" hidden />
                            <button className="btn btn-editProfile" onClick={sendProfielPicture}>
                              Update Profile Picture
                            </button>
                            <button className="btn btn-deletePhoto" onClick={toggleOffPP}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr width="100%;" color="f77d0a" size="20" align="left"></hr>
                    <h5 class="mb-4 text-primary">User Information</h5>
                    <hr width="100%;" color="f77d0a" size="20" align="left"></hr>
                    <h1 class="user-name">{userInfo.name}</h1>
                    <br></br>
                    <h7 class="user-name">{userInfo.email}</h7>
                    <br></br>
                    <h7 class="user-name">+{userInfo.phoneNumber}</h7>
                    <br></br>
                    <h7 class="user-name">
                      Date Joined: {moment.utc(userInfo.createdAt).format("llll")}
                    </h7>
                    <br></br>

                    <hr width="100%;" color="f77d0a" size="20" align="left"></hr>
                    <h5 class="mb-4 text-primary">User Address</h5>
                    <hr width="100%;" color="f77d0a" size="20" align="left"></hr>
                    <h1 class="user-name">Lahore</h1>
                    <h6 class="user-name">DHA Phase V</h6>
                  </div>
                  <div class="about">
                    <hr width="100%;" color="f77d0a" size="20" align="left"></hr>
                    {userName !== null ? (
                      accountType === "Lessee" ? (
                        <h5>Total Cars Booked</h5>
                      ) : null
                    ) : null}

                    {userName !== null ? (
                      accountType === "Lessor" ? (
                        <h5>Total Cars Listed</h5>
                      ) : null
                    ) : null}
                    <hr width="100%;" color="f77d0a" size="20" align="left"></hr>
                    <p>
                      {userName !== null ? (
                        accountType === "Lessee" ? (
                          <h1>{Analytics.totalBookingsDone}</h1>
                        ) : null
                      ) : null}

                      {userName !== null ? (
                        accountType === "Lessor" ? (
                          <h1>{anal.carsListed}</h1>
                        ) : null
                      ) : null}
                    </p>
                    <hr width="100%;" color="f77d0a" size="20" align="left"></hr>
                    {userName !== null ? (
                      accountType === "Lessee" ? (
                        <h5>Total Money Spent</h5>
                      ) : null
                    ) : null}

                    {userName !== null ? (
                      accountType === "Lessor" ? (
                        <h5>Total Money Generated</h5>
                      ) : null
                    ) : null}
                    <hr width="100%;" color="f77d0a" size="20" align="left"></hr>
                    <p>
                      {userName !== null ? (
                        accountType === "Lessee" ? (
                          <h1>{Analytics.lifetimeSpent} PKR</h1>
                        ) : null
                      ) : null}

                      {userName !== null ? (
                        accountType === "Lessor" ? (
                          <h1>{anal.lifetimeRevenue} PKR</h1>
                        ) : null
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <label htmlFor id="errorApi">
                      {" "}
                      <span id="errorMessage"></span>
                    </label>
                    <label htmlFor id="successApi">
                      {" "}
                      <span id="successMessage"></span>
                    </label>
                    <h1 class="mb-4 text-primary">Personal Details</h1>
                  </div>
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="form-group">
                      <label for="Name">Name</label>
                      <input type="text" class="form-control" id="Name" defaultValue={userName} />
                      <div class="text-right">
                        <button className="btn btn-editProfile" onClick={sendName}>
                          Update Name
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="form-group">
                      <label for="updatedNumber">Phone Number</label>
                      <InputMask
                        class="form-control"
                        className="form-control p-4 cnic-inp"
                        mask="(+99)-9999999999"
                        id="Number"
                        value={userInfo.phoneNumber}
                      />
                      <div class="text-right">
                        <button className="btn btn-editProfile" onClick={updateNumber}>
                          Update Number
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="form-group">
                      <label for="Email">Email</label>
                      <input type="email" class="form-control" id="Email" value={userEmail} />
                      <div class="text-right">
                        <button className="btn btn-editProfile" onClick={sendEmail}>
                          Update Email
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr width="100%;" color="f77d0a" size="20" align="left"></hr>

                <div className="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <label htmlFor id="errorApi">
                      {" "}
                      <span id="errorMessage"></span>
                    </label>
                    <label htmlFor id="successApi">
                      {" "}
                      <span id="successMessage"></span>
                    </label>
                    <div class="popup-container" id="pop" onClick={toggleOff}>
                      <div class="popup">
                        <h2 style={{ color: "#f77d0a" }}>What to upload?</h2>
                        <br />
                        <p>1. Upload CNIC Front Picture</p>
                        <p>2. Upload CNIC Back Picture</p>
                        <p>3. Upload a selfie with your CNIC</p>

                        <h3 style={{ color: "#f77d0a" }}>Example: </h3>

                        <div className="sample-cnic">
                          <div className="sample-1">
                            <img alt="cnic1" src={cnic1} />
                          </div>

                          <div className="sample-1">
                            <img alt="cnic2" src={cnic2} />
                          </div>

                          <div className="sample-1">
                            <img alt="selfie" src={selfie} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="warning-container">
                      <h1 class="mb-4 text-primary">CNIC VERIFICATION</h1>
                      <div class="logo-x" onClick={togglePopup}>
                        <img src={logo} alt="info" className="info-logo" />
                      </div>
                    </div>
                  </div>
                  {cnicImg.length === 0 ? (
                    <>
                      <div className="container-2">
                        <div className="cnic-lbl">
                          <div className="box box-cnic" id="b2">
                            <input
                              type="file"
                              id="file1"
                              name="file1"
                              accept="image/*"
                              onChange={readFile1}
                            />
                            <label for="file1" className="camera-icon"></label>
                          </div>
                        </div>

                        <div className="cnic-lbl">
                          <div className="box box-cnic" id="b3">
                            <input
                              type="file"
                              id="file2"
                              name="file1"
                              accept="image/*"
                              onChange={readFile2}
                            />
                            <label for="file2" className="camera-icon"></label>
                          </div>
                        </div>

                        <div className="cnic-lbl">
                          <div className="box box-cnic" id="b4">
                            <input
                              type="file"
                              id="file3"
                              name="file1"
                              accept="image/*"
                              onChange={readFile3}
                            />
                            <label for="file3" className="camera-icon"></label>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="sample-cnic">
                        <div className="sample-1">
                          <img alt="cnic1" className="imgHolder" src={loadingLogo} />
                        </div>

                        <div className="sample-1">
                          <img alt="cnic2" className="imgHolder" src={loadingLogo} />
                        </div>

                        <div className="sample-1">
                          <img alt="selfie" className="imgHolder" src={loadingLogo} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {cnicImg.length === 0 ? (
                  <div class="text-right">
                    <button className="btn btn-editProfile" onClick={uploadCnic}>
                      Request Verification
                    </button>
                  </div>
                ) : null}

                <input type="text" id="cnic1" className="cnic-pics" hidden />
                <input type="text" id="cnic2" className="cnic-pics" hidden />
                <input type="text" id="cnic3" className="cnic-pics" hidden />

                <hr width="100%;" color="f77d0a" size="20" align="left"></hr>

                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <label htmlFor id="errorApi">
                      {" "}
                      <span id="errorMessage"></span>
                    </label>
                    <label htmlFor id="successApi">
                      {" "}
                      <span id="successMessage"></span>
                    </label>
                    <h1 class="mb-4 text-primary">Update Password</h1>
                  </div>
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="form-group">
                      <label for="Password">Old Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Old Password"
                        required="required"
                        id="password"
                      />
                      <br></br>
                      <label for="Password">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        required="required"
                        id="newPassword"
                      />
                      <br></br>
                      <label for="Password">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        required="required"
                        id="confirmNewPassword"
                      />
                      <br></br>
                      <div class="text-right">
                        <button className="btn btn-editProfile" onClick={sendPassword}>
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
