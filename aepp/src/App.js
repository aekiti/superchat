import React from "react";
import "./App.css";
import FooterNav from "./components/FooterNav.js";
import MessageHeader from "./components/MessageHeader";
// import { initSdk } from "./utils/aeternity";

const App = () => {
  // initSdk();
  return (
    <>
      <MessageHeader /> <FooterNav />
    </>
  );
};
export default App;
