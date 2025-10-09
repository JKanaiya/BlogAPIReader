import { useRef, useState } from "react";
import ApiCall from "../apiCalls";
import { useOutletContext, useNavigate } from "react-router";

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
    <>
      <form action={attemptSignIn}>
        <input type="text" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id=""
          onBlur={changePassword}
          placeholder="Password"
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          onChange={updatePassConfirm}
        />
        {passwordConfirm && !(password.current == passwordConfirm) && (
          <p>"Passwords do not Match!"</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;
