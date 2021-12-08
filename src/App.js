import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { lazy, Suspense } from "react";
import * as ROUTES from './constants/routes';

const Login = lazy(() => import("./pages/login"));

function App() {
    const [inHome, setInHome] = useState(true);
    return (
        <Router basename="/instagram-clone">
            <NavBar inHome={inHome} />
            <Suspense fallback={<p>Loading</p>}>
                <div className="pagesContainer">
                    <Routes>
                        <Route exact path={ROUTES.LOGIN} element={<p>Loading</p>} />
                    </Routes>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
