import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Comments = ({ socket }) => {
  const { category, id } = useParams();
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  //👇🏻 Listens to the comments event
  useEffect(() => {
    socket.on('comments', (data) => setCommentList(data));
  }, [socket]);

  useEffect(() => {
    socket.emit('fetchComments', { category, id });
  }, [category, id, socket]);

  const addComment = (e) => {
    e.preventDefault();
    /*👇🏻 sends the comment, the task category, item's id and the userID.*/
    socket.emit('addComment', {
      comment,
      category,
      id,
      userId: localStorage.getItem('userId'),
    });
    setComment('');
  };

  return (
    <div className="comments__container">
      <form className="comment__form" onSubmit={addComment}>
        <label htmlFor="comment">Add a comment</label>
        <textarea
          placeholder="Type your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          id="comment"
          name="comment"
          required
        ></textarea>
        <button className="commentBtn">ADD COMMENT</button>
      </form>
      <div className="comments__section">
        <h2>Existing Comments</h2>
        {commentList.map((comment) => (
          <div key={comment.id}>
            <p>
              <span style={{ fontWeight: 'bold' }}>{comment.text} </span>by{' '}
              {comment.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
