import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./imessage.css";

function Imessage() {
  return (
    <div className="imessage">
      {/*sidebar0*/}
      <Sidebar />
      <Chat />
      {/*chat*/}
    </div>
  );
}

export default Imessage;
