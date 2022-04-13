import React from 'react'
import { useNavigate } from 'react-router-dom'

// component
import Side_Bar from '../components/Side_Bar'
import Navbar_Mobile from '../components/Navbar_Mobile'

// assets
import template1 from '../assets/template1.png'
import template2 from '../assets/template2.png'
import template3 from '../assets/template3.png'
import template4 from '../assets/template4.png'

const Dasboard = () => {

    const Navigate = useNavigate()

    return (
        <div className='section__padding bg-white'>

            <div className='row'>

                <div className='col-lg-3 col-md-3 vh-100 bg-info jp__dasboard__side_bar'>
                    <Side_Bar />
                </div>

                <div className='col col-lg-9'>
                    <Navbar_Mobile />
                    <div className='row bg-white py-3 ms-lg-4 ms-sm-3'>
                        <h3>Template</h3>
                    </div>
                    <div className='row bg-light vh-lg-100 pt-lg-4 pt-2'>
                        <div className='col-lg-3 col-6 mb-3 text-center'>
                            <img
                                src={template1} alt="tempalte-01"
                                style={{ cursor: 'pointer' }}
                                className="img-fluid"
                                onClick={() => Navigate('/create-link')}
                            />
                        </div>
                        <div className='col-lg-3 col-6 mb-3 text-center'>
                            <img
                                src={template2}
                                alt="tempalte-02" style={{ cursor: 'pointer' }}
                                className="img-fluid"
                                onClick={() => Navigate('/create-link')}
                            />
                        </div>
                        <div className='col-lg-3 col-6 mb-3 text-center'>
                            <img
                                src={template3}
                                alt="tempalte-03"
                                style={{ cursor: 'pointer' }}
                                className="img-fluid"
                                onClick={() => Navigate('/create-link')}
                            />
                        </div>
                        <div className='col-lg-3 col-6 mb-3 text-center'>
                            <img
                                src={template4}
                                alt="tempalte-03"
                                style={{ cursor: 'pointer' }}
                                className="img-fluid"
                                onClick={() => Navigate('/create-link')}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dasboard