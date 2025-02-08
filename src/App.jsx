import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/signup/signup.jsx';
import { Login } from "./components/login/login.jsx";
import { ProfilePage } from "./components/profilePage/profilePage.jsx";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Login />} />
                   
                    <Route path="/profilePage/:userId" element={<ProfilePageWrapper />} />
                </Routes>
            </Router>
        </div>
    );
}


import { useParams } from 'react-router-dom';

const ProfilePageWrapper = () => {
    const { userId } = useParams(); 
    return <ProfilePage userId={parseInt(userId, 10)} />; 
};

export default App;
