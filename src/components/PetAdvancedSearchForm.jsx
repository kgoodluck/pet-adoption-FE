import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';

function PetAdvancedSearchForm({types, searchingPetType, setSearchingPetType, adoptionStatuses, searchingPetAdoptStatus, setSearchingPetAdoptStatus }) {

  console.log('types', types);

  function handleSelectTypeChange(e) {
    setSearchingPetType(e.target.value);
  }

  function handleSelectAdoptionStatusChange(e) {
    setSearchingPetAdoptStatus(e.target.value)
  }

  return (
    <Form>
      <Row className="mb-3">
        {console.log('types', types)}
        <Form.Group as={Col} controlId="formGridPetType">
          <Form.Label>Pet type</Form.Label>
          <Form.Select defaultValue={searchingPetType} onChange={(e) => handleSelectTypeChange(e)}>
            <option value='All pets'>All the pets</option>
            {types.map((type, i) => (
            <option key={i} value={type}>{type}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAdoptionStatus">
          <Form.Label>Adoption status</Form.Label>
          <Form.Select defaultValue={searchingPetAdoptStatus} onChange={(e) => handleSelectAdoptionStatusChange(e)}>
            <option value='All'>Any</option>
            {adoptionStatuses.map((status, i) => (
            <option key={i} value={status}>{status}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
      <InputGroup as={Col} id="formGridAdoptionStatus">
        <Form.Label className="input-group-label">Age</Form.Label>
        <InputGroup.Text>min</InputGroup.Text>
        <Form.Control aria-label="min age" />
        <InputGroup.Text>max</InputGroup.Text>
        <Form.Control aria-label="max age" />
      </InputGroup>

      <InputGroup as={Col} id="formGridAdoptionStatus">
      <Form.Label className="input-group-label">Height</Form.Label>
        <InputGroup.Text>min</InputGroup.Text>
        <Form.Control aria-label="min age" />
        <InputGroup.Text>max</InputGroup.Text>
        <Form.Control aria-label="max age" />
      </InputGroup>

      <InputGroup as={Col} id="formGridAdoptionStatus">
        <Form.Label className="input-group-label">Weight</Form.Label>
        <InputGroup.Text>min</InputGroup.Text>
        <Form.Control aria-label="min age" />
        <InputGroup.Text>max</InputGroup.Text>
        <Form.Control aria-label="max age" />
      </InputGroup>
      </Row>

      <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="" />
      </Form.Group>

      {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button> */}
    </Form>
  );
}

export default PetAdvancedSearchForm;