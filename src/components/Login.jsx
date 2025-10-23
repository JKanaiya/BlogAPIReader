import ApiCall from "../apiCalls";
import { useNavigate, useOutletContext } from "react-router";
import style from "../styles/heading.module.css";

const Login = () => {
  const nav = useNavigate();
  const [login] = useOutletContext();

  const attemptLogin = async (formData) => {
    const confirm = await ApiCall.logIn(formData);
    if (confirm.status == 200) {
      localStorage.setItem("token", confirm.data.token);
      login(formData.get("email"));
      nav("/");
    }
  };

  return (
    <>
      <h1 className={style.headingTitle}>LOGIN</h1>
      <p>to continue your conversation</p>
      <form action={attemptLogin}>
        <input type="text" name="email" id="email" placeholder="Email" />
        <input type="password" name="password" id="" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
