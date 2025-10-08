import { useContext } from "react";
import ApiCall from "../apiCalls";
import AuthContext from "../AuthContext";

const Comments = ({ setSelectedComment, selectedComment, selectedPost }) => {
  const addComment = (formData) => {
    const confirm = ApiCall.addComment(formData);
    console.log(confirm);
  };

  const { isLoggedIn } = useContext(AuthContext);

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
        selectedPost &&
        selectedPost.comments.map((comment) => (
          <div key={comment.id} role={comment.id} onClick={setSelectedComment}>
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
            <Link to="log-in">Log in</Link>/<Link to="sign-in">Sign in</Link>
          </h3>
          <p>To join the conversation</p>
        </div>
      )}
    </div>
  );
};

export default Comments;
