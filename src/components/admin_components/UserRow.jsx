import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AdminPopupModal from './AdminPopupModal';
import './UserRow.css';

export default function UserRow({user}) {

    const { id, first_name, last_name, email, phone, is_admin, registered_at, bio } = user;

    const [modalShow, setModalShow] = useState(false);

    function handleUserClick() {
        setModalShow(true);
    }

    function handleModalClose() {
        setModalShow(false);
    }

  return (
    <>
    <tr onClick={handleUserClick}>
          <td>{id}</td>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{ is_admin ? <strong>admin</strong> : "user" }</td>
    </tr>
    <AdminPopupModal show={modalShow} onHide={handleModalClose} user={user} mode={"userDetails"} />
    </>
  )
}
