import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import Router from "./router";
import PushNotification from "./components/PushNotification";
import useInitialSetting from "./hooks/useInitialSetting";

function App() {
  useInitialSetting();

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
