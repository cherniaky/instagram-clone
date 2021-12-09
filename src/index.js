import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import App from "./App";
import FirebaseContext from "./context/firebase";
import {
    firebase,
    db,
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "./lib/firebase";

ReactDOM.render(
    <FirebaseContext.Provider
        value={{
            firebase,
            db,
            auth,
            signInWithEmailAndPassword,
            createUserWithEmailAndPassword,
        }}
    >
        <App />
    </FirebaseContext.Provider>,

    document.getElementById("root")
);
