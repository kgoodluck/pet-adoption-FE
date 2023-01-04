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

    async function getUserFromDb() {
        try {
            // const res = await axios.get(baseUrl);
            // setPetsArray(res.data);
            // console.log('res.data', res.data);
            // console.log('petsArray', petsArray);
            setIsLoading(false)
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUserFromDb();
    }, [])

    const value = {
        currentUser,
        setCurrentUser
    }

  return (
    <AuthContext.Provider value={value} >
      { !isLoading && children}
    </AuthContext.Provider>
  );
}