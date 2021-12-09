import FirebaseContext from "../context/firebase";
import { useState, useContext, useEffect } from "react";
import "../styles/loginPage.css";
import loginImg from "../assets/login-page.png";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export default function SignUp() {
    const navigate = useNavigate();
    const {
        firebase,
        signInWithEmailAndPassword,
        auth,
        db,
        createUserWithEmailAndPassword,
    } = useContext(FirebaseContext);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const isInvalid = password == "" || emailAddress == "";

    const HandleSignUp = async (event) => {
        event.preventDefault();

        const usernameExist = doesUsernameExist(username);
        console.log(usernameExist);
        if (!( await usernameExist) ) {
            try {
                const createdUserResult = await createUserWithEmailAndPassword(
                    auth,
                    emailAddress,
                    password
                );

                // await createdUserResult.user.updateProfile({
                //     displayName: username,
                // });

                await addDoc(collection(db, "users"), {
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    dateCreated: Date.now(),
                });
                navigate(ROUTES.DASHBOARD);
            } catch (error) {
                setFullName("");
                setEmailAddress("");
                setPassword("");
                setUsername("");
                setError(error.message);
            }
        } else {
            setError("This username is already taken");
        }
    };

    useEffect(() => {
        document.title = "Sign Up - Instagram";
        return () => {
            document.title = "Instagram";
        };
    }, []);

    return (
        <div className="login-page-container">
            <img className="login-img" src={loginImg} alt="iphone" />
            <div className="login-form-container">
                <div className="login-form">
                    <img className="login-logo" src={logo} />

                    {error && <div className="error">{error}</div>}

                    <form onSubmit={HandleSignUp} className="inputs">
                        <input
                            type="text"
                            placeholder="Username"
                            onChange={({ target }) => {
                                setUsername(target.value);
                            }}
                            value={username}
                        />
                        <input
                            type="text"
                            placeholder="Full name"
                            onChange={({ target }) => {
                                setFullName(target.value);
                            }}
                            value={fullName}
                        />
                        <input
                            type="text"
                            placeholder="Email adress"
                            onChange={({ target }) => {
                                setEmailAddress(target.value);
                            }}
                            value={emailAddress}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={({ target }) => {
                                setPassword(target.value);
                            }}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`submit-button ${
                                isInvalid ? "opacity-50" : ""
                            }`}
                        >
                            Sign up
                        </button>
                    </form>
                </div>

                <div className="login-form sign-up">
                    Have an account?{" "}
                    <Link className="link" to={ROUTES.LOGIN}>
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
