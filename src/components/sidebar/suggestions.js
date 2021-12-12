import { useState, useEffect, useContext } from "react";
//import { collection, getDocs } from "firebase/firestore";
//import FirebaseContext from "../../context/firebase";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./SuggestedProfile";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Suggestions({ userId, following ,docId}) {
    const [profiles, setProfiles] = useState(null);
    // const {db} = useContext(FirebaseContext);

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }

        if (userId) {
            suggestedProfiles();
        }

        //console.log(profiles);
        return () => {};
    }, [userId]);


    return !profiles ? (
        <p>
            {" "}
            <div className="suggestions-title">Suggestions for you</div>
            <Skeleton count={5} width={170} height={50} />
        </p>
    ) : profiles.length > 0 ? (
        <div className="suggestions-container">
            <div className="suggestions-title">Suggestions for you</div>
            <div className="suggestions-list">
                {profiles.map((profile) => (
                    <SuggestedProfile
                        key={profile.docId}
                        spDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        loggedUserDocId={docId}
                    />
                ))}
            </div>
        </div>
    ) : null;
}
