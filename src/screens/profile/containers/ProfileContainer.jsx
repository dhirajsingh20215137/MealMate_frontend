import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useProfileApi } from "../api";
import ProfileForm from "../components/ProfileForm";
import ProfilePhoto from "../components/ProfilePhoto";
import Notification from "../components/Notification";
import "../../../index.css";

const ProfileContainer = () => {
    const { getProfile, updateProfile, uploadPhoto } = useProfileApi();
    const [profile, setProfile] = useState(null);
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [fileErrorMessage, setFileErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch {
                setNotification({ message: "Failed to load profile.", type: "error" });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            try {
                const data = await uploadPhoto(file);
                console.log("handlePhotoChange",data);
                setProfile((prev) => ({ ...prev, userUrl: data.userUrl }));
                setNotification({ message: "Photo uploaded successfully!", type: "success" });
            } catch {
                setNotification({ message: "Failed to upload photo.", type: "error" });
            }
        } else {
            setFileErrorMessage("Only PNG or JPEG images are allowed.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(profile);
            setNotification({ message: "Profile updated successfully!", type: "success" });
        } catch {
            setNotification({ message: "Failed to update profile.", type: "error" });
        }
    };

    if (loading) return <CircularProgress className="m-auto" />;

    return (
        <div className="flex flex-col items-center p-6  400 min-h-screen">
            <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />

            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div className="flex  rounded-lg shadow-md p-6 gap-8"
             style={{ backgroundColor: "#6A9C89" }}>
                <ProfilePhoto userUrl={profile.userUrl} onPhotoChange={handlePhotoChange} fileErrorMessage={fileErrorMessage} />
                <ProfileForm profile={profile} onChange={handleChange} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default ProfileContainer;
