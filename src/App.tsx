import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./subComponents/login/login";
import { EuiProvider } from "@elastic/eui";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp } from "./subComponents/signUp/signUp";
import {BooksDetails} from "./subComponents/books/booksDetail"
import {ProtectedRoute} from "./subComponents/route/protectedRoute"

function App() {
  return (
    <div className="App">
      <EuiProvider colorMode="light">
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booksdetail" element={
              <ProtectedRoute>

                <BooksDetails />
              </ProtectedRoute>
              } />
              
          </Routes>
        </Router>
      </EuiProvider>
    </div>
  );
}

export default App;
