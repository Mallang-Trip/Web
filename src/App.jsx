import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useGoogleTagManager, useInitialSetting } from "./hooks";
import store from "./redux/store";
import Router from "./router";
import PushNotification from "./components/PushNotification";
import PWAInstall from "./components/PWAInstall";
import RouteChangeTracker from "./components/RouteChangeTracker";

function App() {
  useInitialSetting();
  useGoogleTagManager();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouteChangeTracker />
        <Router />
      </BrowserRouter>
      <PushNotification />
      <PWAInstall />
    </Provider>
  );
}

export default App;
