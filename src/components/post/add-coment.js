import { useState, useContext } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { getUserByUserId } from "../../services/firebase";

export default function AddComment({
    docId,
    comments,
    setComments,
    commentInput,
}) {
    const [comment, setComment] = useState("");
    const { db } = useContext(FirebaseContext);
    const { user , username } = useContext(UserContext);

    
}
