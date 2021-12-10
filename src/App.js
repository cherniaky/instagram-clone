import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./context/user";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const NotFound = lazy(() => import("./pages/notfound"));
const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
    const [inHome, setInHome] = useState(true);
    const { user } = useAuthListener();
    return (
        <UserContext.Provider value={{ user }}>
            <Router basename="/instagram-clone">
                <Suspense fallback={<p>Loading...</p>}>
                    <div className="pagesContainer">
                        <Routes>
                            <Route
                                exact
                                path={ROUTES.DASHBOARD}
                                element={<Dashboard />}
                            />
                            <Route
                                exact
                                path={ROUTES.LOGIN}
                                element={<Login />}
                            />
                            <Route
                                exact
                                path={ROUTES.SIGN_UP}
                                element={<SignUp />}
                            />
                            <Route path=":a" element={<NotFound />} />
                        </Routes>
                    </div>
                </Suspense>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
