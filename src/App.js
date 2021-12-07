import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [inHome,setInHome]=useState(true);
    return (
        <Router basename="/instagram-clone">
            <NavBar inHome={inHome} />
            <div className="pagesContainer">
                <Routes>
                    <Route exact path="/" element={<div>hi</div>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
