import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from 'react-bootstrap/Badge';

export default function PetCard({ pet }) {

    const { adoptionStatus, age, bio, breed, color, dietery, height, hypoallergnic, name, picture, type, weight } = pet;

    return (
        <Col>
        <Card>
        <Badge bg={adoptionStatus === 'Available' ? 'success' : 'primary'} className="adoption-status" >{adoptionStatus}</Badge>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
                <Card.Title>
                    
                    {name}, {age} year{age !== 1 ? 's' : ''}
                </Card.Title>
                <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                </Card.Text>
            </Card.Body>
        </Card>
        </Col>
    );
}
