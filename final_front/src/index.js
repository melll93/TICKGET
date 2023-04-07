/* eslint-disable */
// eslint-disable-next-line

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { legacy_createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import rootReducer from "./redux/rootReducer";
import { Provider } from "react-redux";
import "react-quill/dist/quill.snow.css";


const store = legacy_createStore(rootReducer);
// console.log(store.getState());
// store에 있는 초기 상태 정보 출력
// store.dispatch();
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>
);
