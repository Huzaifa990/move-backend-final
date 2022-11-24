import React, { useState } from "react";
import Button from "../Button/Button";
import publishIcon from "../../assets/icons/publish.svg";
import { Link, Redirect, Route } from "react-router-dom";
import "./Upload.scss";
import axios from "axios";

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const handleClick = () => {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var newId = `${Math.floor(Math.random() * 5000)}-${Math.floor(Math.random() * 5000)}-${Math.floor(Math.random() * 5000)}-${Math.floor(Math.random() * 5000)}`;
    axios.post("http://localhost:3000/videos", {
      title,
      channel: "Travel Org",
      image: "https://phlearn.com/wp-content/uploads/2018/03/How-to-Create-a-Cinematic-Look-in-Photoshop-Before.jpg?w=1200&quality=99&strip=all",
      description,
      views: "0",
      likes: "0",
      duration: "4:20",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: 1632344461000,
      comments: [],
      id: newId,
    })
    .then((res) => {
      console.log(res);
    }).catch((e) =>{
      console.log(e)
    });

    document.getElementById("title").value="";
    document.getElementById("description").value="";
    setIsUploading(true);
  };
  
  return (
    <>
      <Route>
        {isUploading ? (
          <Redirect to={"/"} />
        ) : (
          <div className="upload">
            <h2 className="upload__heading">Upload Video</h2>
            <div className="upload__info">
              <div className="upload__info--video">
                <p>VIDEO THUMBNAIL</p>
                
                <div className="thumbnail">
                  <img src="https://i.imgur.com/yFS8EBr.jpg" alt="thumbnail" />
                </div>
              </div>
              <div className="upload__info--input">
               
                <label>TITLE YOUR VIDEO</label>
                <input type="text" placeholder="Add a title to your video" id="title" />
                <label>ADD A VIDEO DESCRIPTION</label>
                <textarea
                  cols="5"
                  rows="4"
                  placeholder="Add a description to your video"
                  id="description"
                />
              </div>
            </div>
            <div className="upload__cta">
             
              <Button
                type="submit"
                icon={publishIcon}
                className={[
                  "upload__button",
                  "upload__button--icon",
                  "upload__btn",
                ]}
                alt={isUploading ? "uploading" : "publish"}
               
                handleClick={handleClick}
              />
             
              {/* <button onClick={hello}>Hi</button> */}
              <Link to="/" className="upload__cta--cancel">
                CANCEL
              </Link>
            </div>
          </div>
        )}
      </Route>
    </>
  );
};

export default Upload;
