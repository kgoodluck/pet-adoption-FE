import React from 'react'
import Form from 'react-bootstrap/Form';

export default function PetBasicSearchForm({types, setSearchingPetType}) {

  function handleSelectChange(e) {
    setSearchingPetType(e.target.value);
  }

  return (
    <Form.Select aria-label="Select the pet type" onChange={(e) => handleSelectChange(e)}>
      <option value='All pets'>All the pets</option>
      {types.map((type, i) => (
        <option key={i} value={type}>{type}</option>
      ))}
    </Form.Select>
  )
}
