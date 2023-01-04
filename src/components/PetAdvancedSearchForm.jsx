import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import InfirmationOnHover from './InfirmationOnHover';

function PetAdvancedSearchForm({uniqeTypesOfPets, petTypeSearch, setPetTypeSearch, uniqeAdoptionStatuses, petAdoptStatusSearch, setPetAdoptStatusSearch, petAgeSearch, setPetAgeSearch, petHeightSearch, setPetHeightSearch, petWeightSearch, setPetWeightSearch, petNameSearch, setPetNameSearch }) {

  const [ isMinGreaterThenMax, setIsMinGreaterThenMax ] = useState(false);

  function handleSelectTypeChange(e) {
    setPetTypeSearch(e.target.value);
  }

  function handleSelectAdoptionStatusChange(e) {
    setPetAdoptStatusSearch(e.target.value)
  }

  function handleAgeChange(e) {
    checkIfEventIsANumber(e);
    setPetAgeSearch(prev => ({...prev, [e.target.id === 'ageMin' ? 'min' : 'max']: e.target.value}));
  }

  function handleHeightChange(e) {
    checkIfEventIsANumber(e);
    setPetHeightSearch(prev => ({...prev, [e.target.id === 'heightMin' ? 'min' : 'max']: e.target.value}));
  }

  function handleWeightChange(e) {
    checkIfEventIsANumber(e);
    setPetWeightSearch(prev => ({...prev, [e.target.id === 'weightMin' ? 'min' : 'max']: e.target.value}));
  } 

  function handleNameChange(e) {
    setPetNameSearch(e.target.value.toLowerCase());
  } 

  function checkIfEventIsANumber(e) {
    if (e.target.value != parseInt(e.target.value)) { 
      e.target.value = e.target.value.substring(0, e.target.value.length-1) 
    }
  }

  useEffect(function checkMinAndMax() {
    const badMinMaxAge = petAgeSearch.min && petAgeSearch.max && +petAgeSearch.min > +petAgeSearch.max;
    const badMinMaxHeight = petHeightSearch.min && petHeightSearch.max && +petHeightSearch.min > +petHeightSearch.max
    const badMinMaxWeight = petWeightSearch.min && petWeightSearch.max && +petWeightSearch.min > +petWeightSearch.max

    if (badMinMaxAge || badMinMaxHeight || badMinMaxWeight) {
      setIsMinGreaterThenMax(true)
    }
    if (!badMinMaxAge && !badMinMaxHeight && !badMinMaxWeight) {
      setIsMinGreaterThenMax(false)
    }
  }, [petAgeSearch, petHeightSearch, petWeightSearch])

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPetType">
          <Form.Label>Pet type</Form.Label>
          <Form.Select defaultValue={petTypeSearch} onChange={(e) => handleSelectTypeChange(e)}>
            <option value='All pets'>All the pets</option>
            {uniqeTypesOfPets.map((type, i) => (
            <option key={i} value={type}>{type}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAdoptionStatus">
          <Form.Label>Adoption status</Form.Label>
          <InfirmationOnHover placement={'right'} cover={'i'} text={'Fostered means that a pet has a temporary home for now'} />
          <Form.Select defaultValue={petAdoptStatusSearch} onChange={(e) => handleSelectAdoptionStatusChange(e)}>
            <option value='All'>Any</option>
            {uniqeAdoptionStatuses.map((status, i) => (
            <option key={i} value={status}>{status}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
      <InputGroup as={Col} id="formGridAdoptionStatus">
        <Form.Label className="input-group-label">Age</Form.Label>
        <InputGroup.Text>min</InputGroup.Text>
        <Form.Control id="ageMin" aria-label="min age" onChange={(e) => handleAgeChange(e)} />
        <InputGroup.Text>max</InputGroup.Text>
        <Form.Control id="ageMax" aria-label="max age" onChange={(e) => handleAgeChange(e)} />
      </InputGroup>

      <InputGroup as={Col} id="formGridAdoptionStatus">
      <Form.Label className="input-group-label">Height</Form.Label>
        <InputGroup.Text>min</InputGroup.Text>
        <Form.Control id="heightMin" aria-label="min height" onChange={(e) => handleHeightChange(e)} />
        <InputGroup.Text>max</InputGroup.Text>
        <Form.Control id="heightMax" aria-label="max height" onChange={(e) => handleHeightChange(e)} />
      </InputGroup>

      <InputGroup as={Col} id="formGridAdoptionStatus">
        <Form.Label className="input-group-label">Weight</Form.Label>
        <InputGroup.Text>min</InputGroup.Text>
        <Form.Control id="weightMin" aria-label="min weight" onChange={(e) => handleWeightChange(e)} />
        <InputGroup.Text>max</InputGroup.Text>
        <Form.Control id="weightMax" aria-label="max weight" onChange={(e) => handleWeightChange(e)} />
      </InputGroup>
      </Row>

      { isMinGreaterThenMax && <p className='text-center text-danger h6'>min should be less than max</p> }

      <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="" onChange={(e) => handleNameChange(e)} />
      </Form.Group>
    </Form>
  );
}

export default PetAdvancedSearchForm;