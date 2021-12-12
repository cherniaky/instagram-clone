import { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function Actions({
    docId,
    totalLikes,
    likedPhoto,
    handleFocus,
}) {
    const { user } = useContext(UserContext);
    const [toggleLiked, setToggleLiked] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);

    const { db } = useContext(FirebaseContext);

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        const LikedPhotoRef = doc(db, "photos", docId);

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));

        toggleLiked
            ? await updateDoc(LikedPhotoRef, {
                  likes: arrayRemove(user.uid),
              })
            : await updateDoc(LikedPhotoRef, {
                  likes: arrayUnion(user.uid),
              });
    };

    return (
        <div className="actions-container">
            <svg
                onClick={handleToggleLiked}
                // onKeyDown={(event) => {
                //     if (event.key === "Enter") {
                //         handleToggleLiked();
                //     }
                // }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                tabIndex={0}
                className={` Like action ${toggleLiked ? "activeLike" : ""}`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>

            <svg
                aria-label=""
                onClick={handleFocus}
                class="action "
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
            >
                <path
                    d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                    fill="none"
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                ></path>
            </svg>
            <div className="count-likes">
                <p>{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
            </div>
           
        </div>
    );
}
