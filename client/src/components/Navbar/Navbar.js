import React from "react";
import logo from "../../BrainFlix-logo.svg";
import searchIcon from "../../assets/icons/search.svg";
import userImg from "../../assets/images/Mohan-muruge.jpg";
import uploadIcon from "../../assets/icons/upload.svg";
import "./Navbar.scss";
import Button from "../Button/Button";
import { Link } from "react-router-dom";


const  Navbar =() => {
    return (
      <div className="navbar">
        <Link className="navbar__logo" to='/'>
          <img src={logo} alt="logo" />
        </Link>
        <div className="navbar-input-img">
          <div className="navbar__input">
            <img
              src={searchIcon}
              alt="search icon"
              className="navbar__input-searchIcon"
            />
            <input placeholder="Search" className="navbar__input-box" />
          </div>
          <div className="navbar__userImg">
            <img src={userImg} alt="userImg" />
          </div>
        </div>
        <Button
          icon={uploadIcon}
          className={["navbar__button", "navbar__button--icon", "navbar__btn"]}
          alt={"upload"}
        />
      </div>
    );

};

export default Navbar;
