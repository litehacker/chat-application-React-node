import React from "react";
import "./App.scss";
import { Data } from "./DummyData/data";
import { User } from "./InterfaceTypes/intex";
import { MessageType } from "./types";
const { io } = require("socket.io-client");

const App = () => {
  const [messages, setMessages] = React.useState<MessageType[]>(
    new Data().getMessages()
  );
  const [user] = React.useState<User>(new Data().getUser());
  const [inputValue, setInputValue] = React.useState<string>("");
  const [socket] = React.useState(io("http://localhost:5000"));
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  return (
    <div className="App">
      <div className="content">
        <div
          style={{
            height: 50,
            background: "white",
            borderRadius: 3,
            border: "1px solid lightblue",
            fontSize: 14,
            fontWeight: 500,
            paddingLeft: "8px",
          }}
        >
          <h2>Chat with - {user.name}</h2>
        </div>
        <div className="chat">
          {messages.map((message, i) => {
            return (
              <div
                key={i}
                className={`${
                  message.author === user.id ? "mine" : "yours"
                } messages `}
              >
                <div className={`message`}>{message.content}</div>
              </div>
            );
          })}
        </div>
        <input
          placeholder="Hit Enter to send"
          onKeyDown={(e) => {
            return handleKeyDown(e, setInputValue);
          }}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </div>
    </div>
  );
};
const handleKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
) => {
  if (event.key === "Enter") {
    setInputValue("");
  }
};

export default App;
