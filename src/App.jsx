import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import ProfilePage from "./pages/ProfilePage";
import AuthContextProvider from "./context/AuthContext";
import PetsContextProvider from "./context/PetsContext";
import SearchPage from "./pages/SearchPage";
import Footer from "./components/Footer";
import PetPage from "./pages/PetPage";
import NotFound from "./pages/NotFound";
import MyPets from "./pages/MyPets";

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <PetsContextProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/my-pets" element={<MyPets />} />
                        <Route path="/pets/:petId" element={<PetPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </PetsContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
