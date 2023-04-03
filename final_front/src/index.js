/* eslint-disable */
// eslint-disable-next-line

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { legacy_createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthLogic from "./util/authLogic";
import rootReducer from "./redux/rootReducer";
import firebaseApp from "./util/firebase";
import { setAuth } from "./redux/userAuth/action";
import { Provider } from "react-redux";
import "react-quill/dist/quill.snow.css";

const store = legacy_createStore(rootReducer);
console.log(store.getState()); // getState() state.js
const authLogic = new AuthLogic(firebaseApp);
// store에 있는 초기 상태 정보 출력
store.dispatch(
  setAuth(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider())
);
console.log(store.getState());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App authLogic={authLogic} />
      </BrowserRouter>
    </Provider>
  </>
);
