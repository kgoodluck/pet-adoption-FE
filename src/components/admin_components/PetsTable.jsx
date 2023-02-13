import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PetRow from './PetRow';

export default function PetsTable({petsList}) {

    const [petsToDisplay, setPetsToDisplay] = useState(petsList);
    const [searchParams, setSearchParams] = useState({id: undefined, name: '', owner: '', status: ''});

    useEffect(() => {
        const newArray = petsList.filter(pet => {
            return (
                ( searchParams.id ? pet.id.toString().includes(searchParams.id) : true ) &&
                ( searchParams.name ? pet.name.toLocaleLowerCase().includes(searchParams.name.toLocaleLowerCase()) : true ) &&
                ( searchParams.owner && pet.ownerId !== '' ? pet.ownerId && pet.ownerId.toString().includes(searchParams.owner) : true ) &&
                ( searchParams.status ? pet.adoptionStatus.toLocaleLowerCase().includes(searchParams.status.toLocaleLowerCase()) : true )
            )});
        setPetsToDisplay(newArray);
    }, [searchParams, petsList])

  return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th className="col-1">
                    <FloatingLabel controlId="id" label="#">
                        <Form.Control type="number" value={searchParams.id || ''} onChange={(e) => setSearchParams({...searchParams, id: e.target.value})} placeholder='#' />
                    </FloatingLabel>
                </th>
                <th className="col-2">
                    <FloatingLabel controlId="pet-name" label="Name">
                        <Form.Control type="text" value={searchParams.name || ''} onChange={(e) => setSearchParams({...searchParams, name: e.target.value})} placeholder='Name' />
                    </FloatingLabel>
                </th>
                <th className="col-3">
                    <FloatingLabel controlId="owner-id" label="Owner ID">
                        <Form.Control type="number" value={searchParams.owner || ''} onChange={(e) => setSearchParams({...searchParams, owner: e.target.value})} placeholder='Owner ID' />
                    </FloatingLabel>
                </th>
                <th className="col-4">
                    <FloatingLabel controlId="adoption-status" label="Adoption status">
                        <Form.Control type="text" value={searchParams.status || ''} onChange={(e) => setSearchParams({...searchParams, status: e.target.value})} placeholder='Adoption status' />
                    </FloatingLabel>
                </th>
                </tr>
            </thead>
            <tbody>
                { petsToDisplay && petsToDisplay.length !== 0 &&
                    
                    petsToDisplay.map(pet => {
                    return <PetRow key={pet.id} pet={pet} />
                })
                }
            </tbody>
        </Table>
  )
}
