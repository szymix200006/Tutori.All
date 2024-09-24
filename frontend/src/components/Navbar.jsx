import React from 'react'
import '../styles/Navbar.css'
import Logo_Small from '../assets/Logo_Small.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar-container">
        <img src={Logo_Small} alt="logo" className='navbar-logo'/>
        <nav className="navbar">
            <Link to='#' className='navbar-link'>
                <button className='navbar-login-button'>
                    Login
                </button>
            </Link>
            <Link to='#' className='navbar-link'>
                <button className="navbar-upload-button">
                    <span className="material-symbols-outlined navbar-upload-button-icon">upload</span>
                    Upload
                </button>
            </Link>
        </nav>
    </div>
  )
}

export default Navbar
