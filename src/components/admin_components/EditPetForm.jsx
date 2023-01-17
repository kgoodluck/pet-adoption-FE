import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function EditPetForm({handleEditPet, editValidation, updatedPet, setUpdatedPet, handleFormChange}) {

    console.log('updatedPet', updatedPet);

  return (
    <Form id="add-pet-form" onSubmit={handleEditPet} noValidate validated={editValidation} onChange={handleFormChange} >

    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label className='required'>Name</Form.Label>
        <Form.Control required value={updatedPet.name || ''} onChange={(e) => setUpdatedPet({...updatedPet, name: e.target.value})} />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridState">
        <Form.Label className='required'>Type</Form.Label>
        <Form.Select required value={updatedPet.type || ''} onChange={(e) => setUpdatedPet({...updatedPet, type: e.target.value})}>
          <option value='Cat'>Cat</option>
          <option value='Dog'>Dog</option>
          <option value='Other'>Other</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label className='required'>Breed</Form.Label>
        <Form.Control required value={updatedPet.breed || ''} onChange={(e) => setUpdatedPet({...updatedPet, breed: e.target.value})}/>
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label className='required'>Color</Form.Label>
        <Form.Control required value={updatedPet.color || ''} onChange={(e) => setUpdatedPet({...updatedPet, color: e.target.value})}/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label className='required'>Age</Form.Label>
        <Form.Control required type="number" value={updatedPet.age || ''} onChange={(e) => setUpdatedPet({...updatedPet, age: e.target.value})}/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label className='required'>Height (cm)</Form.Label>
        <Form.Control required type="number" value={updatedPet.height || ''} onChange={(e) => setUpdatedPet({...updatedPet, height: e.target.value})}/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label className='required'>Weight (kg)</Form.Label>
        <Form.Control required type="number" value={updatedPet.weight || ''} onChange={(e) => setUpdatedPet({...updatedPet, weight: e.target.value})}/>
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label className='required'>Hypoallergenic</Form.Label>
        <Form.Select required value={updatedPet.hypoallergenic || ''} onChange={(e) => setUpdatedPet({...updatedPet, hypoallergenic: e.target.value })}>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
          <option value='unknown'>Not known</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Dietary</Form.Label>
        <Form.Control value={(updatedPet.dietary !== '[]' && updatedPet.dietary ) || ''} onChange={(e) => setUpdatedPet({...updatedPet, dietary: e.target.value})}/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label className='required'>Adoption status</Form.Label>
        <Form.Select required value={updatedPet.adoptionStatus || ''} onChange={(e) => setUpdatedPet({...updatedPet, adoptionStatus: e.target.value})}>
          <option value='Available'>Available</option>
          <option value='Fostered'>Fostered</option>
          <option value='Adopted'>Adopted</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label className={updatedPet.adoptionStatus !== 'Available' ? 'required' : ''}>Owner id</Form.Label>
        <Form.Control required={updatedPet.adoptionStatus !== 'Available'} value={updatedPet.ownerId || ''} onChange={(e) => setUpdatedPet({...updatedPet, ownerId: e.target.value})} disabled={ updatedPet.adoptionStatus === 'Available' }/>
      </Form.Group>
    </Row>

    {/* <Form.Group className="mb-3" controlId="formGridAddress1">
      <Form.Label>Picture</Form.Label>
      <Form.Control type='file' accept='image/png, image/gif, image/jpeg' />
    </Form.Group> */}

    <Form.Group className="mb-3" controlId="formGridAddress2">
      <Form.Label>Bio</Form.Label>
      <Form.Control as="textarea" rows={3} value={updatedPet.bio || ''} onChange={(e) => setUpdatedPet({...updatedPet, bio: e.target.value})} />
    </Form.Group>
  </Form>
  )
}
