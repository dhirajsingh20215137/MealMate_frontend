import { Snackbar, Alert } from "@mui/material";

const Notification = ({ message, type, onClose }) => (
    <Snackbar open={!!message} autoHideDuration={3000} onClose={onClose}>
        <Alert severity={type} sx={{ width: "100%" }}>
            {message}
        </Alert>
    </Snackbar>
);

export default Notification;
