import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { getOwnedPetsApi, getPetsAddedToWatchlistApi } from "../api/petsApi";
import { useAuthContext } from "./AuthContext";

export const PetsContext = createContext();

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {

    const { currentUser } = useAuthContext();

    const baseUrl = 'http://localhost:8080/pets'

    const [petsArray, setPetsArray] = useState([]);
    const [petsAddedToWatchlist, setPetsAddedToWatchlist] = useState([]);
    const [ownedPets, setOwnedPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    async function setPetsFromWatchlist() {
      const petsFromWatchlist = await getPetsAddedToWatchlistApi(currentUser.id);
      setPetsAddedToWatchlist(petsFromWatchlist);
    }

    async function getOwnedPets() {
      const res = await getOwnedPetsApi(currentUser.id);
      setOwnedPets(res.data);
      setIsLoading(false);
    }
 
    useEffect(() => {
      getAllPetsFromDb();
      setPetsFromWatchlist();
      getOwnedPets();
    }, [])

    useEffect(() => {
      setPetsFromWatchlist();
    }, [currentUser])

    useEffect(() => {
      console.log('11111');
    }, [petsArray])

    const value = {
        petsArray, setPetsArray,
        petsAddedToWatchlist, setPetsAddedToWatchlist,
        ownedPets, setOwnedPets,
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