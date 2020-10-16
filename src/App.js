import React from "react";
import { Router, Route } from "./components/Router";
import { Landing, Browse } from "./views";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Router>
        <div style={{ width: "100%" }}>
          <div style={{ minHeight: "100vh" }}>
            <Header />
            <Route exact path="/" component={Landing} title="SpaceBudz"></Route>
            <Route
              exact
              path="/browse"
              component={Browse}
              title="SpaceBudz | Browse"
            ></Route>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
