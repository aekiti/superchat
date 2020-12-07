import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { initSdk } from "./utils/aeternity";
import {
  addUserAddress,
  addContractInstances,
  addSDK,
} from "./actions/actionCreator.js";

import "./App.css";
import Home from "./UI/HomePage.js";
import Profile from "./UI/ProfilePage.js";
import Search from "./UI/SearchPage.js";
import Chat from "./UI/ChatPage.js";
import FooterNav from "./components/FooterNav.js";
// import ProfileBoard from "./components/ProfileBoard.js";

const App = ({ state, addUserAddress, addSDK, addContractInstances }) => {
  useEffect(() => {
    (async () => {
      let resp = await initSdk();
      addUserAddress(resp.userAddress); // add user address to store
      addSDK(resp.sdk); // add the SDK object to store
      addContractInstances(resp.contractInstances); // add contract instances to store

      // Fetch user profile
      let getProfile = (
        await resp.contractInstances.profileInstance.methods.get_profile(
          resp.userAddress
        )
      ).decodedResult;

      console.log(getProfile);
    })();
  }, [addUserAddress, addSDK, addContractInstances]);

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

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  addUserAddress: (addr) => dispatch(addUserAddress(addr)),
  addContractInstances: (instances) =>
    dispatch(addContractInstances(instances)),
  addSDK: (sdk) => dispatch(addSDK(sdk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
