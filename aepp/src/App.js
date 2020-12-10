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
import getUserBalance from "./utils/getUserBalance";
import getUserProfile from "./utils/getUserProfile.js";
import getFriendRequest from "./utils/getFriendRequest.js";
import getFriends from "./utils/getFriends.js";
import getSuperchatUsers from "./utils/getSuperchatUsers";

import "./App.css";
import Home from "./UI/HomePage.js";
import Profile from "./UI/ProfilePage.js";
import Search from "./UI/SearchPage.js";
import Chat from "./UI/ChatPage.js";
import FriendRequest from "./UI/FriendRequest.js";
import FooterNav from "./components/FooterNav.js";

const App = ({ state, dispatch }) => {
  useEffect(() => {
    (async () => {
      let resp = await initSdk();
      dispatch(addUserAddress(resp.userAddress)); // add user address to store
      dispatch(addSDK(resp.sdk)); // add the SDK object to store
      dispatch(addContractInstances(resp.contractInstances)); // add contract instances to store

      // Fetch all messages
      // Get all friends
      getFriends(resp.contractInstances.friendInstance, dispatch);

      // Get user balance
      getUserBalance(resp.sdk, resp.userAddress, dispatch)
      // Get user profile
      getUserProfile(
        resp.contractInstances.profileInstance,
        resp.userAddress,
        dispatch
      );
      // Get friend requests
      getFriendRequest(resp.contractInstances.friendInstance, dispatch);
      // Get Superchat users
      getSuperchatUsers(resp.contractInstances.profileInstance, dispatch)
    })();
  }, [dispatch]);

  return (
    <Router>
      <main className="app-container">
        <AnimatePresence>
          <Switch key={window.location.pathname} location={window.location}>
            <Route path="/" component={Home} exact />
            <Route path="/chat/:friendId" component={Chat} />
            <Route path="/profile" component={Profile} />
            <Route path="/request" component={FriendRequest} />
            <Route path="/search" component={Search} />
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
