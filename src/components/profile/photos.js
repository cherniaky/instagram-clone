import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Photos({ photos }) {
    return (
        <div className="profile-photos-container">
            {!photos ? (
                <Skeleton count={1} width={935} height={400} />
            ) : photos.length > 0 ? (
                photos.map((photo) => (
                    <div key={photo.docId} className="profile-photo-container">
                        <img src={photo.imageSrc} />
                        <p className="profile-photo-detail">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="profile-actions"
                                width="24"
                                height="24"
                                stroke="currentColor"
                                tabIndex={0}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            {photo.likes.length}
                            <svg
                                aria-label=""
                                className="profile-actions"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path
                                    d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                ></path>
                            </svg>
                            {photo.comments.length}
                        </p>
                    </div>
                ))
            ) : (
                <div className="no-photos">No posts yet</div>
            )}
        </div>
    );
}
