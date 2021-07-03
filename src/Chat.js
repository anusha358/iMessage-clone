import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { IconButton } from "@material-ui/core";
import Message from "./Message.js";
import { selectUser } from "./features/userSlice";
import { selectChatName, selectChatId } from "./features/chatSlice";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function Chat() {
  const [input, setInput] = useState("");
  const user = useSelector(selectUser);
  const changeInput = (e) => setInput(e.target.value);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  });

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <h4>
          To: <span className="contact">{chatName}</span>
        </h4>
        <strong className="details">Details</strong>
      </div>
      <div className="chat_messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat_input">
        <form>
          <input
            type="text"
            placeholder="iMessage"
            value={input}
            onChange={changeInput}
          ></input>
          <button className="sendtext" onClick={sendMessage}>
            Send
          </button>
        </form>
        <IconButton>
          <MicNoneIcon className="mic-icon" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
