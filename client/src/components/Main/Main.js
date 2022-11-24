import React, { useState, useEffect } from "react";
import Video from "../Video/Video";
import Hero from "../Hero/Hero";
import AddComment from "../AddComment/AddComment";
import Comments from "../Comments/Comments";
import NextVideos from "../NextVideos/NextVideos";
import "./Main.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const Main = () => {
  const [videos, setVideos] = useState({});
  const [nextVideos, setNextVideos] = useState([]);

  
  let { videoId } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/videos/${
          videoId || "84e96018-4022-434e-80bf-000ce4cd12b8"
        }`
      )
      .then((res) => res.data)
      .then((data) => setVideos(data));

    axios
      .get(
        `http://localhost:3000/videos`
      )
      .then((res) => res.data)
      .then((data) => setNextVideos(data));
  }, [videoId]);

  const numberOfComments = videos.comments?.length;

  return (
    <>
      <Video image={videos.image} controls={true} />
      <div className="content__container">
        <div className="content__container--hac" id="text">
          {/*hac means hero, addcomment, comments */}

          <Hero videos={videos} className={"hero-container"}/>

          <AddComment numberOfComments={numberOfComments} />

          {videos.comments && <Comments comments={videos.comments} />}
        </div>

        <div className="content__container--nv">
          {/*nv means newvideos */}
          <NextVideos
            nextVideos={nextVideos}
            currentVideoId={videoId || "84e96018-4022-434e-80bf-000ce4cd12b8"}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
