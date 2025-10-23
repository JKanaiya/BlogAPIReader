export default function Posts({
  data,
  toggleSelectedPost,
  selectedPost,
  toggleComments,
}) {
  return (
    <div>
      {selectedPost && (
        <div>
          <div>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.text}</p>
          </div>
          <button onClick={toggleComments}>toggle Comments</button>
        </div>
      )}
      {!data && <p> "No Posts are Available"</p>}
      {!selectedPost &&
        data.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <button onClick={() => toggleSelectedPost(post)}>
              see{post.id}
            </button>
          </div>
        ))}
    </div>
  );
}
