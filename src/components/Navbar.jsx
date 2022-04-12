import React from 'react'
import '../style/style.css'
// assets
import logo from '../assets/icons/logo.png'

// components
import Login from './auth/Login'
import Register from './auth/Register'

const Navbar = () => {
  return (
    <div className='section__padding bg-white jp__navbar'>
      <div className='row py-2'>
          <div className='col-6'>
            <img src={logo} alt="logo" />
          </div>
          <div className='col-6 d-flex align-items-center justify-content-end'>
            <Login />
            <Register />
            {/* <button className='btn btn-warning ms-3 text-light shadow-none'>Register</button> */}
          </div>
      </div>
    </div>
  )
}

export default Navbar
