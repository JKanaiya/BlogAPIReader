import axios from "axios";

const ApiCall = (function () {
  const url = import.meta.env.VITE_BACKEND_URL;

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const attemptCall = async function (call) {
    return token ? await call : "Token is invalid";
  };

  const signUp = function (formData) {
    return attemptCall(axios.post(url + "sign-up", { headers, formData }));
  };

  const logOut = function () {
    return attemptCall(axios.get(url + "log-out", { headers }));
  };

  const logIn = function (formData) {
    return attemptCall(axios.post(url + "log-in", { headers, formData }));
  };

  const commentCreated = function (formData) {
    return attemptCall(axios.put(url + "comment", { headers, formData }));
  };

  const commentUpdated = function (formData) {
    return attemptCall(axios.patch(url + "comment", { headers, formData }));
  };

  const commentDeleted = function (formData) {
    return attemptCall(axios.delete(url + "comment", { headers, formData }));
  };

  return {
    signUp,
    logIn,
    logOut,
    commentCreated,
    commentUpdated,
    commentDeleted,
  };
})();

export default ApiCall;
