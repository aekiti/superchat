import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { initSdk } from "./utils/aeternity";
import { AnimatePresence } from "framer-motion";
import {
  addUserAddress,
  addContractInstances,
  addSDK,
} from "./actions/actionCreator.js";
import getUserProfile from "./utils/getUserProfile.js";
import getFriendRequest from "./utils/getFriendRequest.js";

import "./App.css";
import Home from "./UI/HomePage.js";
import Profile from "./UI/ProfilePage.js";
import Search from "./UI/SearchPage.js";
import Chat from "./UI/ChatPage.js";
import FooterNav from "./components/FooterNav.js";
import FriendRequest from "./UI/FriendRequest.js";
// import ProfileBoard from "./components/ProfileBoard.js";

const App = ({ state, dispatch }) => {
  useEffect(() => {
    (async () => {
      let resp = await initSdk();
      dispatch(addUserAddress(resp.userAddress)); // add user address to store
      dispatch(addSDK(resp.sdk)); // add the SDK object to store
      dispatch(addContractInstances(resp.contractInstances)); // add contract instances to store

      // Get user profile
      getUserProfile(
        resp.contractInstances.profileInstance,
        resp.userAddress,
        dispatch
      );
      // Get friend requests
      getFriendRequest(
        resp.contractInstances.friendInstance,
        resp.userAddress,
        dispatch
      );

      // Fetch all messages
    })();
  }, [dispatch]);

  return (
    <Router>
      <main className="app-container">
        <AnimatePresence>
          <Switch key={window.location.pathname} location={window.location}>
            <Route path="/" component={Home} exact />
            <Route path="/profile" component={Profile} />
            <Route path="/search" component={Search} />
            <Route path="/chat" component={Chat} />
            <Route path="/friend-request" component={FriendRequest} />
            <Route component={Home} />
          </Switch>
          <FooterNav />
        </AnimatePresence>
      </main>
    </Router>
  );
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps, null)(App);
