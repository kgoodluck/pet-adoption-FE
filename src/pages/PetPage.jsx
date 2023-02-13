import axios from 'axios';
import React, { useEffect } from 'react';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import RandomEmojis from '../lib/RandomEmojis';
import './PetPage.css';
import { useAuthContext } from '../context/AuthContext';
import { addPetToWatchlistApi, adoptPetApi, deletePetFromWatchlistApi, fosterPetApi, returnPetApi } from '../api/petsApi';
import IconBookmarkStar from '../components/icons/bookmark-star';
import IconBookmarkStarFill from '../components/icons/bookmark-star-fill';
import { usePetsContext } from '../context/PetsContext';

export default function PetPage() {

  const baseUrl = 'http://localhost:8080/pets'

  const { petId } = useParams();
  const [ petFromDb, setPetFromDb ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);
  const { currentUser } = useAuthContext();
  const { petsAddedToWatchlist, setPetsAddedToWatchlist, petsArray, setPetsArray } = usePetsContext();


  const { id, adoptionStatus, age, bio, breed, color, dietary, height, hypoallergnic, name, ownerId, picture, type, weight } = petFromDb;
  const [isPetOwner, setIsPetOwner] = useState(currentUser?.id && currentUser?.id === ownerId);
  const [adoptedByUser, setAdoptedByUser] = useState(isPetOwner && adoptionStatus === 'Adopted');
  const [fosteredByUser, setFosteredByUser] = useState(isPetOwner && adoptionStatus === 'Fostered');
  const [fosteredBySomeoneElse, setFosteredBySomeoneElse] = useState(!isPetOwner && adoptionStatus === 'Fostered');
  const [adoptedBySomeoneElse, setAdoptedBySomeoneElse] = useState(!isPetOwner && adoptionStatus === 'Adopted');

  useEffect(() => {
    getPetFromDB();
  }, []);

  async function getPetFromDB() {
    try {
      const res = await axios.get(`${baseUrl}/${petId}`);
      setPetFromDb(res.data);
      const { ownerId, adoptionStatus } = res.data;
      if (currentUser?.id === ownerId) {
        setIsPetOwner(true);
        setAdoptedByUser(adoptionStatus === 'Adopted');
        setFosteredByUser(adoptionStatus === 'Fostered');
      }
      if (currentUser?.id !== ownerId) {
        setIsPetOwner(false);
        setAdoptedBySomeoneElse(adoptionStatus === 'Adopted');
        setFosteredBySomeoneElse(adoptionStatus === 'Fostered');
      }
      setIsLoading(false);
    } catch(err) {
      console.log(err);
    }
  }

  function handleMouseMove(e) {
    document.querySelectorAll('.random-emoji').forEach(function(emoji) {
      const movingValue = emoji.getAttribute('data-moving-value');
      const x = (movingValue * e.clientX) / 150;
      const y = movingValue * e.clientY / 150;
      // const width = emoji.getBoundingClientRect().width;
      emoji.style.transform = `translateX(${x}px) translateY(${y}px)`;
    })
  }

  const renderTooltipFoster = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      { adoptionStatus === "Available" && "Take this pet for a short period of time to find out how you suite each other." }
      { fosteredByUser && "Return pet" }
    </Tooltip>
  )
  const renderTooltipAdopt = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      { adoptedBySomeoneElse && "Pet is adopted by someone else, but you can still add it to the watchlist in case something goes wrong." }
      { fosteredBySomeoneElse && "Pet is fostered by someone else, but you can still add it to the watchlist in case it gets returned to us!" }
      { adoptionStatus === "Available" && <span>Take this pet to your family <strong>forever</strong>!</span> }  
      { fosteredByUser && "Take the pet for a full adoption" }
      { adoptedByUser && "Return pet" }
    </Tooltip>
  )

  async function handleAdoptClick() {
    const res = await adoptPetApi(currentUser.id, petId);
    if (res.status === 200) {
      setPetFromDb({...petFromDb, adoptionStatus: 'Adopted', ownerId: currentUser.id });
      setAdoptedBySomeoneElse(false);
      setIsPetOwner(true);
      setAdoptedByUser(true);
    }
  }

  async function handleFosterClick() {
    const res = await fosterPetApi(currentUser.id, petId);
    if (res.status === 200) {
      setPetFromDb({...petFromDb, adoptionStatus: 'Fostered', ownerId: currentUser.id });
      setAdoptedBySomeoneElse(false);
      setIsPetOwner(true);
      setFosteredByUser(true);
    }
  }

  async function handleReturnClick() {
    const res = await returnPetApi(currentUser.id, petId);
    if (res.status === 200) {
      setPetFromDb({...petFromDb, adoptionStatus: 'Available', ownerId: null });
      setFosteredByUser(false);
      setAdoptedByUser(false);
    }
  }

  useEffect(() => {
    const petToUpdate = petsArray.findIndex(p => p.id === id);
    console.log('petToUpdate', petsArray[petToUpdate]);
    petsArray[petToUpdate] = petFromDb;
    console.log('petToUpdate2', petsArray[petToUpdate]);
    const newPetsArray = [...petsArray];
    setPetsArray(newPetsArray);
  }, [petFromDb])

  async function handleBookmarkButtonClick() {
    try {
        if(petsAddedToWatchlist.some(pet => pet === id)) {
            const res = await deletePetFromWatchlistApi(currentUser.id, id);
            res.status === 200 && setPetsAddedToWatchlist([...petsAddedToWatchlist.filter(pet => pet !== id)]);
        } else {
            const res = await addPetToWatchlistApi(currentUser.id, id);
            res.status === 200 && setPetsAddedToWatchlist([...petsAddedToWatchlist, id]);
        } 

    } catch (err) {
        console.log(err);
    }
}

  return (
    <div className='wrapper' onMouseMove={(e)=> handleMouseMove(e)}>
        { !isLoading &&
        <>
        <Card className='pet-page-card'>
          <Badge bg={adoptionStatus === 'Available' ? 'success' : adoptionStatus === 'Fostered' ? 'danger' : 'primary'} className="adoption-status" >{adoptionStatus}</Badge>
          {/* <Badge bg="warning" className="watch-list" >Add to whatchlist // {`${isPetOwner} ${adoptedByUser} ${adoptionStatus} ${ownerId} ${currentUser.id}`}</Badge> */}
            { currentUser.id &&
                <button className="bookmark-button" onClick={handleBookmarkButtonClick}>
                    { !petsAddedToWatchlist.some(petId => petId === id) && <IconBookmarkStar className="bookmark-icon" title="Add to watchlist" /> }
                    { petsAddedToWatchlist.some(petId => petId === id) && <IconBookmarkStarFill className="bookmark-icon" title="Remove from watchlist" /> }
                </button>
            }
          <Row>
            
            <Card.Img xs={4} variant="top" src={picture} />
          </Row>
          <Card.Body>

          { currentUser.id &&
          <ButtonGroup vertical className='foster-adopt-buttons'>

              { (adoptionStatus === 'Available' || adoptionStatus === 'Fostered' && isPetOwner) &&
                  <OverlayTrigger placement="right" delay={{ show: 150, hide: 200 }} overlay={renderTooltipFoster()}>
                    <span className="d-inline-block">
                      <Button variant="danger" className='foster-button' onClick={fosteredByUser ? handleReturnClick : handleFosterClick}>{ fosteredByUser ? "Return" : "Foster" }</Button>
                    </span>
                  </OverlayTrigger>
              }


          <OverlayTrigger placement="right" delay={{ show: 150, hide: 200 }} overlay={renderTooltipAdopt()} >
            <span className="d-inline-block">
              <Button variant="primary" className='adopt-button' onClick={adoptedByUser ? handleReturnClick : handleAdoptClick} disabled={adoptedBySomeoneElse || fosteredBySomeoneElse}>{ adoptedByUser ? "Return" : "Adopt" }</Button>
            </span>
          </OverlayTrigger>

          </ButtonGroup>
          }
            
              <Card.Title>       
              {name}, {age} year{age !== 1 ? 's' : ''}
              </Card.Title>
              
              <ListGroup variant="flush">
              <ListGroup.Item className='d-flex justify-content-between'>
                <span>Breed: {breed}</span>
                <span>Color: {color}</span>
                </ListGroup.Item>
                {console.log('dietary', dietary)}
              <ListGroup.Item>Dietary restrictions: {JSON.parse(dietary)?.length !== 0 ? JSON.parse(dietary)+'.' : 'none.'}</ListGroup.Item>
              { hypoallergnic && <ListGroup.Item>This pet is hypoallergnic!</ListGroup.Item> }
              { bio != 0 && <ListGroup.Item>{bio}</ListGroup.Item> }
              </ListGroup>

          </Card.Body>
          <Card.Footer className="text-muted">
              <p>height: {height}cm, weight: {weight}kg</p>
          </Card.Footer>
        </Card>    
        <RandomEmojis emoji={type === 'Dog' ? '🐶' : type === 'Cat' ? '🐈' : '🐁'} amount={15} minFontSize={32} maxFontSize={132} />
        </>
      }
    </div> 
  )
}
