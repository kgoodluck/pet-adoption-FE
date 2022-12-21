import React from 'react'
import PopupModal from '../components/PopupModal';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className='wrapper-homepage'>
        <div className='home-page-title'>
            <p className='title-first'>Make your life better.</p>
            <p className='title-second'>Today.</p>
            <p className='subtitle'>And not only your! Thousands of pets are waiting to find a new home, and your home is just the right match. <PopupModal modalType='signup' linkText='Ready for a journey?' /></p>
        </div>
    </div>
  )
}
