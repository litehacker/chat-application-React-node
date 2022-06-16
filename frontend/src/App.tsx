import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <div className="content">
        <div className="chat">
          <div className="mine messages">
            <div className="message last">Dude</div>
          </div>
          <div className="yours messages">
            <div className="message">Hey!</div>
            <div className="message">You there?</div>
            <div className="message last">Hello, how's it going?</div>
          </div>
          <div className="mine messages">
            <div className="message">Great thanks!</div>
            <div className="message last">How about you?</div>
          </div>
        </div>
        <input placeholder="Hit Enter to send" />
      </div>
    </div>
  );
};

export default App;
