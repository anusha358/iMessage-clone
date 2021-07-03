import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_logo">
        <img
          src="https://dakseven.files.wordpress.com/2020/03/apple-messages-100798860-large.jpg"
          alt="imessage-Logo"
        ></img>

        <h1>iMessage</h1>
      </div>
      <Button onClick={signIn}> Login </Button>
    </div>
  );
}

export default Login;
