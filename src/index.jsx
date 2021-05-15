import ReactDOM from "react-dom";
import "./index.css";
import UserProvider from "./context/UserContext";
import App from "./App";
import LocationProvider from "./context/LocationContext";
import SelectedLocationProvider from "./context/SelectedLocationContext";

ReactDOM.render(
  <UserProvider>
    <LocationProvider>
      <SelectedLocationProvider>
        <App />
      </SelectedLocationProvider>
    </LocationProvider>
  </UserProvider>,
  document.getElementById("root")
);
