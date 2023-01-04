import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {

    const baseUrl = 'http://localhost:8080/users'

    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    async function checkIfUserIsLoggedIn() {
        try {
            const res = await axios.get(`${baseUrl}/login`, {withCredentials: true});
            setCurrentUser({ id: res.data.id, name: res.data.name });
            console.log('res', res);
            setIsLoading(false)
        } catch(err) {
            setIsLoading(false);
        }
        console.log('currentUser', currentUser);
    }

    console.log('safaf');
    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, [])

    const value = {
        currentUser,
        setCurrentUser
    }

  return (
    <AuthContext.Provider value={value} >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}