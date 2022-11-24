import React from "react";
import viewsIcon from "../../assets/icons/views.svg";
import likesIcon from "../../assets/icons/likes.svg";
import "./Hero.scss";
import moment from 'moment'


const  Hero =(props) => {
  const {videoId,title,channel,timestamp,views,likes,description} = props.videos
    return (
      <div className="hero" id={videoId}>
        <div className="hero__heading">
          <h1 className="hero__heading--title">{title}</h1>
        </div>
        <div className="hero__info">
          <div className="hero__info--channel-date">
            <h3 className="channel">{`By ${channel}`}</h3>
            <p className="date">{moment(timestamp).format("MM/DD/YYYY")}</p>
          </div>
          <div className="hero__info--likes-views">
            <p className="views">
              <span className="views-icon">
                <img src={viewsIcon} alt="views icon" />
              </span>
              {views}
            </p>
            <p className="likes">
              <span className="likes-icon">
                <img src={likesIcon} alt="likes icon" />
              </span>
              {likes}
            </p>
          </div>
        </div>
        <div className="hero__description">
          <p className="hero__description--text">
            {description}
          </p>
        </div>
      </div>
    );
  
};

export default Hero;
