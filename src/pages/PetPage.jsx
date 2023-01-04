import axios from 'axios';
import React, { useEffect } from 'react';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import RandomEmojis from '../lib/RandomEmojis';

export default function PetPage() {

  const baseUrl = 'http://localhost:8080/pets'

  const { petId } = useParams();
  const [petFromDb, setPetFromDb] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);

  const { adoptionStatus, age, bio, breed, color, dietery, height, hypoallergnic, name, picture, type, weight } = petFromDb;

  useEffect(() => {
    getPetFromDB();
  }, []);

  async function getPetFromDB() {
    try {
      const res = await axios.get(`${baseUrl}/${petId}`);
      setPetFromDb(res.data);
      setIsLoading(false);
    } catch(err) {
      console.log(err);
    }
  }

  

  console.log('id', petId);

  return (
    <>
    <div className='wrapper'>
        { !isLoading &&
        <Card className='pet-page-card'>
          <Badge bg={adoptionStatus === 'Available' ? 'success' : adoptionStatus === 'Fostered' ? 'danger' : 'primary'} className="adoption-status" >{adoptionStatus}</Badge>
          <Badge bg="warning" className="watch-list" >Add to whatchlist</Badge>
          <Row>
            <Card.Img xs={4} variant="top" src={picture} />
          </Row>
          <Card.Body>
            
              <Card.Title>       
              {name}, {age} year{age !== 1 ? 's' : ''}
              </Card.Title>
              
              <ListGroup variant="flush">
              <ListGroup.Item className='d-flex justify-content-between'>
                <span>Breed: {breed}</span>
                <span>Color: {color}</span>
                </ListGroup.Item>
              { dietery.length !== 0 && <ListGroup.Item>Dietery restrictions: {dietery}</ListGroup.Item> }
              { hypoallergnic && <ListGroup.Item>This pet is hypoallergnic!</ListGroup.Item> }
              { bio != 0 && <ListGroup.Item>{bio}</ListGroup.Item> }
              </ListGroup>

          </Card.Body>
          <Card.Footer className="text-muted">
              <p>height: {height}cm, weight: {weight}kg</p>
          </Card.Footer>
        </Card>    
      }
    </div> 
    <RandomEmojis emoji={type === 'Dog' ? '🐶' : type === 'Cat' ? '🐈' : '🐁'} amount={10} minFontSize={32} maxFontSize={72} />
  </>)
}
