import React from "react";
import "./App.scss";
import { Data } from "./DummyData/data";
import { useEffectOnce } from "./hooks/useEffectOnce";
import { User } from "./InterfaceTypes/intex";
import { MessageType, UserType } from "./types";
const { io } = require("socket.io-client");

export const Messaging = ({
  setUser,
  user,
}: {
  setUser: React.Dispatch<React.SetStateAction<User>>;
  user: User;
}) => {
  const bottomRef = React.useRef<null | HTMLDivElement>(null);

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
    // 👇️ scroll to bottom every time messages change
    // https://bobbyhadz.com/blog/react-scroll-to-bottom
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "auto" });
  }, [messages]);

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
      socket.on("/nick", (userPayload: UserType) => {
        if (userPayload.id !== socket.id) setOponentUser(userPayload.name);
      });

      socket.on("/oops", (updatedMessages: MessageType[]) => {
        setMessages(updatedMessages);
      });

      socket.on("/fadelast", (updatedMessages: MessageType[]) => {
        setMessages(updatedMessages);
      });
      socket.on(
        "/countdown",
        (payload: { count: number; link: string; user: UserType }) => {
          let counter = payload.count;

          var looper = setInterval(() => {
            if (counter === 1) {
              clearInterval(looper);
              if (socket.id !== payload.user.id)
                window.open(payload.link, "_blank");
            }
            counter--;
            setMessages((prev) => [
              ...prev,
              {
                timeStamp: new Date(),
                content: String(counter + 1) + "...",
                author: payload.user,
              },
            ]);
          }, 1000);
        }
      );
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
                  <div
                    className={`message`}
                    style={message.dark ? { color: "grey" } : {}}
                  >
                    {message.content}
                  </div>
                  {message.faded && <div className="fade"></div>}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
          <input
            disabled={!oponentUser}
            placeholder="Hit Enter to send"
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.length) {
                if (
                  inputValue.startsWith("/nick ") &&
                  inputValue.split("/nick ").length > 0
                ) {
                  socket.emit("/nick", {
                    name: inputValue.split("/nick ")[1],
                    id: user.id,
                  });
                } else if (
                  inputValue.startsWith("/think ") &&
                  inputValue.split("/think ").length > 0
                ) {
                  // makes the text appear in dark grey, instead of black
                  socket.emit("message", {
                    timeStamp: new Date(),
                    content: inputValue,
                    author: user,
                    dark: true,
                  });
                } else if (inputValue === "/oops") {
                  // removes the last message sent
                  socket.emit("/oops", socket.id, messages);
                } else if (inputValue === "/fadelast") {
                  // would fade out the last message to 10% visibility
                  socket.emit("/fadelast", socket.id, messages);
                } else if (inputValue.startsWith("/highlight ")) {
                  // would make the font of the message 10% bigger, and
                  // make the background 10% darker
                } else if (
                  inputValue.startsWith("/countdown ") &&
                  !isNaN(parseInt(inputValue.split(" ")[1], 10)) &&
                  inputValue.split(" ").length === 3
                ) {
                  // would start a visible countdown and redirect 5... 4...
                  // [...] 1... !!!
                  socket.emit("/countdown", {
                    count: parseInt(inputValue.split(" ")[1], 10),
                    link: inputValue.split(" ")[2],
                    user: { id: socket.id },
                  });
                } else
                  socket.emit("message", {
                    timeStamp: new Date(),
                    content: inputValue
                      .replace("(smile)", String.fromCodePoint(0x1f60a))
                      .replace("(wink)", String.fromCodePoint(0x1f609)),
                    author: user,
                  });
              }
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
