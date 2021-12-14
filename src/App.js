import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./context/user";
import { getUserByUserId } from "./services/firebase";

import ProtectedRoute from "./helpers/protected.route";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const NotFound = lazy(() => import("./pages/notfound"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));

function App() {
    const [inHome, setInHome] = useState(false);
    const [inProfile, setInProfile] = useState(false);
    const [username, setUsername] = useState("");
    const { user } = useAuthListener();

    async function getUsername() {
        const myuser = await getUserByUserId(user.uid);
        return myuser.username;
    }

    if (user) {
        getUsername().then((result) => setUsername(result));
    }

    return (
        <UserContext.Provider value={{ user, activeUsername: username }}>
            <Router basename="/instagram-clone">
                <Suspense fallback={<p>Loading...</p>}>
                    <div className="pagesContainer">
                        <Routes>
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

                            <Route
                                exact
                                path={ROUTES.PROFILE}
                                element={
                                    <Profile
                                        inProfile={inProfile}
                                        setInHome={setInHome}
                                        setInProfile={setInProfile}
                                    />
                                }
                            />

                            <Route
                                exact
                                path={ROUTES.DASHBOARD}
                                element={<ProtectedRoute user={user} />}
                            >
                                <Route
                                    exact
                                    path={ROUTES.DASHBOARD}
                                    element={
                                        <Dashboard
                                            inHome={inHome}
                                            setInHome={setInHome}
                                            setInProfile={setInProfile}
                                        />
                                    }
                                />
                            </Route>

                            <Route path=":a" element={<NotFound />} />
                        </Routes>
                    </div>
                </Suspense>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
