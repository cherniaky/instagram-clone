import { Link } from "react-router-dom"

export default function Footer({caption,username}) {
    return (
        <div className="footer-container">
            {/* <span className="footer-user">
                <Link to={`/p/${username}`}>{username}</Link>
            </span> */}
            <span className="footer-caption">{caption}</span>
        </div>
    );
}