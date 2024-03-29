import React, { forwardRef } from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import * as timeago from "timeago.js";

const Message = forwardRef(
  (
    { id, contents: { timestamp, displayName, email, message, photo, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`message ${user.email === email && "message-sender"}`}
      >
        <Avatar src={photo} className="message_photo" />
        <p>{message}</p>
        <small>
          {timeago.format(new Date(timestamp?.toDate()).toLocaleString())};
        </small>
      </div>
    );
  }
);

export default Message;
