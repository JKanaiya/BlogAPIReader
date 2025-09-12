import axios from "axios";

const ApiCall = (function () {
  const url = import.meta.env.VITE_BACKEND_URL;

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const attemptCall = function (call) {
    return token ? call : "Token is invalid";
  };

  const getPosts = async function () {
    const posts = await axios.get(url + "posts");
    return posts.data;
  };

  const signUp = async function (formData) {
    return attemptCall(axios.post(url + "/sign-up", { headers, formData }));
  };

  const logOut = async function () {
    return attemptCall(axios.get(url + "/log-out", { headers }));
  };

  const logIn = async function (formData) {
    return attemptCall(axios.post(url + "/log-in", { headers, formData }));
  };

  const commentCreated = async function (formData) {
    return attemptCall(axios.put(url + "/comment", { headers, formData }));
  };

  const commentDeleted = async function (formData) {
    return attemptCall(axios.delete(url + "/comment", { headers, formData }));
  };

  const commentUpdated = async function (formData) {
    return attemptCall(axios.patch(url + "/comment", { headers, formData }));
  };

  return {
    getPosts,
    logIn,
    logOut,
    signUp,
    commentCreated,
    commentDeleted,
    commentUpdated,
  };
})();

export default ApiCall;
