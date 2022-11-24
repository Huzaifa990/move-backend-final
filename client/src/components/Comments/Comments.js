import React from 'react'
import './Comments.scss'
import Comment from '../Comment/Comment'

const Comments = (props) => {
    return (
      <div className="comments__container">
        <Comment comments={props.comments} />
      </div>
    );
  
}

export default Comments