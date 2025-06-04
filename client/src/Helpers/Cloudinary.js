import React from "react";

export default function CLoudinary() {

    const [url, setUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const cloud_name = 'dcinkczc2';
    const upload_preset = 'JobFinder';

    const handleUpload = async (e) => {
        setUploading(true);

        const file = e.target.files[0];
        if (!file) return;

        const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setUrl(data.secure_url);

        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };


    return (
        <>
            <div className="mb-3">
                <img src={imageUrl} alt="Profile Picture" class="profile-pic" style={{ width: "100px" }} />
                <input
                    type="file"
                    className="form-control"
                    onChange={handleUpload}
                    disabled={uploading}
                />
                {uploading &&
                    <div className="spinner-border text-primary mt-2" role="status">
                        <span className="visually-hidden">Uploading...</span>
                    </div>
                }
            </div>
        </>
    )
}
