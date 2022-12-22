import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import ProfilePage from "./pages/ProfilePage";
import PetsContextProvider from "./context/PetsContext";
import SearchPage from "./pages/SearchPage";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <PetsContextProvider>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
                <Footer />
            </PetsContextProvider>
        </BrowserRouter>
    );
}

export default App;
