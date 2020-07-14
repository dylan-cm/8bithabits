import React, { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./styles/globalStyles.css";
import * as serviceWorker from "./utils/serviceWorker";
import Routes from "./routes";

render(
  <Provider store={store}>
    <StrictMode>
      <Routes />
    </StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
