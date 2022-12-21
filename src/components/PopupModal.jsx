import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LogIn from './LogIn';
import SignUp from './SignUp';

function PopupModal({modalType, linkText}) {
  const [show, setShow] = useState(false);

  const [popupMode, setPopupMode] = useState(modalType);
  // setPopupMode(modalType);

  const handleClose = () => { 
    setShow(false);
    setPopupMode(popupMode === 'login' ? 'login' : 'signup');
  }
  const handleShow = (e) => { 
    e.preventDefault();
    setShow(true);
  }

  const handleSetPopupModal = (e) => {
    e.preventDefault();
    setPopupMode(popupMode === 'login' ? 'signup' : 'login');
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <a href='#' onClick={(e) => {handleShow(e)}}>
        {linkText}
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{popupMode === 'login' ? 'Log in' : 'Sign up'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {popupMode === 'login' ? <LogIn handleSetPopupModal={handleSetPopupModal} /> : <SignUp handleSetPopupModal={handleSetPopupModal} />}
          <div className='d-flex flex-column align-items-center'>
            <p>{popupMode === 'login' ? "Don't have an account?" : "Already a member?"}</p>
            <a href="#" onClick={(e) => {handleSetPopupModal(e)}}>{popupMode === 'login' ? 'Sign up' : 'Log in'}</a>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            {popupMode === 'login' ? 'Log in' : 'Sign up'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupModal;