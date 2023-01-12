import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./ErrorPage.css";

export default function ErrorPage({ errorCode }) {

    const navigate = useNavigate();

  return (
    <div className='wrapper text-center'>
        <div className='error-page'>
        <h1 className='display-1'>Oops! <strong>{errorCode}</strong></h1>
        <h4>
          {errorCode == 404 && "Page not found"}
          {errorCode == 403 && "Access denied"}
          {!errorCode && "Something went wrong"}
        </h4>
        <p>
        <Link to='/' className='link'>Go Home</Link> or <Link to='#' onClick={() => navigate(-1)}>Go Back</Link>?
        </p>
        </div>
    </div>
  )
}
