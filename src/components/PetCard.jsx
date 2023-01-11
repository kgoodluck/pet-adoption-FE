import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from 'react-bootstrap/Badge';
import IconBookmarkStar from "./icons/bookmark-star";
import IconBookmarkStarFill from "./icons/bookmark-star-fill";
import "./icons/icons.css";
import { usePetsContext } from "../context/PetsContext";
import { addPetToWatchlistApi, deletePetFromWatchlistApi } from "../api/petsApi";
import { useAuthContext } from "../context/AuthContext";

export default function PetCard({ pet }) {

    const { id, adoptionStatus, age, bio, breed, color, dietery, height, hypoallergnic, name, picture, type, weight } = pet;
    const { currentUser } = useAuthContext();

    const { petsAddedToWatchlist, setPetsAddedToWatchlist } = usePetsContext();

    async function handleBookmarkButtonClick() {
        try {
            if(petsAddedToWatchlist.some(pet => pet === id)) {
                const res = await deletePetFromWatchlistApi(currentUser.id, id);
                console.log('res', res);
                res.status === 200 && setPetsAddedToWatchlist([...petsAddedToWatchlist.filter(pet => pet !== id)]);
            } else {
                const res = await addPetToWatchlistApi(currentUser.id, id);
                console.log('res', res);
                res.status === 200 && setPetsAddedToWatchlist([...petsAddedToWatchlist, id]);
            } 

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Col>
        <Card>
            <div className="d-flex justify-content-between">
                <Badge bg={adoptionStatus === 'Available' ? 'success' : adoptionStatus === 'Fostered' ? 'danger' : 'primary'} className="adoption-status" >{adoptionStatus}</Badge>
                { currentUser.id &&
                <button className="bookmark-button" onClick={handleBookmarkButtonClick}>
                    { !petsAddedToWatchlist.some(petId => petId === id) && <IconBookmarkStar className="bookmark-icon" /> }
                    { petsAddedToWatchlist.some(petId => petId === id) && <IconBookmarkStarFill className="bookmark-icon" /> }
                </button>
                }
            </div>
            <Card.Img variant="top" src={picture} />
            {/* <a href={`./pets/${id}`}><Card.Img variant="top" src={picture} /></a> */}
            <Card.Body>
                <Card.Title>       
                    <a href={`./pets/${id}`}>{name}, {age} year{age !== 1 ? 's' : ''}</a>
                </Card.Title>
                <Card.Text className="h6">
                    {type}/{breed}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <p>height: {height}cm, weight: {weight}kg</p>
            </Card.Footer>
        </Card>
        </Col>
        
    );
}
