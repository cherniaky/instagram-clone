import Header from "./header";
import { useState, useEffect, useReducer } from "react";
import { collection } from "firebase/firestore";
import {
    getUserByUsername,
    getUserPhotosByUsername,
} from "../../services/firebase";
import Photos from "./photos";

export default function UserProfile({ user }) {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0,
        followingCount: 0,
    };

    const [
        { profile, photosCollection, followerCount, followingCount },
        dispatch,
    ] = useReducer(reducer, initialState);

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            //const getuser = await getUserByUsername(user.username);
            const photos = await getUserPhotosByUsername(user.username);
            // console.log(getuser);
            //console.log("photo", photos);
            dispatch({
                profile: user,
                photosCollection: photos,
                followerCount: user.followers.length,
                followingCount: user.following.length,
            });
        }

        getProfileInfoAndPhotos();

        return () => {};
    }, [user]);

    //console.log(profile,photosCollection.length);

    return (
        <div className="profile-content-container">
            <Header
                profile={profile}
                photosCount={photosCollection.length}
                followerCount={followerCount}
                setFollowerCount={dispatch}
                followingCount={followingCount}
            />
            <Photos photos={photosCollection} />
        </div>
    );
}
