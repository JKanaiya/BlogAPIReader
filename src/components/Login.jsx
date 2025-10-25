import ApiCall from "../apiCalls";
import { useNavigate, useOutletContext } from "react-router";
import text from "../styles/text.module.css";
import auth from "../styles/auth.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router";

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
    <div className={auth.background}>
      <div className={auth.authCard}>
        <Link className={auth.closeIcon} to="/">
          <IoCloseOutline />
        </Link>
        <h1 className={text.headingTitle}>LOGIN</h1>
        <p className={text.italicText}>to continue your conversation</p>
        <form className={auth.form} action={attemptLogin}>
          <input
            className={auth.input}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
          />
          <input
            className={auth.input}
            type="password"
            name="password"
            id=""
            placeholder="Password"
          />
          <button className={auth.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
