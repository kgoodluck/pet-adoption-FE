import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function AddPetForm({newPet, setNewPet, handleAddPet, addValidation, handleFormChange}) {

  return (
    <Form id="add-pet-form" onSubmit={handleAddPet} noValidate validated={addValidation} onChange={handleFormChange}>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label className='required'>Name</Form.Label>
        <Form.Control required value={newPet.name || ''} onChange={(e) => setNewPet({...newPet, name: e.target.value})} />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridState">
        <Form.Label className='required'>Type</Form.Label>
        <Form.Select required value={newPet.type || ''} onChange={(e) => setNewPet({...newPet, type: e.target.value})}>
          <option value='Cat'>Cat</option>
          <option value='Dog'>Dog</option>
          <option value='Other'>Other</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label className='required'>Breed</Form.Label>
        <Form.Control required value={newPet.breed || ''} onChange={(e) => setNewPet({...newPet, breed: e.target.value})}/>
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label className='required'>Color</Form.Label>
        <Form.Control required value={newPet.color || ''} onChange={(e) => setNewPet({...newPet, color: e.target.value})}/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label className='required'>Age</Form.Label>
        <Form.Control required type="number" value={newPet.age || ''} onChange={(e) => setNewPet({...newPet, age: e.target.value})}/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label className='required'>Height (cm)</Form.Label>
        <Form.Control required type="number" value={newPet.height || ''} onChange={(e) => setNewPet({...newPet, height: e.target.value})}/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label className='required'>Weight (kg)</Form.Label>
        <Form.Control required type="number" value={newPet.weight || ''} onChange={(e) => setNewPet({...newPet, weight: e.target.value})}/>
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label className='required'>Hypoallergenic</Form.Label>
        <Form.Select required value={newPet.hypoallergenic || ''} onChange={(e) => setNewPet({...newPet, hypoallergenic: e.target.value})}>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
          <option value='unknown'>Not known</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Dietary</Form.Label>
        <Form.Control value={newPet.dietary || ''} onChange={(e) => setNewPet({...newPet, dietary: e.target.value})}/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label className='required'>Adoption status</Form.Label>
        <Form.Select required value={newPet.adoptionStatus || ''} onChange={(e) => setNewPet({...newPet, adoptionStatus: e.target.value})}>
          <option value='Available'>Available</option>
          <option value='Fostered'>Fostered</option>
          <option value='Adopted'>Adopted</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label className={newPet.adoptionStatus !== 'Available' ? 'required' : ''}>Owner id</Form.Label>
        <Form.Control required={newPet.adoptionStatus !== 'Available'} value={newPet.ownerId || ''} onChange={(e) => setNewPet({...newPet, ownerId: e.target.value})} disabled={ newPet.adoptionStatus === 'Available' }/>
      </Form.Group>
    </Row>

    <Form.Group className="mb-3" controlId="formGridAddress1">
      <Form.Label>Picture</Form.Label>
      <Form.Control type='file' accept='image/png, image/gif, image/jpeg' onChange={(e) => setNewPet({...newPet, picture: e.target.files[0]})} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridAddress2">
      <Form.Label>Bio</Form.Label>
      <Form.Control as="textarea" rows={3} value={newPet.bio || ''} onChange={(e) => setNewPet({...newPet, bio: e.target.value})} />
    </Form.Group>
  </Form>
  )
}
