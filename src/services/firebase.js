import {
    firebase,
    db,
    auth,
    signInWithEmailAndPassword,
} from "../lib/firebase";
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    limit,
    updateDoc,
    arrayUnion,
    arrayRemove,
    doc,
} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

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

            const { username, profileIconSrc } = await getUserByUserId(
                photo.userId
            );

            return { username, ...photo, userLikedPhoto, profileIconSrc };
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

export async function isUserFollowingProfile(username, profileUserId) {
    const q = query(
        collection(db, "users"),
        where("username", "==", username),
        where("following", "array-contains", profileUserId)
    );

    const querySnapshot = await getDocs(q);

    //console.log(!!querySnapshot.docs[0]);
    return !!querySnapshot.docs[0];
}

export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    activeUserId
) {
    await updateLoggedUserFollowing(
        activeUserDocId,
        profileUserId,
        isFollowingProfile
    );
    await updateFollowedUserFollowers(
        profileDocId,
        activeUserId,
        isFollowingProfile
    );

    return;
}

export async function getAllProfiles(username) {
    // const querySnapshot = await getDocs(collection(db, "users", limit(5)));
    const q = query(collection(db, "users"), limit(6));

    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot.docs[4].data());
    return querySnapshot.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.username != username);
}

export async function uploadPost(file, caption, userId) {
    try {
        // 1 - We add a message with a loading icon that will get updated with the shared image.
        const photoRef = await addDoc(collection(getFirestore(), "photos"), {
            caption: caption,
            comments: [],
            dateCreated: Date.now(),
            imageSrc: "",
            likes: [],
            //  photoId : `${userId}${Date.now()}`,
            userId: userId,
        });

        // 2 - Upload the image to Cloud Storage.
        const filePath = `${getAuth().currentUser.uid}/${photoRef.id}/${
            file.name
        }`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);

        // 3 - Generate a public URL for the file.
        const publicImageUrl = await getDownloadURL(newImageRef);

        // 4 - Update the chat message placeholder with the image's URL.
        await updateDoc(photoRef, {
            imageSrc: publicImageUrl,
            storageUri: fileSnapshot.metadata.fullPath,
        });
    } catch (error) {
        console.error(
            "There was an error uploading a file to Cloud Storage:",
            error
        );
    }
}

export async function uploadProfileIcon(file, docId) {
    try {
        // 1 - We add a message with a loading icon that will get updated with the shared image.
        const profileRef = doc(db, "users", docId);
        
        // 2 - Upload the image to Cloud Storage.
        const filePath = `${getAuth().currentUser.uid}/${profileRef.id}/${
            file.name
        }`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);

        // 3 - Generate a public URL for the file.
        const publicImageUrl = await getDownloadURL(newImageRef);

        // 4 - Update the chat message placeholder with the image's URL.
        await updateDoc(profileRef, {
            profileIconSrc: publicImageUrl,
           // storageUri: fileSnapshot.metadata.fullPath,
        });
    } catch (error) {
        console.error(
            "There was an error uploading a file to Cloud Storage:",
            error
        );
    }
}
