import axios from "axios";

const ApiCall = (function () {
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json", // Common content type
    },
  });

  // Add an interceptor to include the token with every request
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // Or sessionStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const signUp = async function (formData) {
    const result = await api
      .post("sign-up", {
        email: formData.get("email"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm"),
      })
      .catch(function (err) {
        return err.response;
      });
    return result;
  };

  const logOut = function () {
    return api.get("log-out");
  };

  const logIn = async function (formData) {
    const result = await api
      .post("log-in", {
        email: formData.get("email"),
        password: formData.get("password"),
      })
      .catch(function (err) {
        return err.response;
      });
    return result;
  };

  const createComment = async function (comment, postId, commentId, email) {
    return commentId
      ? await api.put("comment", {
          comment,
          postId,
          commentId,
          email,
          parentComment: true,
        })
      : await api.put("comment", {
          comment,
          postId,
          email,
        });
  };

  const updateComment = async function (formData) {
    return await api.patch("comment", formData);
  };

  const deleteComment = async function (formData) {
    return await api.delete("comment", formData);
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
