import { useEffect, useState, useContext } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import { onAuthStateChanged } from "firebase/auth";
import { getUserByUserId } from "../services/firebase";


export default function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);
    const {auth} = useContext(FirebaseContext);

    useEffect(() => {
        async function getUserObjByUserId() {
            const response = await getUserByUserId(user.uid);

            setActiveUser(response);
        }

        if (user?.uid) {
            getUserObjByUserId();
        }
        else{
            setActiveUser({username:'You dont log in',fullName:'', userId:'',})
        }

        return () => {};
    }, [user,auth])

    return { user: activeUser };
}
