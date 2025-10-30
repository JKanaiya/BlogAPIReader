import posts from "../styles/posts.module.css";
import text from "../styles/text.module.css";
import icons from "../styles/icons.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router";

export default function Posts({ data, toggleSelectedPost, selectedPost }) {
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
            <div className={posts.top}>
              <h3 className={text.h3}>{post.title}</h3>
              {/* make this smaller in general on the post */}
              <p className={text.author}>{post.writer.email}</p>
            </div>
            <p className={text.baseText}>{post.text}</p>
            <span
              className={posts.iconButton}
              onClick={() => toggleSelectedPost(post)}
            >
              <FaAngleDoubleRight />
            </span>
          </div>
        ))}
    </div>
  );
}
