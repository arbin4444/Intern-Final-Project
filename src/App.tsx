import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./subComponents/login/login";
import { EuiProvider } from "@elastic/eui";
import {SignUp} from "./subComponents/signUp/signUp"
import {UsersDetail} from "./subComponents/user/usersDetail"
function App() {
  return (
    <div className="App">
      <EuiProvider colorMode="light">
        <UsersDetail/>
      </EuiProvider>
    </div>
  );
}

export default App;
