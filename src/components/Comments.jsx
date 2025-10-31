import comments from "../styles/comments.module.css";
import text from "../styles/text.module.css";

const Comments = ({
  toggleSelectedComment,
  selectedComment,
  comment,
  selectedPost,
  updateComments,
}) => {
  return (
    <div key={comment.id}>
      <div className={comments.comment}>
        <div className={comments.content}>
          <p className={comments.email}>{comment.User.email}</p>
          <p className={text.baseText}>{comment.text}</p>
        </div>
        <div
          className={comments.actions}
          onClick={() => toggleSelectedComment(comment)}
        >
          <p>Reply</p>
        </div>
      </div>
      {comment.subComments &&
        comment.subComments[0] != "" &&
        comment.subComments.map((c) => {
          return (
            <div style={{ paddingLeft: 25 }}>
              <Comments
                toggleSelectedComment={toggleSelectedComment}
                selectedComment={selectedComment}
                comment={c}
                selectedPost={selectedPost}
                updateComments={updateComments}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Comments;
