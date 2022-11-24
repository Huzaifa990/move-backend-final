import React from "react";
import { Link } from "react-router-dom";
import "./NextVideos.scss";

const  NextVideos =(props) => {
   function getVideo(array, id) {
     return array.filter((video) => video.id !== id);
   }

    const nextVideos = getVideo(props.nextVideos,props.currentVideoId)
   
    return (
      <div className="nextVideos">
        <p className="nextVideos__heading">NEXT VIDEOS</p>
        <div className="nextVideos__container">
          {nextVideos.map((video) => {
            return (
              <Link key={video.id} to={`/video/${video.id}`}>
                <div
                  className="nextVideos__container--video">
                  <div className="thumbnail">
                    <img
                      className="thumbnail-img"
                      src={video.image}
                      alt="thumbnail"
                    />
                  </div>
                  <div className="info">
                    <h6>{video.title}</h6>
                    <p>{video.channel}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  
}

export default NextVideos;
