import useSWR from "swr";
import axios from "axios";
import Comments from "./Comments";
import Posts from "./Posts";
import { useContext, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../AuthContext";
import home from "../styles/home.module.css";
import text from "../styles/text.module.css";
import auth from "../styles/auth.module.css";
import icons from "../styles/icons.module.css";
import { RiSearch2Line } from "react-icons/ri";

export default function Home() {
  // TODO: Pass this functionality to the selected post and place it where it is always available
  const [commentsVisible, setCommentsVisible] = useState(false);

  const [selectedComment, setSelectedComment] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);

  const [filter, setFilter] = useState(null);

  const getPosts = async (url) => {
    const posts = await axios.get(url + "posts");
    return posts.data;
  };

  const searchPosts = (e) => {
    setFilter(e.target.value);
  };

  const { isLoggedIn } = useContext(AuthContext);

  const toggleSelectedPost = (post) => {
    setSelectedPost(selectedPost ? null : post);
  };

  const toggleSelectedComment = (comment) => {
    console.log(comment);
    setSelectedComment(comment ? comment : null);
  };

  const toggleComments = () => {
    setCommentsVisible(commentsVisible ? false : true);
  };

  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR(import.meta.env.VITE_BACKEND_URL, getPosts, {
    revalidateOnMount: true,
  });

  const updateComments = (selectedPost, comment) => {
    const postIndex = data.findIndex((post) => post.id == selectedPost.id);
    if (comment.selectedCommentId) {
      const commentIndex = selectedPost.Comment.findIndex(
        (comment) => comment.id == selectedComment.id,
      );
      mutate(
        { ...data[postIndex].Comment[commentIndex].subComments, comment },
        { populateCache: true, revalidate: true },
      );
      setSelectedComment({
        ...selectedComment,
        subComments: [...selectedComment.subComments, comment],
      });
    } else {
      mutate({ ...data[postIndex].Comment, comment }, { revalidate: true });
      setSelectedPost({
        ...selectedPost,
        Comment: [...selectedPost.Comment, comment],
      });
    }
  };

  return (
    <div className={home.body}>
      <div className={home.navigation}>
        <h1 className={text.headingTitle}>Blog API</h1>
        <div className={home.searchContainer}>
          <RiSearch2Line className={icons.search} />
          <input
            type="text"
            name="search"
            id=""
            placeholder="Search"
            className={home.input}
            onChange={searchPosts}
          />
        </div>
      </div>
      <div className={home.container}>
        {loading && <p> Loading...</p>}
        {error && <p> Error = {error}</p>}
        {data && (
          <Posts
            data={
              filter
                ? data.filter(
                    (post) =>
                      post.text.toLowerCase().includes(filter.toLowerCase()) ||
                      post.title.toLowerCase().includes(filter.toLowerCase()),
                  )
                : data
            }
            toggleSelectedPost={toggleSelectedPost}
            selectedPost={selectedPost}
            commentsVisible={commentsVisible}
            toggleComments={toggleComments}
          />
        )}
        {selectedPost && commentsVisible && (
          <Comments
            updateComments={updateComments}
            selectedComment={selectedComment}
            selectedPost={selectedPost}
            toggleSelectedComment={toggleSelectedComment}
          />
        )}
      </div>
    </div>
  );
}
