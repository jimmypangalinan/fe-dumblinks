import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { UserContextToken } from '../context/useContext';
import { API } from "../config/api"

// style
import '../style/style.css'

// assets
import logo from '../assets/icons/logo.png'
import templateActive from '../assets/icons/template-active.png'
import template from '../assets/icons/template.png'
import profileActive from '../assets/icons/profile-active.png'
import profile from '../assets/icons/profile.png'
import linkActive from '../assets/icons/link-active.png'
import link from '../assets/icons/link.png'
import logout from '../assets/icons/logout.png'

const Side_Bar = () => {

    const [pageURL, setPageURL] = useState(0);
    useEffect(() => {
        setPageURL(window.location.href);
    })
    console.log(pageURL);

    // navigasi
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContextToken);

    function handleLogOut() {
        dispatch({
            type: "LOGOUT",
            isLogin: false,
        });
        navigate("/");
    }

    return (
        <div className='row bg-white'>
            <div className='col-6  offset-3 text-center vh-100'>
                <div className='mt-3 mb-5'>
                    <img src={logo} alt="logo" style={{ cursor: 'pointer' }} />
                </div>
                <div className='row h-50'>
                    <div className='d-flex align-items-center'>
                        {pageURL == 'http://localhost:3000/dasboard' ?
                            <img
                                src={templateActive}
                                alt="template-icon"
                                className='me-3'
                                style={{ cursor: 'pointer' }}
                            /> :
                            <img
                                src={template}
                                alt="template-icon"
                                className='me-3'
                                style={{ cursor: 'pointer' }}
                            />
                        }
                        <span
                            className='fs-4'
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/dasboard')}
                        >Template</span>
                    </div>
                    <div className='d-flex align-items-center' >
                        {pageURL == 'http://localhost:3000/account' ?
                            <img
                                src={profileActive}
                                alt="profile-icon"
                                className='me-3'
                                style={{ cursor: 'pointer' }}
                            /> :
                            <img
                                src={profile}
                                alt="profile-icon"
                                className='me-3'
                                style={{ cursor: 'pointer' }}
                            />
                        }

                        <span className='fs-4' style={{ cursor: 'pointer' }} onClick={() => navigate('/account')}>Profile</span>
                    </div>
                    <div className='d-flex align-items-center' >
                        {pageURL == 'http://localhost:3000/links' ?
                            <img
                                src={linkActive}
                                alt="link-icon"
                                className='me-3'
                                style={{ cursor: 'pointer' }}
                            /> :
                            <img
                                src={link}
                                alt="link-icon"
                                className='me-3'
                                style={{ cursor: 'pointer' }}
                            />
                        }

                        <span className='fs-4' style={{ cursor: 'pointer' }} onClick={() => navigate('/links')}>My Link</span>
                    </div>
                </div>
                <div className='row h-25 mt-5'>
                    <div className='d-flex align-items-center mt-5' style={{ cursor: 'pointer' }}>
                        <img src={logout} alt="logout-icon" className='me-3' style={{ cursor: 'pointer' }} />
                        <span className='fs-4' style={{ cursor: 'pointer' }} onClick={handleLogOut}>Log Out</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Side_Bar
