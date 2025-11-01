import useSWR from "swr";
import axios from "axios";
import ApiCall from "../apiCalls";
import Comments from "./Comments";
import Posts from "./Posts";
import { useContext, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../AuthContext";
import home from "../styles/home.module.css";
import text from "../styles/text.module.css";
import comment from "../styles/comments.module.css";
import icons from "../styles/icons.module.css";
import { RiSearch2Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Home() {
  // TODO: Pass this functionality to the selected post and place it where it is always available
  const [commentsVisible, setCommentsVisible] = useState(false);

  const [selectedComment, setSelectedComment] = useState(null);

  // TODO: find a way to add comment properly to the hirarchy. Use debugger

  const [selectedPost, setSelectedPost] = useState(null);

  const [filter, setFilter] = useState(null);

  const getPosts = async (url) => {
    const posts = await axios.get(url + "posts");
    return posts.data;
  };

  const searchPosts = (e) => {
    setFilter(e.target.value);
  };

  const { isLoggedIn, email } = useContext(AuthContext);

  const updateComments = (selectedPost, comment) => {
    const postIndex = data.findIndex((post) => post.id == selectedPost.id);

    let b = selectedPost;

    let parentIndex;

    const findComment = (ob) => {
      if (ob.subComments == undefined) return false;
      if (ob.subComments.length == 0) return false;

      let a = ob.subComments.findIndex((c) => c.id == selectedComment.id);
      if (a >= 0) {
        if (!ob.subComments[a].subComments) {
          ob.subComments[a].subComments = [];
        }
        ob.subComments[a].subComments.push(comment);
        return ob;
      }

      ob.subComments.forEach((c) => {
        let n = findComment(c);
        if (n != false) {
          c = n;
          return ob;
        }
      });
    };

    parentIndex = selectedPost.Comment.findIndex(
      (c) => c.id == selectedComment.id,
    );

    if (selectedComment) {
      if (parentIndex < 0) {
        b.Comment.forEach((comment) => findComment(comment));

        setSelectedPost(b);

        let a = data;
        a[postIndex] = b;

        mutate(a, { revalidate: true });
      } else {
        let c = data[postIndex];
        c.Comment[parentIndex].subComments.push(comment);

        setSelectedPost(c);

        mutate();
      }
    } else {
      setSelectedPost({
        ...data[postIndex],
        Comment: [...selectedPost.Comment, comment],
      });
      mutate(
        { ...data[postIndex], Comment: [...selectedPost.Comment, comment] },
        { revalidate: true },
      );
    }
  };

  const addComment = async (formData) => {
    if (selectedComment) {
      const confirm = await ApiCall.createComment({
        comment: formData.get("comment"),
        postId: null,
        commentId: selectedComment.id,
        email,
      });
      console.log(confirm);
      if (confirm.status == 200) {
        updateComments(selectedPost, {
          id: confirm.data.id,
          text: formData.get("comment"),
          postId: selectedPost.id,
          subComments: [""],
          selectedCommentId: selectedComment.id,
          User: { email },
        });
      }
    } else {
      const confirm = await ApiCall.createComment({
        comment: formData.get("comment"),
        postId: selectedPost.id,
        email,
      });
      if (confirm.status == 200) {
        updateComments(selectedPost, {
          id: confirm.data.id,
          text: formData.get("comment"),
          subComments: [""],
          postId: selectedPost.id,
          User: { email },
        });
      }
    }
  };

  const toggleSelectedPost = (post) => {
    setSelectedPost(selectedPost ? null : post);
  };

  const toggleSelectedComment = (comment) => {
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
        {commentsVisible && (
          <div className={comment.container}>
            {selectedPost &&
              commentsVisible &&
              selectedPost.Comment.map((comment) => {
                return (
                  <div key={comment.id}>
                    <Comments
                      updateComments={updateComments}
                      selectedComment={selectedComment}
                      comment={comment}
                      selectedPost={selectedPost}
                      toggleSelectedComment={toggleSelectedComment}
                    />
                  </div>
                );
              })}
            {isLoggedIn ? (
              <form action={addComment} className={home.addComment}>
                <input
                  type="text"
                  name="comment"
                  className={home.input}
                  id=""
                  placeholder="Share your thoughts"
                />
                <button type="submit">
                  <IoIosAddCircleOutline />
                </button>
              </form>
            ) : (
              <div className={home.authCheck}>
                <div className={home.links}>
                  <Link to="/auth/log-in">LogIn</Link>
                  <p className={home.authText}> or </p>
                  <Link to="/auth/sign-up">SignUp</Link>
                </div>
                <p className={home.authText}>to join the conversation</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
