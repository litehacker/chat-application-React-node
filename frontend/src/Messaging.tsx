import React from "react";
import "./App.scss";
import { Data } from "./DummyData/data";
import { useEffectOnce } from "./hooks/useEffectOnce";
import { User } from "./InterfaceTypes/intex";
import { MessageType } from "./types";
const { io } = require("socket.io-client");
export const Messaging = ({
  setUser,
  user,
}: {
  setUser: React.Dispatch<React.SetStateAction<User>>;
  user: User;
}) => {
  // mock data
  // const [messages, setMessages] = React.useState<MessageType[]>(
  //   new Data().getMessages()
  // );
  // -----------
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [socket, setSocket] = React.useState<any>(undefined);
  const [oponentUser, setOponentUser] = React.useState<string>("");
  useEffectOnce(() => {
    setSocket(io("http://localhost:5000"));
    return () => console.log("my effect is destroying");
  });

  React.useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        socket.emit("add user", { id: socket.id, name: user.name });
        if (user) setUser({ ...user, id: socket.id });
        setLoading(false);
      });
      socket.on("message", (payload: MessageType) => {
        console.log(payload);
        setMessages((prev) => [...prev, payload]);
      });
      socket.on("users", (userNames: any[]) => {
        console.log(userNames);
        setOponentUser(
          userNames[0].name === user.name
            ? userNames[1].name
            : userNames[0].name
        );
      });
    }
  }, [socket]);

  return (
    <div className="App">
      {!loading && user && (
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
            <h2>Chat with - {oponentUser.toString()}</h2>
          </div>
          <div className="chat">
            {messages.map((message, i) => {
              return (
                <div
                  key={i}
                  className={`${
                    message.author.id === user.id ? "mine" : "yours"
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
              if (e.key === "Enter" && inputValue.length)
                socket.emit("message", {
                  timeStamp: new Date(),
                  content: inputValue,
                  author: user,
                });
              return handleKeyDown(e, setInputValue);
            }}
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
        </div>
      )}
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
