import React from "react";
import { Route } from "./components/Router";
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Landing, Browse, Profile } from "./views";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const history = createBrowserHistory();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Router history={history}>
        <div style={{ width: "100%" }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} title="SpaceBudz"></Route>
            <Route
              path="/explore"
              component={Browse}
              title="SpaceBudz | Explore"
            ></Route>

            <Route
              path="/profile/:address"
              component={Profile}
              title="SpaceBudz | Profile"
            ></Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
