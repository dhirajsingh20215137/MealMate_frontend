import axios from "axios";
import { useAuth } from "../../auth/index";
import { HOST } from "../../utils/Constant";

export const useProfileApi = () => {
    const { token, user } = useAuth();
    const userId = user?.userId;

    const getProfile = async () => {
      
        const response = await axios.get(`${HOST}/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

       
        return response.data;
    };

    const updateProfile = async (profileData) => {
        return await axios.post(`${HOST}/user/${userId}`, profileData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    };


    const uploadPhoto = async (file) => {
        const formData = new FormData();
        formData.append("profilePhoto", file);

        const response = await axios.post(`${HOST}/user/${userId}/photo/upload-photo`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    };

    return { getProfile, updateProfile,  uploadPhoto };
};
