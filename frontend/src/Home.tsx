import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./App.scss";
import { User } from "./InterfaceTypes/intex";
const submitClick = () => {};

export const Home = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}) => {
  const [input, setInput] = React.useState("");
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
            onClick={(e) => setUser({ id: "1", name: input })}
            disabled={!(input.length > 0)}
          >
            Start chat
          </button>
        </NavLink>
      </div>
    </div>
  );
};
