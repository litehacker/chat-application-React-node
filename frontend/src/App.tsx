import React from "react";
import "./App.scss";
import { Data } from "./DummyData/data";
import { MessageType } from "./types";

const App = () => {
  const [messages, setMessages] = React.useState<MessageType[]>(
    new Data().getMessages()
  );
  const [userId] = React.useState("2");
  const [inputValue, setInputValue] = React.useState<string>("");

  return (
    <div className="App">
      <div className="content">
        <div className="chat">
          {messages.map((message) => {
            return (
              <div
                className={`${
                  message.author === userId ? "mine" : "yours"
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
