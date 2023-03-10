import React from "react";
import Row from "react-bootstrap/Row";
import PetCard from "./PetCard";

export default function PetsGrid({ petsArray }) {
    return (
        <Row xs={1} md={2} xl={3} className="pets-grid g-4" >
            {console.log('petsArray', petsArray)}
                {petsArray && petsArray.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                ))}
           
        </Row>
    );
}
