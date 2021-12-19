import { useState } from "react";
import {  uploadProfileIcon } from "../../services/firebase";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function UploadProfileIcon({  setActiveUploadProfileIcon, user }) {
    const [fileToUpload, setFileToUpload] = useState(null);
    const [uploading, setUploading] = useState(false);

    console.log(user)
    return (
        <>
            <OutsideClickHandler
                onOutsideClick={() => {
                    setActiveUploadProfileIcon(false);
                }}
            >
                <form
                    onSubmit={async function (e) {
                        e.preventDefault();
                        setUploading(true);
                        await uploadProfileIcon(fileToUpload, user.docId);
                        setUploading(false);
                       
                        setActiveUploadProfileIcon(false);
                    }}
                    className="upload-form"
                >
                    <p className="upload_p">Upload new icon</p>

                    <div className="form-content-container">
                        <label
                            for="image_uploads"
                            className="image-upload-label"
                        >
                            Choose icon to upload (PNG, JPG)
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
                                disabled={ !fileToUpload}
                                className={`submit-post ${
                                    !fileToUpload ? "disabled" : ""
                                }`}
                                type="submit"
                                value="Change profile icon"
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
