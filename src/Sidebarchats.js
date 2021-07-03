import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./sidebar_chats.css";
import { Avatar } from "@material-ui/core";
import { setChat } from "./features/chatSlice";
import db from "./firebase";

function SidebarChats({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setchatInfo] = useState([]);
  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setchatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        );
      }}
      className="sidebarChats"
    >
      <Avatar className="sidebarChats_avatar" src={chatInfo[0]?.photo} />

      <div className="sidebarChats_info">
        <h3> {chatName} </h3>
        <p> {chatInfo[0]?.message}</p>
        <small>
          {" "}
          {new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString()}
        </small>
      </div>
    </div>
  );
}
export default SidebarChats;
