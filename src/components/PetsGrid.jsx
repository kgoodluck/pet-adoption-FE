import React from "react";
import Row from "react-bootstrap/Row";
import PetCard from "./PetCard";

export default function PetsGrid({ petsArray }) {
    return (
        <Row xs={1} md={2} className="g-4">
           
                {petsArray.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                ))}
           
        </Row>
    );
}
