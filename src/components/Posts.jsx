import posts from "../styles/posts.module.css";
import text from "../styles/text.module.css";
import icons from "../styles/icons.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { FaAngleDoubleRight } from "react-icons/fa";
import { TiWeatherNight } from "react-icons/ti";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSolidComment, BiSolidCommentX } from "react-icons/bi";
import { Link } from "react-router";

export default function Posts({
  data,
  toggleSelectedPost,
  selectedPost,
  toggleComments,
  commentsVisible,
}) {
  return (
    <div className={posts.container}>
      {selectedPost && (
        <div className={posts.selectedContainer}>
          <div className={posts.actions}>
            <span className={icons.closeIcon} onClick={toggleSelectedPost}>
              <IoCloseOutline />
            </span>
            <div className={icons.comment}>
              {commentsVisible && selectedPost ? (
                <BiSolidCommentX onClick={toggleComments} />
              ) : (
                <BiSolidComment onClick={toggleComments} />
              )}
            </div>
          </div>
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
