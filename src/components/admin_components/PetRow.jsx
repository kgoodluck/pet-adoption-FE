import { useEffect, useState } from 'react';
import AdminPopupModal from './AdminPopupModal';
import './PetRow.css';

export default function PetRow({pet}) {

    const [petState, updatePetState] = useState(pet);

    const { adoptionStatus, age, bio, breed, color, created_at, dietary, height, hypoallergenic, id, name, ownerId, picture, type, weight } = petState;

    const [modalShow, setModalShow] = useState(false);

    function handlePetClick() {
        setModalShow(true);
    }

    function handleModalClose() {
        setModalShow(false);
    }

  return (
    <>
    <tr onClick={handlePetClick}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{ownerId ? ownerId : ""}</td>
          <td className={adoptionStatus === 'Available' ? '' : 'owned'}>{adoptionStatus}</td>
    </tr>
    <AdminPopupModal show={modalShow} onHide={handleModalClose} mode={"editPet"} pet={pet} updatePetState={updatePetState} />
    </>
  )
}
