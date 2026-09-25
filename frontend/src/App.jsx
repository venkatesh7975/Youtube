import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Counter from "./components/Counter";
import Dummy from "./components/Dummy";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Button from "./components/Button";

export default function App() {
  return (
    <BrowserRouter>
      <h1>App</h1>
      <Button />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dummy" element={<Dummy name="sai" college="nec" />} />
      </Routes>
    </BrowserRouter>
  );
}
