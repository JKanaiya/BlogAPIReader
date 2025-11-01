import { useContext, useState } from "react";
import comments from "../styles/comments.module.css";
import text from "../styles/text.module.css";
import icons from "../styles/icons.module.css";
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import AuthContext from "../AuthContext";
import ApiCall from "../apiCalls";

const Comments = ({
  toggleSelectedComment,
  selectedComment,
  comment,
  selectedPost,
  updateComments,
}) => {
  const [open, setOpen] = useState(false);

  const { email } = useContext(AuthContext);

  const deleteComment = async (commentId) =>
    await ApiCall.deleteComment({ commentId });

  const toggleOpen = () => {
    setOpen(open ? false : true);
  };

  return (
    <div key={comment.id}>
      <div className={comments.comment}>
        <div className={comments.content}>
          <p className={comments.email}>{comment.User.email}</p>
          <p className={text.baseText}>{comment.text}</p>
          {comment.User.email === email && (
            <span
              onClick={() => deleteComment(comment.id)}
              className={icons.closeIcon}
            >
              <IoCloseOutline />
            </span>
          )}
        </div>
        <div
          className={comments.actions}
          onClick={() => toggleSelectedComment(comment)}
        >
          <span onClick={toggleOpen}>
            {!open ? <GoTriangleDown /> : <GoTriangleUp />}
          </span>
          <p>Reply</p>
        </div>
      </div>
      {comment.subComments &&
        comment.subComments[0] != "" &&
        comment.subComments.map((c) => {
          return (
            <div
              style={{
                display: open ? "block" : "none",
                paddingLeft: 25,
              }}
            >
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
