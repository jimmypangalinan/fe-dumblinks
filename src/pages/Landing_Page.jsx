import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/style.css'

// useContext
import { UserContextModal } from '../context/Modal'

// components
import Navbar from '../components/Navbar'
import Navbar_Mobile from '../components/Navbar_Mobile'

// assets
import phone from '../assets/phone.png'
import pc from '../assets/pc.png'
import pchp from '../assets/ilustrator.png'

const Landing_Page = () => {
    // navigasi
    const Navigate = useNavigate()
     
    // handling show modal
    const [state, dispatch] = useContext(UserContextModal)
    
    const ShowRegister = () => {
        dispatch({
            type: 'SHOW',
            payload : {
                Login : false,
                Register : true
            }
        })
    }


    return (
        <div>
            <Navbar />
            {/* <Navbar_Mobile /> */}
            <div className='section__padding bg-warning jp_landing_page_conatiner'>
                
                <div className='row d-lg-flex align-items-center vh-100'>

                    <div className='col-sm-11  ms-sm-4 mb-md-5 order-lg-first col-lg-6 '>
                        <h1 className='text-light jp__heading'>The Only Link You’ll Ever Need</h1>
                        <p className='text-light'>
                            Add a link for your Social Bio and optimize your social media traffic.
                        </p>

                        <p className='text-light'>
                            safe, fast and easy to use
                        </p>

                        {/* <button 
                            className='btn btn-dark py-sm-2 py-2  px-3 px-sm-3  shadow-none' 
                            onClick={() => Navigate("/dasboard")}>Get Stated For Free</button> */}
                        <button className='btn btn-dark py-2 px-3 shadow-none' onClick={ShowRegister}>Get Stated For Free</button>
                    </div>

                    <div className='col-sm-11 order-first col-lg-5 bg-info'>
                        <div className='row bg-info'>
                            <img src={pchp} alt="pc" className='jp__img_pc' />
                            {/* <img src={phone} alt="phone" className='jp__img_phone' /> */}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Landing_Page