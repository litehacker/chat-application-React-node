import React from "react";
import { io, Socket } from "socket.io-client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./InterfaceTypes/intex";

function App() {
  const [socket, setSocket] = React.useState<
    Socket<ServerToClientEvents, ClientToServerEvents>
  >(io("http://localhost:3000", { transports: ["websocket"] }));

  React.useEffect((): any => {
    return () => socket.close();
  }, [setSocket]);

  return <div className="App">Hello React</div>;
}

export default App;
