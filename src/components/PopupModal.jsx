import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { signUpUserApi, loginUserApi } from '../api/usersApi';
import { useAuthContext } from '../context/AuthContext';
import LogIn from './LogIn';
import SignUp from './SignUp';

function PopupModal({modalType, linkText}) {

  const { setCurrentUser } = useAuthContext();

  const [show, setShow] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(true);

  const [popupMode, setPopupMode] = useState(modalType);
  // setPopupMode(modalType);

  const [justSignedUp, setJustSignedUp] = useState(false);
  const [receivedError, setReceivedError] = useState('');
  const [ signUpDetails, setSignUpDetails ] = useState({});
  const [loginDetails, setLoginDetails] = useState({});

  function handleFormChange(e) {
    if(popupMode === 'login') {
    setLoginDetails({...loginDetails, [e.target.id]: e.target.value})
    setReceivedError('');
    }
    if(popupMode === 'signup')
    setSignUpDetails({ ...signUpDetails, [e.target.id]: e.target.value}); 
  }

  const handleClose = () => { 
    setShow(false);
    setJustSignedUp(false);
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

  const handleSignUp = async () => {
    const res = await signUpUserApi(signUpDetails);
    if (res.ok) {
      setSignUpDetails({});
      setJustSignedUp(true);
      setPopupMode('login');
    } else {
      console.log('afasf', res.fail);
    }
  }

  const handleLogIn = async () => {
    setJustSignedUp(false);
    try {
      const res = await loginUserApi(loginDetails);
      console.log('res', res);
      if (res.data.ok) {
        setCurrentUser({ id: res.data.id, name: res.data.name });
        setShow(false);
      } else {
        setReceivedError(res.response.data)
      }
    } catch (err) {
      console.log('adasf');
      console.log(err);
    }
  }

  

  const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  useEffect(function areSignUpFieldsCorrect() {
    const {firstName, lastName, email, phone, password, rePassword} = signUpDetails;
    const goodEmail = isEmail(email);
    if(firstName && lastName && email && phone && password && rePassword && goodEmail && password?.length >= 4 && password === rePassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [signUpDetails])

  useEffect(function areLoginFieldsCorrect() {
    const {email, password} = loginDetails;
    const goodEmail = isEmail(email);
    if(email && password && goodEmail && password?.length >= 4) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [loginDetails])

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

          { receivedError !== '' && popupMode === 'login' && <div className='mb-2 text-center'>
            <p className='text-danger'>{receivedError}</p>
          </div> }

          { justSignedUp && popupMode === 'login' && <div className='mb-2 text-center'>
            <p className='text-success'><strong>Signed up succesfully!</strong><br/>Now enter your login details.</p>
          </div> }

          {popupMode === 'login' ? <LogIn handleFormChange={handleFormChange} loginDetails={loginDetails} isEmail={isEmail} /> : <SignUp handleSetPopupModal={handleSetPopupModal} handleFormChange={handleFormChange} signUpDetails={signUpDetails} isEmail={isEmail} />}

          <div className='d-flex flex-column align-items-center'>
            <p>{popupMode === 'login' ? "Don't have an account?" : "Already a member?"}</p>
            <a href="#" onClick={(e) => {handleSetPopupModal(e)}}>{popupMode === 'login' ? 'Sign up' : 'Log in'}</a>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={popupMode === 'login' ? handleLogIn : handleSignUp} disabled={isDisabled}>
            {popupMode === 'login' ? 'Log in' : 'Sign up'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupModal;