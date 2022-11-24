import React from 'react'
import { Link } from 'react-router-dom';

const Button = (props) => {
  return (
    <>
      {props.alt === "upload" ? (
        <Link className={props.className[0]} to="/upload">
          <div className={props.className[1]}>
            <img src={props.icon} alt={props.alt} />
          </div>
          <button className={props.className[2]}>
            {props.alt.toUpperCase()}
          </button>
        </Link>
      ) : (
        <div className={props.className[0]} onClick={props.handleClick}>
          <div className={props.className[1]}>
            <img src={props.icon} alt={props.alt} />
          </div>
          <button className={props.className[2]}>
            {props.alt.toUpperCase()}
          </button>
        </div>
      )}
    </>
  );
}

export default Button