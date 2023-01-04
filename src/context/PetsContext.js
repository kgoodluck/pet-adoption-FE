import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

export const PetsContext = createContext();

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {

    const baseUrl = 'http://localhost:8080/pets'

    console.log('1');

    const [petsArray, setPetsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      console.log('2');
    })

    async function getAllPetsFromDb() {
        try {
            const res = await axios.get(baseUrl);
            setPetsArray(res.data);
            console.log('res.data', res.data);
            console.log('petsArray', petsArray);
            setIsLoading(false)
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllPetsFromDb();
        console.log('2.5');
    }, [])

    const value = {
        petsArray,
    }

  return (
    <PetsContext.Provider value={ value } >
      { !isLoading && children}
    </PetsContext.Provider>
  );
}