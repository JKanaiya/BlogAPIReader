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

  // const attemptCall = async function (call) {
  //   const token = getToken();
  //   return token != null ? await call : "Token is invalid";
  // };

  const signUp = async function (formData) {
    const result = await api.post("sign-up", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return result;
  };

  const logOut = function () {
    return api.get("log-out");
  };

  const logIn = async function (formData) {
    const result = await api.post("log-in", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return result;
  };

  const createComment = async function (formData, postId, commentId, email) {
    return commentId
      ? await api.put("comment", {
        comment: formData.get("comment"),
        postId,
        commentId,
        email,
        parentComment: true,
      })
      : await api.put("comment", {
        comment: formData.get("comment"),
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
