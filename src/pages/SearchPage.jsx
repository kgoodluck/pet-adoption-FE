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
    const [displayedArray, setDisplayedArray] = useState(petsArray);
    const [isBasicSearch, setIsBasicSearch] = useState(true);
    const [searchingPetType, setSearchingPetType] = useState('All pets');

    console.log('SearchPage mount');

    function handleCheckBoxChange() {
        setIsBasicSearch(!isBasicSearch);
    }

    useEffect(() => {
        setDisplayedArray(petsArray)
    }, [])

    const typesOfPets = petsArray.map(item => item.type);
    const uniqeTypesOfPets = [...new Set(typesOfPets)]

    useEffect(() => {
        console.log('Inside useeffect');
        let petsToShow = petsArray.filter(item => item.type === searchingPetType);
        if (searchingPetType === 'All pets') { petsToShow = petsArray }
        setDisplayedArray(petsToShow)
    }, [searchingPetType])

  return (
    <div className='wrapper'>
        <div className='pet-search-form'>
            { isBasicSearch ? <PetBasicSearchForm types={uniqeTypesOfPets} setSearchingPetType={setSearchingPetType} /> : <PetAdvancedSearchForm /> }
            <Form.Check type="switch" id="custom-switch" label="Advanced search options" onChange={handleCheckBoxChange} />
        </div>
        <PetsGrid petsArray={displayedArray} />
    </div>
  )
}
