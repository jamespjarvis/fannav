import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import FanNav from "./components/FanNav";
import {
  faUser,
  faAmbulance,
  faPaperPlane,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
const menuItems = [
  {
    title: "User",
    icon: faUser,
    className: "btn btn-primary",
    to: "https://google.com"
  },
  {
    title: "Calendar",
    icon: faCalendar,
    className: "btn btn-success",
    to: "https://google.com"
  },
  {
    title: "Ambulance",
    icon: faAmbulance,
    className: "btn btn-danger",
    to: "https://google.com"
  },
  {
    title: "Send",
    icon: faPaperPlane,
    className: "btn btn-info",
    to: "https://google.com"
  }
];
function App() {
  return (
    <div className="App">
      <FanNav items={[...menuItems, ...menuItems.slice(0, 2)]} />
    </div>
  );
}

export default App;
