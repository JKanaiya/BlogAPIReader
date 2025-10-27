import posts from "../styles/posts.module.css";
import text from "../styles/text.module.css";
import icons from "../styles/icons.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router";

export default function Posts({
  data,
  toggleSelectedPost,
  selectedPost,
  toggleComments,
}) {
  return (
    <div className={posts.container}>
      {selectedPost && (
        <div className={posts.selectedContainer}>
          <span className={icons.closeIcon} onClick={toggleSelectedPost}>
            <IoCloseOutline />
          </span>
          <div className={posts.selectedPost}>
            <h3 className={text.headingTitle}>{selectedPost.title}</h3>
            <p className={text.baseText}>{selectedPost.text}</p>
          </div>
        </div>
      )}
      {!data && <p> "No Posts are Available"</p>}
      {!selectedPost &&
        data.map((post) => (
          <div className={posts.post} key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <button onClick={() => toggleSelectedPost(post)}>
              see{post.id}
            </button>
          </div>
        ))}
    </div>
  );
}
