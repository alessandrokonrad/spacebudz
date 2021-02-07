import React from "react";
import { Route } from "./components/Router";
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Landing from "./views/Landing";

const App = () => {
  const history = createBrowserHistory();
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Landing} title="NFT DAO"></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
