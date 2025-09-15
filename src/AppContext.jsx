import { createContext } from "react";

export const AppContext = createContext({
  selectedPost: {},
  selectedComment: {},
  setSelectedComment: (comment) => {
    this.selectedComment = comment;
  },
  clearSelectedCommment: () => {
    this.selectedComment = null;
  },
  toggleSelectedPost: (post) => {
    this.selectedPost ? null : post;
  },
});
