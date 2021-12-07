import React, { useEffect, useState } from "react";
//import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return <Router basename="/instagram-clone">
      <div className="pagesContainer">
        <Routes>
          <Route exact path="/" element={}/>
        </Routes>
      </div>
    </Router>;
}

export default App;
