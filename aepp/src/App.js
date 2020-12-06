import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import logo from "./assets/logo-small.png";
import Home from "./UI/HomePage.js";
import Profile from "./UI/ProfilePage.js";
import Search from "./UI/SearchPage.js";
import Chat from "./UI/ChatPage.js";
import FooterNav from "./components/FooterNav.js";
import ProfileBoard from "./components/ProfileBoard.js";
// import { initSdk } from "./utils/aeternity";

const App = () => {
  // useEffect(() => {
  //   (async () => {
  //     let { contractInstances: k } = await initSdk();
  //     console.log(k);
  //   })();
  // }, []);

  return (
    <Router>
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/profile" component={Profile} />
          <Route path="/search" component={Search} />
          <Route path="/chat" component={Chat} />
          <Route component={Home} />
        </Switch>
        <FooterNav />
      </main>
    </Router>
  );
};
export default App;
