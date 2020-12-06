import React from "react";
import "./App.css";
import logo from "./assets/logo-small.png";
import FooterNav from "./components/FooterNav";
import ProfileBoard from "./components/ProfileBoard";
import { initSdk } from "./utils/aeternity";

const App = () => {
  (async () => {
    let k = await initSdk();
    console.log(k);

    let resp = (await k.profileInstance.methods.get_profile()).decodedResult;
    console.log(resp);

    // Fetch user profile
    // fetch user message list
  })();

  return (
    <>
      <ProfileBoard
        avatar={logo}
        username="YinkaEnochz"
        lastMessage="When are you coming home? We have a party to attend by evening. Do you still remember, darling?"
      />
      <FooterNav />
    </>
  );
};
export default App;
