import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

export const PetsContext = createContext();

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {

    const baseUrl = 'http://localhost:8080/pets'

    const [ petsArray, setPetsArray ] = useState([]);

    async function getAllPetsFromDb() {
        try {
            const res = await axios.get(baseUrl);
            setPetsArray(res.data);
            console.log('res.data', res.data);
            console.log('petsArray', petsArray);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllPetsFromDb();
    }, [])

    const value = {
        petsArray,
    }

  return (
    <PetsContext.Provider value={ value } >
      {children}
    </PetsContext.Provider>
  );
}