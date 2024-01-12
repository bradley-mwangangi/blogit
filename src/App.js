import './global.css'
import {Navigate, Route, Routes} from "react-router-dom";
import TopNavbar from "./components/top-navbar/TopNavbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import UserProfile from "./pages/user-profile/UserProfile";
import SingleArticle from "./pages/article/SingleArticle";
import Editor2 from "./pages/write/Editor-2";
import Editor3 from "./pages/write/Editor3";
import {isLoggedIn} from "./service/authService";

function App() {

    let isUserLoggedIn = isLoggedIn();

    return (
      <>
        <TopNavbar/>
        <Routes>
            <Route path="/"
                   element={!isUserLoggedIn ? <Navigate to="/login" replace /> : <Home />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/article/:articleId" element={<SingleArticle />} />
            {/*<Route path="/write" element={<Editor />} />*/}
            <Route path="/write" element={<Editor2 />} />
            <Route path="/editor3" element={<Editor3 />} />
        </Routes>
      </>
    );
}

export default App;
