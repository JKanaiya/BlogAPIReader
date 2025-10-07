const Comments = ({
  user,
  setSelectedComment,
  selectedComment,
  selectedPost,
}) => {
  return (
    <div id="comments">
      {selectedComment && (
        <div>
          <button onClick={() => setSelectedComment(null)}>
            Go To Top Comment
          </button>
          <p>{selectedComment.id}</p>
          <p>{selectedComment.text}</p>
          {selectedComment.comments.map((comment) => (
            <p
              key={comment.id}
              role={comment.id}
              onClick={() => setSelectedComment(comment)}
            >
              {comment.text}
            </p>
          ))}
        </div>
      )}
      {!selectedComment &&
        selectedPost.comments.map((comment) => (
          <div key={comment.id} role={comment.id} onClick={setSelectedComment}>
            {comment.text}
          </div>
        ))}
      {user && (
        <form role="addComment">
          <input type="text" name="comment" id="" placeholder="Add Comment" />
        </form>
      )}
    </div>
  );
};

export default Comments;
