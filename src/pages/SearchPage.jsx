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

    const [petTypeSearch, setPetTypeSearch] = useState('All pets');
    const [petAdoptStatusSearch, setPetAdoptStatusSearch] = useState('All');
    const [petAgeSearch, setPetAgeSearch] = useState({ min: '', max: '' });
    const [petHeightSearch, setPetHeightSearch] = useState({ min: '', max: '' });
    const [petWeightSearch, setPetWeightSearch] = useState({ min: '', max: '' });
    const [petNameSearch, setPetNameSearch] = useState('');


    const typesOfPets = petsArray.map(item => item.type);
    const uniqeTypesOfPets = [...new Set(typesOfPets)]

    const adoptionStatuses = petsArray.map(item => item.adoptionStatus);
    const uniqeAdoptionStatuses = [...new Set(adoptionStatuses)].reverse();

    function handleSearchOptionChange() {
        console.log('here');
        setIsBasicSearch(!isBasicSearch);
        setPetTypeSearch(petTypeSearch);
        setPetAdoptStatusSearch('All');
        setPetAgeSearch({ min: '', max: '' });
        setPetHeightSearch({ min: '', max: '' });
        setPetWeightSearch({ min: '', max: '' });
        setPetNameSearch('');
    }

    useEffect(() => {
        setDisplayedArray(petsArray)
    }, [])

    useEffect(() => {
        let petsToShow = petsArray.filter(item => { 
            return ( 
            ( petTypeSearch !== 'All pets' ? item.type === petTypeSearch : true ) &&
            ( petAdoptStatusSearch !== 'All' ? item.adoptionStatus === petAdoptStatusSearch : true ) &&
            ( petAgeSearch.min ? item.age >= +petAgeSearch.min : true ) &&
            ( petAgeSearch.max ? item.age <= +petAgeSearch.max : true ) &&
            ( petHeightSearch.min ? item.height >= +petHeightSearch.min : true ) &&
            ( petHeightSearch.max ? item.height <= +petHeightSearch.max : true ) &&
            ( petWeightSearch.min ? item.weight >= +petWeightSearch.min : true ) &&
            ( petWeightSearch.max ? item.weight <= +petWeightSearch.max : true ) &&
            ( petNameSearch ? item.name.toLowerCase().includes(petNameSearch) : true )
        )});
        setDisplayedArray(petsToShow)
    }, [petTypeSearch, petAdoptStatusSearch, petAgeSearch, petHeightSearch, petWeightSearch, petNameSearch ])



    const propsForBasicSearch = {    
        uniqeTypesOfPets,
        petTypeSearch,
        setPetTypeSearch
    }

    const propsForAdvancedSearch = {   
        uniqeTypesOfPets, 
        uniqeAdoptionStatuses,
        petTypeSearch,
        setPetTypeSearch,
        petAdoptStatusSearch,
        setPetAdoptStatusSearch,
        petAgeSearch, 
        setPetAgeSearch,
        petHeightSearch,
        setPetHeightSearch,
        petWeightSearch,
        setPetWeightSearch,
        petNameSearch,
        setPetNameSearch
    }

  return (
    <div className='wrapper'>
        <div className='pet-search-form'>
            { isBasicSearch ? <PetBasicSearchForm {...propsForBasicSearch} /> : <PetAdvancedSearchForm {...propsForAdvancedSearch} /> }
            <Form.Check reverse type="switch" id="custom-switch" label="Advanced search options" onChange={handleSearchOptionChange} />
        </div>
        <PetsGrid petsArray={displayedArray} />
        { displayedArray.length === 0 ? <p className='text-center text-light h2'>Try using less filters</p> : "" }
    </div>
  )
}
