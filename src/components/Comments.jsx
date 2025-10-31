import { useContext } from "react";
import ApiCall from "../apiCalls";
import AuthContext from "../AuthContext";
import { Link } from "react-router";
import comments from "../styles/comments.module.css";

const Comments = ({
  toggleSelectedComment,
  selectedComment,
  selectedPost,
  updateComments,
}) => {
  const { isLoggedIn, email } = useContext(AuthContext);

  const addComment = async (formData) => {
    if (selectedComment) {
      const confirm = await ApiCall.createComment(
        formData.get("comment"),
        null,
        selectedComment.id,
        email,
      );
      if (confirm.status == 200) {
        updateComments(selectedPost, {
          text: formData.get("comment"),
          postId: selectedPost.id,
          selectedCommentId: selectedComment.id,
          email: email,
        });
      }
      console.log(confirm.status);
    } else {
      const confirm = await ApiCall.createComment(
        formData.get("comment"),
        selectedPost.id,
        email,
      );
      if (confirm.status == 200) {
        updateComments(selectedPost, {
          text: formData.get("comment"),
          postId: selectedPost.id,
          email: email,
        });
      }
      console.log(confirm.status);
    }
    // TODO: ui should place the add comment input under any unique comment that is the selected comment. This means that the selectedComment should not load solo conditionally
  };

  return (
    <div id="comments" className={comments.container}>
      {selectedComment && (
        <div>
          <button onClick={() => toggleSelectedComment(null)}>
            Go To Top Comment
          </button>
          <p>{selectedComment.User.email}</p>
          <p>{selectedComment.text}</p>
          {selectedComment.subComments &&
            selectedComment.subComments.map((comment) => (
              <div>
                <div
                  key={comment.id}
                  role={comment.id}
                  onClick={() => toggleSelectedComment(comment)}
                >
                  {comment.text}
                </div>
              </div>
            ))}
          {isLoggedIn && (
            <form role="addComment" action={addComment}>
              <input
                type="text"
                name="comment"
                id=""
                placeholder="Add Comment"
              />
              <button type="submit">Add Comment</button>
            </form>
          )}
        </div>
      )}
      {!selectedComment &&
        selectedPost &&
        selectedPost.Comment.map((comment) => (
          <div
            className={comments.comment}
            key={comment.id}
            role={comment.id}
            onClick={() => toggleSelectedComment(comment)}
          >
            {comment.text}
          </div>
        ))}
      {!selectedComment && isLoggedIn ? (
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
