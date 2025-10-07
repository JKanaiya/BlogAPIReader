import useSWR from "swr";
import axios from "axios";
import Comments from "./Comments";
import Posts from "./Posts";
import AppContext from "../AppContext";
import { useState } from "react";

export default function Home() {
  const getPosts = async (url) => {
    const posts = await axios.get(url + "posts");
    return posts.data;
  };

  const [selectedComment, setSelectedComment] = useState({});

  const [selectedPost, setSelectedPost] = useState({});

  const [user, setUser] = useState({});

  const toggleSelectedPost = (post) => {
    setSelectedPost(selectedPost ? null : post);
  };

  const toggleSelectedComment = (comment) => {
    setSelectedComment(selectedComment ? null : comment);
  };

  const {
    data,
    error,
    isLoading: loading,
  } = useSWR(import.meta.env.VITE_BACKEND_URL, getPosts);

  return (
    <div>
      <Comments
        data={data}
        selectedComment={selectedComment}
        selectedPost={selectedPost}
        toggleSelectedComment={toggleSelectedComment}
        user={user}
      />
      {loading && <p> Loading...</p>}
      {error && <p> Error = {error}</p>}
      {data && <Posts data={data} toggleSelectedPost={toggleSelectedPost} />}
    </div>
  );
}
