import { useState, useContext } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { addComment, getUserByUserId } from "../../services/firebase";

export default function AddComment({
    docId,
    comments,
    setComments,
    commentInput,
}) {
    const [comment, setComment] = useState("");
    const { db } = useContext(FirebaseContext);
    const { user, activeUsername } = useContext(UserContext);

    const handleSubmitComment = async (event) => {
        event.preventDefault();
        let commentValue = comment;
        setComment("");
        setComments([...comments, { displayName: activeUsername, comment }]);

        await addComment(docId, commentValue, activeUsername);

        return;
    };

    return (
        <div className="comment-container">
            <form
                onSubmit={(event) => {
                    comment.length >= 1
                        ? handleSubmitComment(event)
                        : event.preventDefault();
                }}
                className="comment-form"
            >
                <input
                    autoComplete="off"
                    type="text"
                    value={comment}
                    onChange={({ target }) => {
                        setComment(target.value);
                    }}
                    className="comment-input"
                    placeholder="Add a comment..."
                    ref={commentInput}
                />
                <button
                    type="submit"
                    disabled={!comment}
                    className={`comment-button ${!comment ? "opacity-25" : ""}`}
                >
                    Send
                </button>
            </form>
        </div>
    );
}
