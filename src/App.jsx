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
import ErrorPage from "./pages/ErrorPage";
import MyPets from "./pages/MyPets";
import PrivateRoute from "./components/PrivateRoute";
import AdminPage from "./pages/AdminPage";

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <PetsContextProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/pets/:petId" element={<PetPage />} />
                        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                        <Route path="/my-pets" element={<PrivateRoute><MyPets /></PrivateRoute>} />
                        <Route path="/admin" element={<PrivateRoute mode="admin"><AdminPage /></PrivateRoute>} />
                        <Route path="*" element={<ErrorPage errorCode="404" />} />
                    </Routes>
                    <Footer />
                </PetsContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
