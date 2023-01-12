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

    const { petsAddedToWatchlist } = usePetsContext();
    const [petsFromWatchlist, setPetsFromWatchlist] = useState([]);

    async function getPetsFromWatchlist(arrayOfIds) {
        const res = await getMultiplePetsByIdsApi(arrayOfIds);
        setPetsFromWatchlist(res.data);
        setIsLoading(false);
    }

    useEffect(() => {
        console.log('MyPets useEff');
        getPetsFromWatchlist(petsAddedToWatchlist);
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
                    { !isLoading && <PetsGrid petsArray={petsFromWatchlist} />}
                </Tab>
                <Tab eventKey="adopted" title="Adopted">
                    {/* <Sonnet /> */}
                </Tab>
                <Tab eventKey="fostered" title="Fostered" disabled>
                    {/* <Sonnet /> */}
                </Tab>
            </Tabs>
        </div>
    );
}
