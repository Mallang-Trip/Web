import { memo } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useInitialSetting, useGoogleTagManager } from "@/hooks";
import { PushNotification, PWAInstall } from "@/components";
import store from "@/redux/store";
import Router from "@/router";
import RouteChangeTracker from "@/router/RouteChangeTracker";

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

export default memo(App);
