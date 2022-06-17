import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { User } from "./InterfaceTypes/intex";
import { Messaging } from "./Messaging";

export const App = () => {
  const [user, setUser] = React.useState<User>();
  return (
    <Routes>
      <Route path="/" element={<Home setUser={setUser} />} />
      <Route path="chat" element={<Messaging />} />
    </Routes>
  );
};
