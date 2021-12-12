import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Comments({
    docId,
    allComments,
    posted,
    commentInput,
}) {
    const [comments, setComments] = useState(allComments);

    return (
        <div>
            {comments && <p>View all {comments.length} com</p>}
        </div>
    );
}
