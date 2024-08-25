import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="*" element={<Navigate to="/home" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
