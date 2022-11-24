import React from 'react'
import commentIcon from '../../assets/icons/add_comment.svg'
import userImg from '../../assets/images/Mohan-muruge.jpg'
import Button from '../Button/Button'

import './AddComment.scss'

const  AddComment = (props)=> {
    return (
      <div className="addComment">
        <h4 className="addComment__heading">{`${props.numberOfComments} Comments`}</h4>
        <div className="addComment__container">
          <div className="addComment__container--img">
            <img src={userImg} alt="userImage" />
          </div>
          <div className="addComment__container--input">
            <p>JOIN THE CONVERSATION</p>
            <div className="addComment__container--tab">
              <input type="text" placeholder="Add a new comment" />
              <Button
                className={[
                  "addComment__container--button",
                  "addComment__container--button-icon",
                  "addComment__container-btn",
                ]}
                icon={commentIcon}
                alt={"comment"}
              />
            </div>
          </div>
        </div>
      </div>
    );

}

export default AddComment