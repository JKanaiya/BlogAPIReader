import useSWR from "swr";
import Comments from "./Comments";
import Posts from "./Posts";
import { useEffect, useState } from "react";
import ApiCall from "../apiCalls";

const Home = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const [data, setData] = useState(null);

  const [error, setError] = useState(null);

  // const [commentsVisible, setCommentsVisible] = useState(false);
  //
  // const seePost = (post) => {
  //   setSelectedPost(post);
  // };
  //

  // const { data, error, isLoading: loading } = useSWR(url, ApiCall.getPosts());

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiCall.getPosts();
        setData(data);
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, []);

  console.log(data);

  return (
    <div>
      {/* {commentsVisible && <Comments data={data} user={data.user} />} */}
      {error && <p> Error = {error}</p>}
      {data && <Posts data={data} />}
      {!error && !data && <p> Loading...</p>}
    </div>
  );
};

export default Home;
