import React from "react";
import { Link } from 'react-router-dom';

const SubHeaderAbout = (props) => {
    return (
        <div className="container-fluid page-header">
          <h1 className="display-3 text-uppercase text-white mb-3">{props.headingText}</h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0"> <Link to="/" className="text-white">Home</Link> </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0 text-white">{props.headingText}</h6>
          </div>
        </div>
      );
};

export default SubHeaderAbout;