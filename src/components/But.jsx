import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import oimage from "../imgs/oimage.jpeg";
import ximage from "../imgs/ximage.jpeg";

const Buttons = (props) => {
  const [hidden1, sethidden1] = useState("hidden");
  const [hidden2, sethidden2] = useState("hidden");
  useEffect(() => {
    if (props.hid === "X") {
      sethidden1("flex");
      sethidden2("hidden");
    } else if (props.hid === "O") {
      sethidden1("hidden");
      sethidden2("flex");
    } else {
      sethidden1("hidden");
      sethidden2("hidden");
    }
  }, [props.hid]);
  return (
    <div
      className={`w-20 h-20 bg-black flex items-center justify-center border-white border-2 rounded-3xl`}
    >
      <img src={oimage} alt="..." className={`w-full h-full p-2 ${hidden1}`} />
      <img src={ximage} alt="" className={`w-full p-3 ${hidden2}`} />
    </div>
  );
};

export default Buttons;
