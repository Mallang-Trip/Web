import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.ts";
import Router from "./router";
import PushNotification from "./components/PushNotification";
import PWAInstall from "./components/PWAInstall";
import useInitialSetting from "./hooks/useInitialSetting";

function App() {
  useInitialSetting();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <PushNotification />
      <PWAInstall />
    </Provider>
  );
}

export default App;
