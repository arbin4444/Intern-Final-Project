import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./subComponents/login/login";
import { EuiProvider } from "@elastic/eui";

function App() {
  return (
    <div className="App">
      <EuiProvider colorMode="light">
        <Login />
      </EuiProvider>
    </div>
  );
}

export default App;
