import { useState } from "react";
import { uploadPost } from "../services/firebase";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function UploadPost({ setActivePostUpload, user }) {
    const [fileToUpload, setFileToUpload] = useState(null);
    const [caption, setCaption] = useState("");
    const [uploading, setUploading] = useState(false);

    return (
        <>
            <OutsideClickHandler
                onOutsideClick={() => {
                    setActivePostUpload(false);
                }}
            >
                <form
                    onSubmit={async function (e) {
                        e.preventDefault();
                        setUploading(true);
                        await uploadPost(fileToUpload, caption, user.uid);
                        setUploading(false);
                        setCaption("");
                        setActivePostUpload(false);
                    }}
                    className="upload-form"
                >
                    <p className="upload_p">Create a post</p>

                    <div className="form-content-container">
                        <label
                            for="image_uploads"
                            className="image-upload-label"
                        >
                            Choose photo to upload (PNG, JPG)
                        </label>
                        <input
                            onChange={(e) => setFileToUpload(e.target.files[0])}
                            id="image_uploads"
                            accept="image/png, image/jpeg"
                            className="image-upload"
                            type="file"
                            required
                        />

                        {fileToUpload ? (
                            <img
                                className="preview-img"
                                src={URL.createObjectURL(fileToUpload)}
                            />
                        ) : null}

                        <input
                            type="text"
                            className="caption-upload"
                            placeholder="Add caption"
                            onChange={(e) => setCaption(e.target.value)}
                            value={caption}
                            required
                        />
                        {uploading ? (
                            <Loader
                                type="TailSpin"
                                color="#0095F6"
                                className="submit-post loading-circle"
                                height={40}
                                width={40}
                            />
                        ) : (
                            <input
                                disabled={!caption || !fileToUpload}
                                className={`submit-post ${
                                    !caption || !fileToUpload ? "disabled" : ""
                                }`}
                                type="submit"
                                value="Upload post"
                            />
                        )}
                    </div>
                </form>{" "}
            </OutsideClickHandler>

            <div className="upload-shadow"></div>

            <div className="close-upload">
                <svg
                    aria-label="Закрыть"
                    class="_8-yf5 "
                    color="#ffffff"
                    fill="#ffffff"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                >
                    <polyline
                        fill="none"
                        points="20.643 3.357 12 12 3.353 20.647"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                    ></polyline>
                    <line
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        x1="20.649"
                        x2="3.354"
                        y1="20.649"
                        y2="3.354"
                    ></line>
                </svg>
            </div>
        </>
    );
}
