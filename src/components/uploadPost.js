import { useState } from "react";
import { uploadPost } from "../services/firebase";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";

export default function UploadPost({ setActivePostUpload , user }) {
    const [fileToUpload, setFileToUpload] = useState(null);
    const [caption, setCaption] = useState("");

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
                        await uploadPost(
                            fileToUpload,
                            caption,
                            user.uid
                        );

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
                        <input
                            disabled={!caption || !fileToUpload}
                            className={`submit-post ${
                                !caption || !fileToUpload ? "disabled" : ""
                            }`}
                            type="submit"
                            value="Upload post"
                        />
                    </div>
                </form>{" "}
            </OutsideClickHandler>
            <div className="upload-shadow"></div>
        </>
    );
}
