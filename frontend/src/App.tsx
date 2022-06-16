import React from "react";
import "./App.scss";
import { Data } from "./DummyData/data";
import { MessageType } from "./types";

const App = () => {
  const [messagesProvider, setMessagesProvider] = React.useState(new Data());
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [userId, setUserId] = React.useState("2");

  React.useEffect(() => {
    setMessages(messagesProvider.getMessages());
  }, []);
  return (
    <div className="App">
      <div className="content">
        <div className="chat">
          {messages.map((message) => {
            return (
              <>
                <div className="mine messages">
                  <div className="message">Dude</div>
                </div>
              </>
            );
          })}
          <div className="mine messages">
            <div className="message">Dude</div>
          </div>
          <div className="yours messages">
            <div className="message">Hey!</div>
            <div className="message">You there?</div>
            <div className="message">Hello, how's it going?</div>
          </div>
          <div className="mine messages">
            <div className="message">Great thanks!</div>
            <div className="message">How about you?</div>
          </div>
        </div>
        <input placeholder="Hit Enter to send" />
      </div>
    </div>
  );
};

export default App;
