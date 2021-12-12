import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId, getPhotos } from "../services/firebase";

export default function usePhotos() {
    const [photos, setPhotos] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getTimelinePhotos() {
            const { following } = await getUserByUserId(user.uid);

            let followedUserPhotos = [];

            if (following.length > 0) {
                followedUserPhotos = await getPhotos(user.uid, following);

                followedUserPhotos.sort(
                    (a, b) => b.dateCreated - a.dateCreated
                );

                setPhotos(followedUserPhotos);
                // console.log(followedUserPhotos);
            }
        }

        if (user?.uid) {
            getTimelinePhotos();
        }
    }, [user?.uid]);

    return { photos };
}
