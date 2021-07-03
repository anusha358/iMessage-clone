import React, { useEffect } from "react";

import "./App.css";
import Imessage from "./Imessage";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logedin
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        //user logout
        dispatch(logout());
      }
    });
  }, []);
  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;
