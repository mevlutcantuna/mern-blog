import { render } from "react-dom";
import App from "./App";
import "./styles/global.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
