import React from 'react';
import { Link } from 'react-router-dom';
import PopupModal from '../components/PopupModal';
import { useAuthContext } from '../context/AuthContext';
import './HomePage.css';

export default function HomePage() {

  const { currentUser } = useAuthContext();

  return (
    <div className='wrapper-homepage'>
        <div className='home-page-title'>
            <p className='title-first'>Make your life better.</p>
            <p className='title-second'>Today.</p>
            <p className='subtitle'>And not only your! Thousands of pets are waiting to find a new home, and your home is just the right match. { currentUser.id ? <Link to='/search' className='link'>Ready for a journey?</Link> : <PopupModal modalType='signup' linkText='Ready for a journey?' />}</p>
        </div>
    </div>
  )
}
