import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dummy from "./components/Dummy";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <h1>App</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      <Route path="/dummy" element={<Dummy name="sai" college="nec"/>} />
      </Routes>
    </BrowserRouter>
  );
}
