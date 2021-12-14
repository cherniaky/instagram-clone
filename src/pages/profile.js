import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import NavBar from "../components/NavBar";
import Header from "../components/profile/header";

export default function Profile({ setInHome, setInProfile, inProfile }) {
    const navigate = useNavigate();
    const { username } = useParams();
    // console.log(username);
    const [userExists, setUserExists] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setInProfile(true);
        setInHome(false);
        return () => {};
    }, []);

    useEffect(() => {
        async function checkUserExist() {
            const getUser = await getUserByUsername(username);

            if (getUser) {
                setUser(getUser);
                document.title = getUser.fullName;
                setUserExists(true);
            } else {
                setUserExists(false);
                navigate(ROUTES.NOT_FOUND);
            }
        }

        checkUserExist();
        
    }, [username]);

    return userExists ? (
        <div className="profile-container">
            <NavBar inProfile={inProfile} />
            <div className="profile-content-container">
                <Header />
                {/*  <Photos/> */}
            </div>
        </div>
    ) : null;
}
