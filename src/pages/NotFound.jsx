import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./NotFound.css";

export default function NotFound() {

    const navigate = useNavigate();

  return (
    <div className='wrapper text-center'>
        <div className='error-page'>
        <h1 className='display-1'>Oops! <strong>404</strong></h1>
        <p>
        <Link to='/' className='link'>Go home</Link> or <Link to='#' onClick={() => navigate(-1)}>Go Back</Link>?
        </p>
        </div>
    </div>
  )
}
