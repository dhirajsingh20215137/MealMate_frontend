import { useState, useEffect } from "react";
import ProfileComponent from "../components/Profile";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import { useProfileApi } from "../api";
import { useAuth } from "../../../auth";

const ProfileContainer = () => {
  const { getProfile, updateProfile, uploadPhoto } = useProfileApi();
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    gender: null,
    weight: "",
    height: "",
    targetedCarbs: "",
    targetedProtein: "",
    targetedFats: "",
    userUrl: "",
  });

  const [notification, setNotification] = useState({ message: "", type: "" });
  const [fileErrorMessage, setFileErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch {
      setNotification({ message: "Failed to load profile.", type: "error" });
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      try {
        const data = await uploadPhoto(file);
        setProfile((prev) => ({ ...prev, userUrl: data.userUrl }));
        setNotification({
          message: "Photo uploaded successfully!",
          type: "success",
        });
      } catch {
        setNotification({ message: "Failed to upload photo.", type: "error" });
      }
    } else {
      setFileErrorMessage("Only PNG or JPEG images are allowed.");
    }
    setSnackbarOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      setNotification({
        message: "Profile updated successfully!",
        type: "success",
      });
    } catch {
      setNotification({ message: "Failed to update profile.", type: "error" });
    }
    setSnackbarOpen(true);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({
        message: "New password and confirm password do not match.",
        type: "error",
      });
      setSnackbarOpen(true);
      return;
    }

    setPasswordLoading(true);
    try {
      await updateProfile({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setNotification({
        message: "Password updated successfully!",
        type: "success",
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Failed to update password.",
        type: "error",
      });
    } finally {
      setPasswordLoading(false);
      setSnackbarOpen(true);
    }
  };

  if (loading) return <CircularProgress className="m-auto" />;

  return (
    <>
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity={notification.type}
          onClose={() => setSnackbarOpen(false)}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileContainer;
