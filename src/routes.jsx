import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Login from "./components/Login";
// import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  { path: "log-in", element: <Login /> },
  { path: "sign-up", element: <SignUp /> },
];

export default routes;
