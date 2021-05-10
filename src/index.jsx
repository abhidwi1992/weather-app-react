import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import UserProvider from "./context/UserContext";
import App from "./App";
import LocationProvider from "./context/LocationContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <LocationProvider>
        <App />
      </LocationProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
