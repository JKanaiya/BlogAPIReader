import ApiCall from "../apiCalls";
import { useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import text from "../styles/text.module.css";
import auth from "../styles/auth.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router";
import Validate from "../components/Validate";

const Login = () => {
  const nav = useNavigate();
  const [login] = useOutletContext();
  const password = useRef(null);
  const email = useRef(null);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    passMatch: false,
  });

  const validateEmail = () => {
    if (Validate.email(email.current)) {
      setErrors({ ...errors, email: false });
      console.log(errors);
      return false;
    } else {
      setErrors({ ...errors, email: true });
      console.log(errors);
      return true;
    }
  };

  const validatePassword = () => {
    if (Validate.password(password.current)) {
      setErrors({ ...errors, password: false });
      return true;
    } else {
      setErrors({ ...errors, password: true });
      return false;
    }
  };

  const changeEmail = (e) => {
    email.current = e.target.value;
  };

  const changePassword = (e) => {
    password.current = e.target.value;
  };

  const validateForm = () => {
    if (!validateEmail()) return false;

    if (!validatePassword()) return false;

    setErrors({});
  };

  const attemptLogin = async (formData) => {
    if (!validateForm()) return;

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
          <div className={auth.inputContainer}>
            {errors.email && <div className={auth.error}>Invalid Email</div>}
            <input
              className={auth.input}
              type="text"
              name="email"
              id="email"
              onBlur={validateEmail}
              onChange={changeEmail}
              placeholder="Email"
            />
          </div>
          <div className={auth.inputContainer}>
            {errors.password && (
              <div className={auth.error}>Password must be at min 8 chars</div>
            )}
            <input
              className={auth.input}
              type="password"
              name="password"
              id="password"
              onBlur={validatePassword}
              onChange={changePassword}
              placeholder="Password"
            />
          </div>
          <button className={auth.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
