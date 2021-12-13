import { formatDistance } from "date-fns";
import { useState, useEffect, useContext } from "react";
//import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import UserContext from "../../context/user";

export default function Comments({ docId, allComments, posted, commentInput }) {
    const [comments, setComments] = useState(allComments);


     const { user, activeUsername } = useContext(UserContext);

    console.log(activeUsername);


    return (
        <div>
            {comments.length >= 3 && (
                <p className="view-all-comments">
                    View all {comments.length} comments
                </p>
            )}
            {comments.slice(0, 3).map((item) => (
                <p>
                    <Link
                        className="user-comment-link"
                        to={`/p/${item.displayName}`}
                    >
                        {item.displayName}
                    </Link>
                    <span className="user-comment">{item.comment}</span>
                </p>
            ))}
            <p className="time-posted">
                {formatDistance(posted, new Date())} ago 
            </p>
        </div>
    );
}
