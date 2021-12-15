import {
    firebase,
    db,
    auth,
    signInWithEmailAndPassword,
} from "../lib/firebase";
import {
    collection,
    query,
    where,
    getDocs,
    limit,
    updateDoc,
    arrayUnion,
    arrayRemove,
    doc,
} from "firebase/firestore";

export async function doesUsernameExist(username) {
    const q = query(collection(db, "users"), where("username", "==", username));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.length;
}

export async function getUserByUsername(username) {
    const q = query(collection(db, "users"), where("username", "==", username));

    const querySnapshot = await getDocs(q);

    const user = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    }));

    return user[0];
}

export async function getUserByUserId(userId) {
    const q = query(collection(db, "users"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    const user = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    }));

    return user[0];
}

export async function getSuggestedProfiles(userId, following) {
    // const querySnapshot = await getDocs(collection(db, "users", limit(5)));
    const q = query(collection(db, "users"), limit(5));

    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot.docs[4].data());
    return querySnapshot.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter(
            (profile) =>
                profile.userId != userId && !following.includes(profile.userId)
        );
}

export async function updateLoggedUserFollowing(
    loggedUserDocId,
    profileId,
    followed
) {
    const loggedUserRef = doc(db, "users", loggedUserDocId);

    followed
        ? await updateDoc(loggedUserRef, {
              following: arrayRemove(profileId),
          })
        : await updateDoc(loggedUserRef, {
              following: arrayUnion(profileId),
          });

    return;
}

export async function updateFollowedUserFollowers(spDocId, userId, followed) {
    const FollowedUserRef = doc(db, "users", spDocId);

    followed
        ? await updateDoc(FollowedUserRef, {
              followers: arrayRemove(userId),
          })
        : await updateDoc(FollowedUserRef, {
              followers: arrayUnion(userId),
          });

    return;
}

export async function getPhotos(userId, following) {
    const q = query(collection(db, "photos"), where("userId", "in", following));

    const querySnapshot = await getDocs(q);

    const userFollowedPhotos = querySnapshot.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id,
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }

            const { username } = await getUserByUserId(photo.userId);

            return { username, ...photo, userLikedPhoto };
        })
    );

    return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
    const { userId } = await getUserByUsername(username);
    const q = query(collection(db, "photos"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    const photos = querySnapshot.docs
        .map((item) => ({
            ...item.data(),
            docId: item.id,
        }))
        .sort((a, b) => b.dateCreated - a.dateCreated);

    return photos;
}

export async function addComment(docId, comment, displayName) {
    const photoRef = doc(db, "photos", docId);

    await updateDoc(photoRef, {
        comments: arrayUnion({ displayName, comment }),
    });

    return;
}

export async function isUserFollowingProfile(userId,profileId) {
    
}