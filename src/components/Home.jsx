import useSWR from "swr";
import axios from "axios";
import Comments from "./Comments";
import Posts from "./Posts";
import { useContext, useState } from "react";
import { Link, Outlet } from "react-router";
import AuthContext from "../AuthContext";

export default function Home() {
  const [commentsVisible, setCommentsVisible] = useState(false);

  const [selectedComment, setSelectedComment] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);

  const getPosts = async (url) => {
    const posts = await axios.get(url + "posts");
    return posts.data;
  };

  const { isLoggedIn } = useContext(AuthContext);

  const toggleSelectedPost = (post) => {
    setSelectedPost(selectedPost ? null : post);
    console.log(isLoggedIn);
  };

  const toggleSelectedComment = (comment) => {
    setSelectedComment(selectedComment ? null : comment);
  };

  const toggleComments = () => {
    setCommentsVisible(commentsVisible ? false : true);
  };

  const {
    data,
    error,
    isLoading: loading,
  } = useSWR(import.meta.env.VITE_BACKEND_URL, getPosts);

  return (
    <div>
      {commentsVisible && (
        <Comments
          data={data}
          selectedComment={selectedComment}
          selectedPost={selectedPost}
          toggleSelectedComment={toggleSelectedComment}
          commentsVisible={commentsVisible}
        />
      )}
      {loading && <p> Loading...</p>}
      {error && <p> Error = {error}</p>}
      {data && (
        <Posts
          data={data}
          toggleSelectedPost={toggleSelectedPost}
          selectedPost={selectedPost}
          setCommentsVisible={toggleComments}
        />
      )}
      {!isLoggedIn && (
        <div>
          <Link to="/auth/sign-up">Signup</Link>
          <Link to="/auth/log-in">Login</Link>
        </div>
      )}
    </div>
  );
}
