import React from "react";

export default function LessorDashboard() {
    
  return (
    <div>
      <h1 className="overview-heading">OVERVIEW</h1>
      <div className="stats-container">
        <div className="col-sm-6 col-lg-3">
          <div className="overview-item overview-item--c1">
            <div className="overview__inner">
              <div className="overview-box clearfix">
                <div className="icon">
                  <i className="zmdi zmdi-account-o"></i>
                </div>
                <center>
                  <div className="text">
                    <h2>10368</h2>
                    <span>members online</span>
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
