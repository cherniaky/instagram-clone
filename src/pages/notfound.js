import "../styles/notfound.css";
import { useEffect } from "react";

export default function NotFound() {
    useEffect(() => {
        document.title = "Not Found!";
        return () => {
            document.title = "Instagram";
        };
    }, []);

    return <div className="not-found-page">Not found</div>;
}
