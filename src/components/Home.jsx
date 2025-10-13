import useSWR from "swr";
import axios from "axios";
import Comments from "./Comments";
import Posts from "./Posts";
import { useContext, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../AuthContext";
import ApiCall from "../apiCalls";

export default function Home() {
  const [commentsVisible, setCommentsVisible] = useState(false);

  const [selectedComment, setSelectedComment] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);

  const getPosts = async (url) => {
    const posts = await axios.get(url + "posts");
    return posts.data;
  };

  const { isLoggedIn } = useContext(AuthContext);

  // const checkToken = () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     try {
  //       ApiCall.logIn();
  //       login();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   } else {
  //   }
  // };

  const toggleSelectedPost = (post) => {
    setSelectedPost(selectedPost ? null : post);
  };

  const toggleSelectedComment = (comment) => {
    setSelectedComment(selectedComment ? null : comment);
  };

  const toggleComments = () => {
    setCommentsVisible(commentsVisible ? false : true);
    console.log(isLoggedIn);
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
    console.log(comment);
    mutate({ ...data[postIndex].Comment, comment }, { revalidate: true });
    setSelectedPost({
      ...selectedPost,
      Comment: [...selectedPost.Comment, comment],
    });
  };

  return (
    <div>
      {commentsVisible && (
        <Comments
          updateComments={updateComments}
          selectedComment={selectedComment}
          selectedPost={selectedPost}
          toggleSelectedComment={toggleSelectedComment}
          data={data}
        />
      )}
      {loading && <p> Loading...</p>}
      {error && <p> Error = {error}</p>}
      {data && (
        <Posts
          data={data}
          toggleSelectedPost={toggleSelectedPost}
          selectedPost={selectedPost}
          toggleComments={toggleComments}
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
