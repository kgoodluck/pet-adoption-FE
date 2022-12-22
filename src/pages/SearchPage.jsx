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
    const [searchingPetAdoptStatus, setSearchingPetAdoptStatus] = useState('All');

    const typesOfPets = petsArray.map(item => item.type);
    const uniqeTypesOfPets = [...new Set(typesOfPets)]

    const adoptionStatuses = petsArray.map(item => item.adoptionStatus);
    const uniqeAdoptionStatuses = [...new Set(adoptionStatuses)].reverse();
    

    console.log('SearchPage mount');

    function handleSearchOptionChange() {
        setIsBasicSearch(!isBasicSearch);
    }

    useEffect(() => {
        setDisplayedArray(petsArray)
    }, [])

    useEffect(() => {
        let petsToShow = petsArray.filter(item => { 
            return ( 
                
            (searchingPetType !== 'All pets' ? item.type === searchingPetType : true ) &&
            ( searchingPetAdoptStatus !== 'All' ? item.adoptionStatus === searchingPetAdoptStatus : true )
        )});
            // return ( item.type === searchingPetType &&
            // ( searchingPetAdoptStatus !== 'All' ? item.adoptionStatus === searchingPetAdoptStatus : "" )
            // )});
        // if (searchingPetType === 'All pets') { petsToShow = petsArray }
        setDisplayedArray(petsToShow)
    }, [searchingPetType, searchingPetAdoptStatus])

    console.log('searchingPetAdoptStatus', searchingPetAdoptStatus);
    console.log('displayedArray.length', displayedArray.length);

  return (
    <div className='wrapper'>
        <div className='pet-search-form'>
            { isBasicSearch ? <PetBasicSearchForm types={uniqeTypesOfPets} searchingPetType={searchingPetType} setSearchingPetType={setSearchingPetType} /> : <PetAdvancedSearchForm types={uniqeTypesOfPets} searchingPetType={searchingPetType} setSearchingPetType={setSearchingPetType} adoptionStatuses={uniqeAdoptionStatuses} searchingPetAdoptStatus={searchingPetAdoptStatus} setSearchingPetAdoptStatus={setSearchingPetAdoptStatus} /> }
            <Form.Check reverse type="switch" id="custom-switch" label="Advanced search options" onChange={handleSearchOptionChange} />
        </div>
        <PetsGrid petsArray={displayedArray} />
        { displayedArray.length === 0 ? <p className='text-center text-light h2'>Try using less filters</p> : "" }
    </div>
  )
}
