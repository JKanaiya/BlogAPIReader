import { useState } from "react";

const Posts = function ({ data, user }) {
  const [selectedPost, setSelectedPost] = useState(null);

  const [commentsVisible, setCommentsVisible] = useState(false);

  const seePost = (post) => {
    setSelectedPost(post);
  };

  return (
    <div>
      {selectedPost && (
        <div>
          <button onClick={setCommentsVisible}>
            {commentsVisible ? "Hide Comments" : "View Comments"}
          </button>
          {/* TODO: change this to the correct sytledComponent component */}
          <div>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.text}</p>
          </div>
        </div>
      )}
      {!data && <p> "No Posts are Available"</p>}
      {data &&
        !selectedPost &&
        data.map((post) => (
          <div key={post.id} onClick={() => seePost(post)}>
            <h3>{post.title}</h3>
            <button>see{post.id}</button>
          </div>
        ))}
    </div>
  );
};

export default Posts;
