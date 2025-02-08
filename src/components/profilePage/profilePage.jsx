import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import "./ProfilePage.css";

const HOST = "http://localhost:8081/";

export const ProfilePage = ({ userId }) => {
    const [profile, setProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [fileErrorMessage, setFileErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshProfile, setRefreshProfile] = useState(false);
    const [notification, setNotification] = useState({ message: "", type: "" });

    // ✅ Fetch User Profile
    const fetchProfile = useCallback(async () => {
        const token = Cookies.get("token");
        if (!token) {
            setErrorMessage("Authorization token is missing.");
            return;
        }

        try {
            const response = await fetch(`${HOST}user/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to fetch profile data.");

            const data = await response.json();
            setProfile({
                ...data,
                userUrl: data.userUrl
                    ? (data.userUrl.startsWith("http")
                        ? data.userUrl
                        : `${HOST}${data.userUrl.replace(/^\/+/, "")}`)
                    : "/MealMate.png",
            });

            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setErrorMessage("Failed to fetch profile data.");
            setLoading(false);
        }
    }, [userId]);

    // ✅ Fetch Profile on Mount & Updates
    useEffect(() => {
        fetchProfile();
    }, [fetchProfile, refreshProfile]);

    // ✅ Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === "gender" ? value.toUpperCase() : value;
        setProfile((prev) => ({ ...prev, [name]: updatedValue }));
    };

    // ✅ Upload Profile Photo
    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== "image/png" && file.type !== "image/jpeg") {
                setNotification({ message: "❌ Only PNG or JPEG images are allowed.", type: "error" });
                return;
            }
            setFileErrorMessage("");

            const formData = new FormData();
            formData.append("profilePhoto", file);
            const token = Cookies.get("token");

            try {
                const response = await fetch(`${HOST}user/${userId}/photo/upload-photo`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                });

                if (!response.ok) throw new Error("Failed to upload photo.");

                const data = await response.json();
                setProfile((prev) => ({
                    ...prev,
                    userUrl: data.userUrl
                        ? `${HOST}uploads/${data.userUrl.replace(/^\/+/, "")}`
                        : "/MealMate.png",
                }));

                setNotification({ message: "🎉 Profile photo uploaded successfully!", type: "success" });
                setRefreshProfile((prev) => !prev);
            } catch (error) {
                console.error("Error uploading photo:", error);
                setNotification({ message: "❌ Failed to upload profile photo.", type: "error" });
            }
        }
    };

    // ✅ Update Profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get("token");

        if (!token) {
            setNotification({ message: "❌ Authorization token is missing.", type: "error" });
            return;
        }

        try {
            const updatedProfile = {
                ...profile,
                userUrl: profile.userUrl ? profile.userUrl.split("/").pop() : null,
            };

            const response = await fetch(`${HOST}user/${userId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProfile),
            });

            if (!response.ok) throw new Error("Failed to update profile.");

            setNotification({ message: "✅ Profile updated successfully!", type: "success" });
            setRefreshProfile((prev) => !prev);
        } catch (error) {
            console.error("Error updating profile:", error);
            setNotification({ message: "❌ Failed to update profile.", type: "error" });
        }
    };

    // ✅ Auto Dismiss Notifications
    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: "", type: "" });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    if (loading) return <p>Loading profile...</p>;

    return (
        <div className="profile-wrapper">
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    <span>{notification.message}</span>
                    <div className="progress-bar"></div>
                </div>
            )}

            <h2>User Profile</h2>

            <div className="profile-container">
                <div className="profile-photo-section">
                    <img
                        src={profile.userUrl || "/MealMate.png"}
                        alt="Profile"
                        className="profile-photo"
                        onError={(e) => (e.target.src = "/MealMate.png")}
                    />

                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handlePhotoChange}
                        className="photo-upload"
                    />
                    {fileErrorMessage && <p className="error-message">{fileErrorMessage}</p>}
                </div>

                <div className="profile-details-section">
                    <form onSubmit={handleSubmit}>
                        {[
                            { label: "Gender", name: "gender", type: "select", options: ["MALE", "FEMALE", "OTHER"] },
                            { label: "Weight", name: "weight", type: "number", placeholder: "Enter weight (kg)" },
                            { label: "Height", name: "height", type: "number", placeholder: "Enter height (cm)" },
                            { label: "Targeted Carbs", name: "targetedCarbs", type: "number", placeholder: "Enter targeted carbs (g)" },
                            { label: "Targeted Protein", name: "targetedProtein", type: "number", placeholder: "Enter targeted protein (g)" },
                            { label: "Targeted Calories", name: "targetedCalories", type: "number", placeholder: "Enter targeted calories" }
                        ].map((field) => (
                            <div className="form-group" key={field.name}>
                                <p className="section-header">{field.label}</p>
                                {field.type === "select" ? (
                                    <select
                                        name={field.name}
                                        value={profile[field.name] || ""}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Gender</option>
                                        {field.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option.charAt(0) + option.slice(1).toLowerCase()}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={profile[field.name] || ""}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </div>
                        ))}

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <button type="submit" className="update-btn">
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

ProfilePage.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default ProfilePage;
