import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setAutoLogin, setColorTheme, setScreenHeight } from "./utils";
import store from "./redux/store";
import Router from "./router";
import PushNotification from "./components/PushNotification";

function App() {
  useEffect(() => {
    setColorTheme();
    setScreenHeight();

    window.addEventListener("unload", setAutoLogin);
    window.addEventListener("resize", setScreenHeight);
    return () => {
      window.removeEventListener("unload", setAutoLogin);
      window.removeEventListener("resize", setScreenHeight);
    };
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <PushNotification />
    </Provider>
  );
}

export default App;
