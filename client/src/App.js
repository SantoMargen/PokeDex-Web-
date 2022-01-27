import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
import Detail from "./views/detail";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/pokemon/:name" element={<Detail></Detail>}></Route>
      </Routes>
    </div>
  );
}
