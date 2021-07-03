import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReview";
import { IconButton } from "@material-ui/core";
import SidebarChats from "./Sidebarchats";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "./firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addChat = () => {
    const chatName = prompt("Please Enter a contact to create chat");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar_avatar"
        />
        <div className="sidebar_header_input">
          <SearchIcon />
          <input placeholder="Search"></input>
        </div>
        <IconButton className="sidebar_inputbutton" onClick={addChat}>
          <RateReviewOutlinedIcon />
        </IconButton>
      </div>
      <div className="sidebar_chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChats key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
