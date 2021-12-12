import FirebaseContext from "../context/firebase";
import { useState, useContext, useEffect } from "react";
import "../styles/loginPage.css";
import loginImg from "../assets/login-page.jpg";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function Login() {
    const navigate = useNavigate();
    const { signInWithEmailAndPassword, auth } =
        useContext(FirebaseContext);
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const isInvalid = password == "" || emailAddress == "";

    const HandleLogin = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, emailAddress, password);
            navigate(ROUTES.DASHBOARD);
        } catch (error) {
            console.log(error.message)
            setPassword("");
            setEmailAddress("");
            setError(error)
        }
    };

    useEffect(() => {
        document.title = "Login-Instagram";
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

                    <div className="error">
                        {error && "Invalid email or password"}
                    </div>

                    <form onSubmit={HandleLogin} className="inputs">
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
                            Log in
                        </button>
                    </form>
                </div>

                <div className="login-form sign-up">
                    Don't have an account?{" "}
                    <Link className="link" to={ROUTES.SIGN_UP}>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
