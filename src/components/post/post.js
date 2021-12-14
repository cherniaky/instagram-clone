import { useRef } from "react";
import Actions from "./actions";
import Comments from "./comments";
import Footer from "./footer";
import Header from "./header";
import Image from "./image";

export default function Post({ content }) {
    const commentInput = useRef(null);

    const handleFocus = () => commentInput.current.focus();

    return (
        <div className="post-container">
            <Header username={content.username} />
            <Image src={content.imageSrc} />
            <Actions
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
            <Footer username={content.username} caption={content.caption} />
            <Comments
                docId={content.docId}
                allComments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}
            />
        </div>
    );
}
