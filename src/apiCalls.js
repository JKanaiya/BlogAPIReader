import axios from "axios";

const ApiCall = (function () {
  const url = import.meta.env.VITE_BACKEND_URL;

  const getToken = () => localStorage.getItem("token");

  const attemptCall = async function (call) {
    const token = getToken();
    return token == null ? await call : "Token is invalid";
  };

  const signUp = async function (formData) {
    const result = await axios.post(url + "sign-up", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return result;
  };

  const logOut = function () {
    return attemptCall(
      axios.get(url + "log-out", {
        headers: `Authorization: Bearer ${getToken()}`,
      }),
    );
  };

  const logIn = async function (formData) {
    const result = await axios.post(url + "log-in", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return result;
  };

  const createComment = function (formData) {
    return attemptCall(
      axios.put(url + "comment", {
        headers: `Authorization: Bearer ${getToken()}`,
        formData,
      }),
    );
  };

  const updateComment = function (formData) {
    return attemptCall(
      axios.patch(url + "comment", {
        headers: `Authorization: Bearer ${getToken()}`,
        formData,
      }),
    );
  };

  const deleteComment = function (formData) {
    return attemptCall(
      axios.delete(url + "comment", {
        headers: `Authorization: Bearer ${getToken()}`,
        formData,
      }),
    );
  };

  return {
    signUp,
    logIn,
    logOut,
    createComment,
    updateComment,
    deleteComment,
  };
})();

export default ApiCall;
