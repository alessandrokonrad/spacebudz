import React from "react";
import { Router, Route } from "./components/Router";
import { Landing, Home } from "./views";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Landing} title="SpaceBudz"></Route>
      <Route
        exact
        path="/home"
        component={Home}
        title="SpaceBudz | Home"
      ></Route>
    </Router>
  );
};

export default App;
