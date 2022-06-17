import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { User } from "./InterfaceTypes/intex";
import { Messaging } from "./Messaging";

export const App = () => {
  const [user, setUser] = React.useState<User>({ id: "", name: "" });
  return (
    <Routes>
      <Route path="/" element={<Home setUser={setUser} />} />
      {user.name.length && (
        <Route
          path="chat"
          element={<Messaging setUser={setUser} user={user} />}
        />
      )}
      <Route path="*" element={<Home setUser={setUser} />} />
    </Routes>
  );
};
