import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/";         
import AppRoutes from "./navigation";
import Navbar from "./shared/components/Navbar";

const App = () => (
    <AuthProvider>
        <Router>
            <Navbar />
            <div className="pt-16"> 
                <AppRoutes />
            </div>
        </Router>
    </AuthProvider>
);

export default App;
