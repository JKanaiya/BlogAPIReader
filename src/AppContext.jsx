import { createContext } from "react";

const AppContext = createContext({
  selectedPost: null,
  selectedComment: null,
  toggleSelectedComment: () => { },
  toggleSelectedPost: () => { },
});

export default AppContext;
