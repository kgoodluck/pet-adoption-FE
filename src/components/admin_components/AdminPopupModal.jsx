import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import UserDetails from './UserDetails';
import AddPetForm from './AddPetForm';
import "./AdminPopupModal.css";
import { addNewPetApi, editPetApi } from '../../api/petsApi';
import { usePetsContext } from '../../context/PetsContext';
import EditPetForm from './EditPetForm';

export default function AdminPopupModal(props) {

    const { user, mode, pet, updatePetState } = props;

    console.log(props);

    const {petsArray, setPetsArray} = usePetsContext();

    const [newPet, setNewPet] = useState({ type: 'Cat', hypoallergenic: true, adoptionStatus: 'Available' });
    const [updatedPet, setUpdatedPet] = useState(pet);

    const [addValidation, setAddValidation] = useState(false);
    const [editValidation, setEditValidation] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function addNewPet(pet) {
        const hypoallergenicBoolean = pet.hypoallergenic === 'true' || 1 ? true : false;
        const petObj = {...pet, age: +pet.age, height: +pet.height, weight: +pet.weight, hypoallergenic: hypoallergenicBoolean, picture: pet.picture || ''};
        const res = await addNewPetApi(petObj);
        const id = res.data[0];
        if (res.status === 200) {
            setPetsArray([...petsArray, {...pet, id: id, age: +pet.age, height: +pet.height, weight: +pet.weight, picture: pet.picture || ''}]);
            setNewPet({ type: 'Cat', hypoallergenic: true, adoptionStatus: 'Available' });
            setSuccessMessage('Pet was added!');
            setAddValidation(false);
        } else {
            setErrorMessage('Error adding pet');
        }
    }

    async function editPet(pet) {
        const hypoallergenicBoolean = pet.hypoallergenic === 'true' || 1 ? true : false;
        const petObj = {...pet, age: +pet.age, height: +pet.height, weight: +pet.weight, ownerId: pet.ownerId.toString(), hypoallergenic: hypoallergenicBoolean};
        const res = await editPetApi(petObj);
        if (res.status === 200) {
            const petToUpdate = petsArray.findIndex(p => p.id === pet.id);
            petsArray[petToUpdate] = petObj;
            console.log('new petsArray', petsArray);
            setPetsArray(petsArray);
            updatePetState(petObj);
            setSuccessMessage('Pet was updated!');
        } else {
            setErrorMessage('Error editing pet.');
        }
    }

    function handleAddPet(e) {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            addNewPet(newPet);
        }
        setAddValidation(true);
    }

    function handleEditPet(e) {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            editPet(updatedPet);
        }
        console.log(updatedPet);
        setEditValidation(true);
    }

    function handleFormChange() {
        setErrorMessage('');
        setSuccessMessage('');
    }

    const valuesForAddPet = {
        newPet, setNewPet,
        handleAddPet,
        addValidation,
        handleFormChange,
    }

    const valuesForEditPet = {
        updatedPet, setUpdatedPet,
        handleEditPet,
        editValidation,
        handleFormChange,
    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='text-center'>
            { mode === 'userDetails' && 'User details' }
            { mode === 'addPet' && 'Add new pet' }
            { mode === 'editPet' && 'Pet details' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            { mode === 'userDetails' && <UserDetails user={user} /> }
            { mode === 'addPet' && <AddPetForm {...valuesForAddPet} />}
            { mode === 'editPet' && <EditPetForm {...valuesForEditPet} />}
      </Modal.Body>
      <Modal.Footer>
            { errorMessage !== '' && <p className='text-danger'>{errorMessage}</p> }
            { successMessage !== '' && <p className='text-success'>{successMessage}</p> }
            <Button onClick={props.onHide}>Close</Button>
            { mode === 'addPet' && <Button type="submit" form="add-pet-form">Add</Button> }
            { mode === 'editPet' && <Button type="submit" form="add-pet-form" >Edit</Button> }
      </Modal.Footer>
    </Modal>
  )
}
