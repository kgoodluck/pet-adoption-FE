import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from 'react-bootstrap/Badge';

export default function PetCard({ pet }) {

    const { adoptionStatus, age, bio, breed, color, dietery, height, hypoallergnic, name, picture, type, weight } = pet;

    return (
        <Col>
        {/* <button className="pet-card"> */}
        <Card>
        <Badge bg={adoptionStatus === 'Available' ? 'success' : adoptionStatus === 'Fostered' ? 'danger' : 'primary'} className="adoption-status" >{adoptionStatus}</Badge>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
                <Card.Title>       
                    {name}, {age} year{age !== 1 ? 's' : ''}
                </Card.Title>
                <Card.Text className="h6">
                    {type}/{breed}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <p>height: {height}cm, weight: {weight}kg</p>
            </Card.Footer>
        </Card>
        {/* </button> */}
        </Col>
        
    );
}
