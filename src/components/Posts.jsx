export default function Posts({ data, toggleSelectedPost, selectedPost }) {
  return (
    <div>
      {selectedPost && (
        <div>
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
          <div key={post.id} onClick={() => toggleSelectedPost(post)}>
            <h3>{post.title}</h3>
            <button>see{post.id}</button>
          </div>
        ))}
    </div>
  );
}
