import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import NavBar from "../components/NavBar";
import UserProfile from "../components/profile/userprofile";
import '../styles/profile.css'

export default function Profile({ setInHome, setInProfile, inProfile }) {
    const navigate = useNavigate();
    const { username } = useParams();
    
    // console.log(username);
    const [userExists, setUserExists] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setInProfile(true);
        setInHome(false);
        return () => {
             setInProfile(false);
             setInHome(false);
        };
    }, []);

    useEffect(() => {
        async function checkUserExist() {
            const getUser = await getUserByUsername(username);

            if (getUser) {
                setUser(getUser);
                document.title =`${getUser.fullName}(@${getUser.username})` ;
                setUserExists(true);
            } else {
                setUserExists(false);
                navigate(ROUTES.NOT_FOUND);
            }
        }

        checkUserExist();
        
    }, [username, navigate]);

    return userExists ? (
        <div className="profile-container">
            <NavBar inProfile={inProfile} />
            <UserProfile  user={user}/>
        </div>
    ) : null;
}
