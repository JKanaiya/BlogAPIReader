import { useRef, useState } from "react";
import ApiCall from "../apiCalls";
import { useOutletContext, useNavigate } from "react-router";
import text from "../styles/text.module.css";
import auth from "../styles/auth.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router";

const SignUp = () => {
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const password = useRef(null);
  const [login] = useOutletContext();
  const nav = useNavigate();

  const updatePassConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const changePassword = (e) => {
    password.current = e.target.value;
  };

  const attemptSignIn = async (formData) => {
    const confirm = await ApiCall.signUp(formData);

    if (confirm.status == 200) {
      const loginConfirm = await ApiCall.logIn(formData);

      if (loginConfirm.status == 200) {
        localStorage.setItem("token", loginConfirm.data.token);
        login(formData.get("email"));
        nav("/");
      }
    }
  };

  return (
    <div className={auth.background}>
      <div className={auth.authCard}>
        <Link className={auth.closeIcon} to="/">
          <IoCloseOutline />
        </Link>
        <h1 className={text.headingTitle}>Sign in</h1>
        <p className={text.italicText}>to join the conversation</p>
        <form action={attemptSignIn} className={auth.form}>
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
            onBlur={changePassword}
            placeholder="Password"
          />
          <input
            className={auth.input}
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            onChange={updatePassConfirm}
          />
          {passwordConfirm && !(password.current == passwordConfirm) && (
            <p>"Passwords do not Match!"</p>
          )}
          <button className={auth.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
