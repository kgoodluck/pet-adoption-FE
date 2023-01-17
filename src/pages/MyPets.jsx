import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { getMultiplePetsByIdsApi } from "../api/petsApi";
import PetsGrid from "../components/PetsGrid";
import { usePetsContext } from "../context/PetsContext";
import "./MyPets.css";

export default function MyPets() {
    const [key, setKey] = useState("watchlist");
    const [isLoading, setIsLoading] = useState(true);

    const { petsAddedToWatchlist, ownedPets } = usePetsContext();
    const [petsFromWatchlist, setPetsFromWatchlist] = useState([]);
    const [adoptedPets, setAdoptedPets] = useState([]);
    const [fosteredPets, setFosteredPets] = useState([]);

    useEffect(() => {
        console.log('insideUseEffect');
        setAdoptedPets(ownedPets.filter(pet => pet.adoptionStatus === 'Adopted'));
        setFosteredPets(ownedPets.filter(pet => pet.adoptionStatus === 'Fostered'));
        setIsLoading(false);
    }, [ownedPets])

    async function getPetsFromWatchlist(arrayOfIds) {
        const res = await getMultiplePetsByIdsApi(arrayOfIds);
        setPetsFromWatchlist(res.data);
        // setIsLoading(false);
    }

    useEffect(() => {
        console.log('MyPets useEff');
        getPetsFromWatchlist(petsAddedToWatchlist);
        console.log('ownedPets', ownedPets);
    }, [petsAddedToWatchlist])



    return (
        <div className="wrapper">
            <Tabs
                id="tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className=""
            >
                <Tab eventKey="watchlist" title="Watchlist">
                    { !isLoading && petsAddedToWatchlist.length !== 0 && <PetsGrid petsArray={petsFromWatchlist} />}
                    { !isLoading && petsAddedToWatchlist.length === 0 && <h4 className="text-center">Your watchlist is empty.</h4> }
                </Tab>
                <Tab eventKey="adopted" title="Adopted">
                    { !isLoading && adoptedPets?.length !== 0 && <PetsGrid petsArray={adoptedPets} />}
                    { !isLoading && adoptedPets?.length === 0 && <h4 className="text-center">You haven't adopted any pets yet.</h4> }
                </Tab>
                <Tab eventKey="fostered" title="Fostered" disabled={fosteredPets?.length === 0}>
                    { !isLoading && fosteredPets?.length !== 0 && <PetsGrid petsArray={fosteredPets} />}
                    { !isLoading && fosteredPets?.length === 0 && <h4 className="text-center">You are not fostering any pet now.</h4> }
                </Tab>
            </Tabs>
        </div>
    );
}
