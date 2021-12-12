import "../styles/timeline.css";
import usePhotos from "../hooks/use-photos";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Post from "./post/post";

export default function Timeline() {
    const { photos } = usePhotos();

    //console.log(photos);

    return (
        <div className="timeline-container">
            {!photos ? (
                <>  
                <Skeleton count={4} width={500} height={600}/>
                </>
            ) : photos?.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content}/>)
            ) : (<p>Follow people to see photos</p>)}
        </div>
    );
}
