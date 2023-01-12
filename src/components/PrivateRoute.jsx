import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import ErrorPage from '../pages/ErrorPage';

export default function PrivateRoute({ mode, children }) {
    const { currentUser } = useAuthContext();
    
    if (!currentUser.id) {
        return <Navigate to="/" />
    }

    if (mode === "admin" && !currentUser.isAdmin) {
        return <ErrorPage errorCode="403" />
    }

    return children;
}
