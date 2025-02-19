import { apiRequest } from "../../utils/Api";
import { useAuth } from "../../auth/index";

export const useProfileApi = () => {
  const { user } = useAuth();
  const userId = user?.userId;

  const getProfile = async () => {
    return await apiRequest({ url: `/user/${userId}`, method: "GET" });
  };

  const updateProfile = async (profileData) => {
    return await apiRequest({
      url: `/user/${userId}`,
      method: "POST",
      data: profileData,
    });
  };

  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("profilePhoto", file);

    return await apiRequest({
      url: `/user/${userId}/photo/upload-photo`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return { getProfile, updateProfile, uploadPhoto };
};
