import React, { useEffect, useState, useContext } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import "../styles/NavBar.css";
import * as ROUTES from "../constants/routes";
import { Link, Router, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Fuse from "fuse.js";
import { getAllProfiles, uploadPost } from "../services/firebase";
import SearchDropdown from "./searchDropdown";
import UploadPost from "./uploadPost";
import useUser from "../hooks/use-user";

export default function NavBar({ inHome, inProfile }) {
    const [searchValue, setSearchValue] = useState("");
    const {
        user: { profileIconSrc },
    } = useUser();
    // console.log(userDocInfo);
    const { user, activeUsername } = useContext(UserContext);
    const [activeSearchDropdown, setActiveSearchDropdown] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [activePostUpload, setActivePostUpload] = useState(false);

    const fuse = new Fuse(allUsers, {
        keys: ["username", "fullName"],
    });

    useEffect(() => {
        async function getAllUsers() {
            await getAllProfiles(activeUsername).then((result) =>
                setAllUsers(result)
            );
        }
        if (activeUsername) {
            getAllUsers();
        }
        // console.log(user1);
    }, [activeUsername]);

    const {
        firebase,
        db,
        auth,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
    } = useContext(FirebaseContext);

    return (
        <div className="navbar-container">
            <div className="nav-content-container">
                <Link to={ROUTES.DASHBOARD}>
                    <img
                        alt="instagram logo"
                        className="logo"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    />
                </Link>

                <div className="search-container">
                    <input
                        onChange={({ target }) => {
                            setSearchValue(target.value);
                        }}
                        value={searchValue}
                        onFocus={() => setActiveSearchDropdown(true)}
                        className={`nav-search ${
                            searchValue ? null : "search-img"
                        }`}
                        placeholder={
                            searchValue ? `   ${searchValue}` : "   Search"
                        }
                    />
                    {activeSearchDropdown ? (
                        <>
                            <SearchDropdown
                                users={fuse.search(searchValue)}
                                setActiveSearchDropdown={
                                    setActiveSearchDropdown
                                }
                            />{" "}
                            <div className="arrow"></div>
                        </>
                    ) : null}
                </div>

                {activePostUpload && (
                    <>
                        <UploadPost
                            user={user}
                            setActivePostUpload={setActivePostUpload}
                        />
                        
                    </>
                )}

                <div className="nav-icons">
                    <Link to={ROUTES.DASHBOARD}>
                        {inHome ? (
                            <svg
                                aria-label="Главная страница"
                                className="icon home"
                                color="#262626"
                                fill="#262626"
                                height="22"
                                role="img"
                                viewBox="0 0 48 48"
                                width="22"
                            >
                                <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
                            </svg>
                        ) : (
                            <svg
                                aria-label="home "
                                className="home icon"
                                color="#262626"
                                fill="#262626"
                                height="22"
                                role="img"
                                viewBox="0 0 48 48"
                                width="22"
                            >
                                <path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path>
                            </svg>
                        )}
                    </Link>

                    <svg
                        aria-label="Новая публикация"
                        className="icon"
                        color="#262626"
                        onClick={() => setActivePostUpload(!activePostUpload)}
                        fill="#262626"
                        height="22"
                        role="img"
                        viewBox="0 0 48 48"
                        width="22"
                    >
                        <path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4C1.6 41.4 0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4 4.1 6.6 1.6 9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4C46.4 6.6 48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4 12.1-2.6 2.5-5.6 4.1-12.2 4.1zM16.2 3C10 3 7.8 4.6 6.1 6.2 4.6 7.8 3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1 1.6 1.6 3.8 3.1 10 3.1h15.6c6.2 0 8.4-1.6 10.1-3.2 1.6-1.6 3.1-3.8 3.1-10V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path>
                        <path d="M36.3 25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path>
                        <path d="M24 37.8c-.8 0-1.5-.7-1.5-1.5V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.51.5v24.6c0 .8-.7 1.5-1.5 1.5z"></path>
                    </svg>

                    {user ? (
                        <>
                            <Link to={`/p/${activeUsername}` } className="profile-icon-container">
                                {profileIconSrc ? (
                                    <img
                                        className="navbar-profile-icon icon"
                                        src={profileIconSrc}
                                    />
                                ) : (
                                    <svg
                                        className="icon profile"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                )}

                                {inProfile && (<div className="inprofile-mark"></div>)}
                            </Link>

                            <Link to={ROUTES.LOGIN}>
                                <svg
                                    onClick={() => {
                                        signOut(auth);
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="icon "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to={ROUTES.LOGIN}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="icon login"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                    />
                                </svg>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
