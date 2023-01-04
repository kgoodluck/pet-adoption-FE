import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form';

export default function PetBasicSearchForm({ uniqeTypesOfPets, petTypeSearch, setPetTypeSearch }) {

  // useEffect(() => {
  //   setPetTypeSearch(petTypeSearch)
  // })

  function handleSelectChange(e) {
    console.log('e.target.options[event.target.selectedIndex].text', e.target.options[e.target.selectedIndex].text);
    setPetTypeSearch(e.target.value);
  }

  return (
    <Form.Select defaultValue={petTypeSearch} aria-label="Select the pet type" onChange={(e) => handleSelectChange(e)} className="mb-3">
      <option value='All pets'>All the pets</option>
      {uniqeTypesOfPets.map((type, i) => (
        <option key={i} value={type}>{type}</option>
      ))}
    </Form.Select>
  )
}
