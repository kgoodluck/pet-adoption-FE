import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form';

export default function PetBasicSearchForm({types, searchingPetType, setSearchingPetType, }) {

  // useEffect(() => {
  //   setSearchingPetType(searchingPetType)
  // })

  console.log('Basic f mount');
  console.log('types', types);

  function handleSelectChange(e) {
    console.log('e.target.options[event.target.selectedIndex].text', e.target.options[e.target.selectedIndex].text);
    setSearchingPetType(e.target.value);
  }

  return (
    <Form.Select aria-label="Select the pet type" onChange={(e) => handleSelectChange(e)} className="mb-3">
      <option value='All pets'>All the pets</option>
      {types.map((type, i) => (
        <option key={i} value={type}>{type}</option>
      ))}
    </Form.Select>
  )
}
