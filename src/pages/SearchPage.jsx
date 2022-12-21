import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PetsGrid from '../components/PetsGrid';
import { PetsContext, usePetsContext } from '../context/PetsContext';
import Form from 'react-bootstrap/Form';
import PetBasicSearchForm from '../components/PetBasicSearchForm';
import PetAdvancedSearchForm from '../components/PetAdvancedSearchForm';


export default function SearchPage() {

    const { petsArray } = usePetsContext();
    const [isBasicSearch, setIsBasicSearch] = useState(true);

    function handleCheckBoxChange() {
        setIsBasicSearch(!isBasicSearch);
    }

  return (
    <div className='wrapper'>
        { isBasicSearch ? <PetBasicSearchForm /> : <PetAdvancedSearchForm /> }
        <Form.Check type="switch" id="custom-switch" label="Advanced search options" onChange={handleCheckBoxChange} />
        <PetsGrid petsArray={petsArray} />
    </div>
  )
}
