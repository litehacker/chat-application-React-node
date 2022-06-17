import React from "react";
import { NavLink } from "react-router-dom";
import "./App.scss";
import { User } from "./InterfaceTypes/intex";

export const Home = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}) => {
  const [input, setInput] = React.useState<string>("");
  return (
    <div className="App">
      <div className="content" style={{ paddingTop: "50vh" }}>
        <input
          placeholder="Name here"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        <NavLink to="/chat">
          <button
            style={{ width: "100%" }}
            onClick={() => setUser({ id: "", name: input })}
            disabled={!(input.length > 0)}
          >
            Start chat
          </button>
        </NavLink>
      </div>
    </div>
  );
};
