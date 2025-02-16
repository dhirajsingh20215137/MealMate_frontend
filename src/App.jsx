import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/";
import Navigation from "./navigation";


const App = () => (
  <AuthProvider>
    <Router>
      <Navigation />
    </Router>
  </AuthProvider>
);

export default App;
