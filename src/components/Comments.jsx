import { useContext } from "react";
import ApiCall from "../apiCalls";
import AuthContext from "../AuthContext";
import { Link } from "react-router";
import style from "../styles/heading.module.css";

const Comments = ({
  toggleSelectedComment,
  selectedComment,
  selectedPost,
  mutatePostComments,
}) => {
  const { isLoggedIn, email } = useContext(AuthContext);

  const addComment = async (formData) => {
    const confirm = await ApiCall.createComment(
      formData,
      selectedPost.id,
      selectedComment ? selectedComment.id : null,
      email,
    );
    // confirm.status == 200 && mutate({...})
  };

  return (
    <div id="comments" className={style.headingTitle}>
      {selectedComment && (
        <div>
          <button onClick={() => toggleSelectedComment(null)}>
            Go To Top Comment
          </button>
          <p>{selectedComment.id}</p>
          <p>{selectedComment.text}</p>
          {selectedComment.comments.map((comment) => (
            <p
              key={comment.id}
              role={comment.id}
              onClick={() => toggleSelectedComment(comment)}
            >
              {comment.text}
            </p>
          ))}
          {isLoggedIn ? (
            <form role="addComment" action={addComment}>
              <input
                type="text"
                name="comment"
                id=""
                placeholder="Add Comment"
              />
              <button type="submit">Add Comment</button>
            </form>
          ) : (
            <div>
              <h3>
                <Link to="log-in">Log in</Link>/
                <Link to="sign-in">Sign in</Link>
              </h3>
              <p>To join the conversation</p>
            </div>
          )}
        </div>
      )}
      {!selectedComment &&
        selectedPost &&
        selectedPost.Comment.map((comment) => (
          <div
            key={comment.id}
            role={comment.id}
            onClick={toggleSelectedComment}
          >
            {comment.text}
          </div>
        ))}
      {isLoggedIn ? (
        <form role="addComment" action={addComment}>
          <input type="text" name="comment" id="" placeholder="Add Comment" />
          <button type="submit">Add Comment</button>
        </form>
      ) : (
        <div>
          <h3>
            <Link to="auth/log-in">Log in</Link>/
            <Link to="auth/sign-in">Sign in</Link>
          </h3>
          <p>To join the conversation</p>
        </div>
      )}
    </div>
  );
};

export default Comments;
