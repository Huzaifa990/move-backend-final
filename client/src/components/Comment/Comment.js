import React from 'react'
import moment from 'moment';
import './Comment.scss'

const Comment = (props) => {
  return (
    <>
   {props.comments.map((comnt, idx) => {
       return (
           <div className="comment" key={idx}>
              <div className="comment__profile-pic">
                {/* <img
                  className="comment__profile-pic--pic"
                  src={cimg}
                  alt="usrimg"
                  /> */}
              </div>
              <div className="comment__content">
                <div className="comment__content-name-date">
                  <p className="user-name">{comnt.name}</p>
                  <p className="comment-date">{moment(comnt.timestamp).fromNow()}</p>
                </div>
                <div className="comment__content--comment">{comnt.comment}</div>
              </div>
            </div>
          );
        })}
        </>
  )
}

export default Comment