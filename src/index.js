import React from "react";
import ReactDOM from "react-dom";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./store";
import theme from "./theme";

// ReactDOM.render(
//   <React.StrictMode>
//     <StoreProvider store={store}>
//       <GeistProvider theme={theme}>
//         <CssBaseline />
//         <App />
//       </GeistProvider>
//     </StoreProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <React.StrictMode>
      <StoreProvider store={store}>
        <GeistProvider theme={theme}>
          <CssBaseline />
          <App />
        </GeistProvider>
      </StoreProvider>
    </React.StrictMode>,
    rootElement
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <StoreProvider store={store}>
        <GeistProvider theme={theme}>
          <CssBaseline />
          <App />
        </GeistProvider>
      </StoreProvider>
    </React.StrictMode>,
    rootElement
  );
}
