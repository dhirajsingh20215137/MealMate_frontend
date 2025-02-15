import { useState, useEffect } from "react";
import ProfileComponent from "../components/Profile";
import { useProfileApi } from "../api";
import { CircularProgress } from "@mui/material";

const ProfileContainer = () => {
    const { getProfile, updateProfile, uploadPhoto } = useProfileApi();
    const [profile, setProfile] = useState(null);
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [fileErrorMessage, setFileErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [passwordLoading, setPasswordLoading] = useState(false);

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

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            try {
                const data = await uploadPhoto(file);
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

    const handlePasswordChange = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setNotification({ message: "New password and confirm password do not match.", type: "error" });
            return;
        }

        setPasswordLoading(true);
        try {
            await updateProfile({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });

            setNotification({ message: "Password updated successfully!", type: "success" });
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            setNotification({ message: error.response?.data?.message || "Failed to update password.", type: "error" });
        } finally {
            setPasswordLoading(false);
        }
    };

    if (loading) return <CircularProgress className="m-auto" />;

    return (
        <ProfileComponent
            profile={profile}
            setProfile={setProfile}
            notification={notification}
            setNotification={setNotification}
            handleSubmit={handleSubmit}
            handlePasswordChange={handlePasswordChange}
            handlePhotoChange={handlePhotoChange}
            fileErrorMessage={fileErrorMessage}
            passwordData={passwordData}
            setPasswordData={setPasswordData}
            passwordLoading={passwordLoading}
        />
    );
};

export default ProfileContainer;
