import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

export const PetsContext = createContext();

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {

    const baseUrl = 'http://localhost:8080/pets'

    const [petsArray, setPetsArray] = useState([]);
    const [petsAddedToWatchlist, setPetsAddedToWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    async function getPetsAddedToWatchlist(userId) {
      try {
          const res = await axios.get(`${baseUrl}/added-to-watchlist/${userId}`);
          setPetsAddedToWatchlist(res.data);
          return res;
      } catch(err) {
          console.log(err);
      }
    };
 
    useEffect(() => {
        getAllPetsFromDb();
    }, [])

    const value = {
        petsArray,
        petsAddedToWatchlist,
        setPetsAddedToWatchlist,
    }

    useEffect(() => {
      console.log('petsAddedToWatchlist', petsAddedToWatchlist);
    }, [petsAddedToWatchlist])

  return (
    <PetsContext.Provider value={ value } >
      { !isLoading && children}
    </PetsContext.Provider>
  );
}