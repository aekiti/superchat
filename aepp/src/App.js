import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { initSdk } from "./utils/aeternity";
import { AnimatePresence } from "framer-motion";
import {
  addUserAddress,
  addContractInstances,
  addSDK,
  addUserProfile,
} from "./actions/actionCreator.js";

import "./App.css";
import Home from "./UI/HomePage.js";
import Profile from "./UI/ProfilePage.js";
import Search from "./UI/SearchPage.js";
import Chat from "./UI/ChatPage.js";
import FooterNav from "./components/FooterNav.js";
// import ProfileBoard from "./components/ProfileBoard.js";

const App = ({ state, dispatch }) => {
  useEffect(() => {
    (async () => {
      let resp = await initSdk();
      dispatch(addUserAddress(resp.userAddress)); // add user address to store
      dispatch(addSDK(resp.sdk)); // add the SDK object to store
      dispatch(addContractInstances(resp.contractInstances)); // add contract instances to store

      // Fetch user profile
      let getProfile = (await resp.contractInstances.profileInstance.methods.get_profile()).decodedResult;

      // Empty profile
      if (getProfile.name === "") {
        try {
          let getSHProfile = await fetch(
            `https://raendom-backend.z52da5wt.xyz/profile/${resp.userAddress}`
          );
          let response = await getSHProfile.json();

          // Save user profile to blockchain
          await resp.contractInstances.profileInstance.methods.register_profile(
            response.preferredChainName || "false",
            response.biography || "false",
            response.image || "false"
          );

          // Save response to store
          dispatch(
            addUserProfile({
              username: response.preferredChainName,
              about: response.biography,
              profileImg: `https://raendom-backend.z52da5wt.xyz${response.image}`,
            })
          );
        } catch (e) {
          console.error("Error", e);
        }
      } else {
        // Save response to store
        dispatch(
          addUserProfile({
            username: getProfile.name,
            about: getProfile.about,
            profileImg: `https://raendom-backend.z52da5wt.xyz${getProfile.image}`,
          })
        );
      }
    })();
  }, [dispatch]);

  return (
    <Router>
      <main>
        <AnimatePresence exitBeforeEnter>
          <Switch key={window.location.pathname} location={window.location}>
            <Route path="/" component={Home} exact />
            <Route path="/profile" component={Profile} />
            <Route path="/search" component={Search} />
            <Route path="/chat" component={Chat} />
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
