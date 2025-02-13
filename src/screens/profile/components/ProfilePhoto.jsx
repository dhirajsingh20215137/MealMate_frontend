const HOST = "http://localhost:8081";
const ProfilePhoto = ({ userUrl, onPhotoChange, fileErrorMessage }) => (
    <div className="flex flex-col items-center">
        <img
            src={`${HOST}/${userUrl}` || "/MealMate.png"}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-2 border-gray-300"
        />
        <input type="file" accept="image/png, image/jpeg" onChange={onPhotoChange} className="mt-4" />
        {fileErrorMessage && <p className="text-red-500 text-sm mt-1">{fileErrorMessage}</p>}
    </div>
);

export default ProfilePhoto;
