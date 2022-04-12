import React, { useEffect, useState } from 'react'
import Side_Bar from '../components/Side_Bar'
import Swal from "sweetalert2";

import ways from '../assets/ways-food.png'
import view from '../assets/icons/view.png'
import edit from '../assets/icons/edit.png'
import del from '../assets/icons/delete.png'

import { API } from '../config/api'
import { useNavigate } from 'react-router-dom'

const Links = () => {

    const navigate = useNavigate()

    const [dataBrand, setDataBrand] = useState([]);

    const getBrand = () => {
        API.get(`/groups`).then(res => {
            console.log(res);
            setDataBrand(res.data.data.groups)
        })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getBrand()
    }, [])

    // delete grouplink
    const deleteBrand = async (id) => {
        const response = await API.delete(`/group/${id}`);

        console.log(response);
        getBrand()

        if(response.status == 201){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success delete brand',
                showConfirmButton: false,
                timer: 3000
            })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ops... , Something Wrong',
                showConfirmButton: false,
                timer: 3000
            })
  
        }
        
    }


    return (
        <div className='section__padding bg-white'>
            <div className='row'>
                <div className='col-3 vh-100 bg-info'>
                    <Side_Bar />
                </div>
                <div className='col-9'>
                    <div className='row bg-white py-3 ms-4 '>
                        <h3>My Links</h3>
                    </div>
                    <div className='row bg-light pt-4 mb-3 '>
                        <div className='d-flex align-items-center ms-4'>
                            <div className='col ms-5'>
                                <span className='fs-5 me-2'>All Links</span>
                                <span className='bg-warning px-3 py-2 mx-1 jp__count_link '>{dataBrand.length}</span>
                            </div>

                            <div className='col-7 py-3 '>
                                <input type="text" placeholder=' Find Your Link' className='jp_links_input bg-light' />
                            </div>

                            <div className='col-2 ms-4'>
                                <button className='btn btn-warning'>Search</button>
                            </div>
                        </div>

                        <div className='mb-5'>
                            {dataBrand.map(brand => {
                                return (
                                    <>
                                        <div className='d-flex align-items-center mt-5'>
                                            <div className='col-2 ps-5'>
                                                {brand.imgBrand ?
                                                    <img
                                                        src={`http://localhost:5000/uploads/${brand.imgBrand}`}
                                                        alt="icon-link"
                                                        style={{
                                                            maxWidth: 100,
                                                            maxHeight: 100,
                                                            borderRadius: 8,

                                                        }}
                                                    /> : <img
                                                        src={ways}
                                                        alt="icon-link"
                                                        style={{
                                                            maxWidth: 100,
                                                            maxHeight: 100,
                                                            borderRadius: 8,

                                                        }}
                                                    />
                                                }
                                            </div>
                                            <div className='col-5'>
                                                <div className='row'>
                                                    <span className='fs-4 fw-bold pb-3'>{brand.title}</span>
                                                    <span>localhost:3000/{brand.uniqueLink}</span>
                                                </div>
                                            </div>

                                            <div className='col-1'>
                                                <div className='row'>
                                                    <span className='fs-4 fw-bold pb-3'>{brand.viewCount}</span>
                                                    <span className='text-muted'>visit</span>
                                                </div>
                                            </div>

                                            <div className='col-3 px-5 offset-1'>
                                                <div className='d-flex me-3 justify-content-between'>
                                                    <img
                                                        src={view}
                                                        alt="icon-view"
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}
                                                        // onClick={() => navigate(`/preview/${brand.id}`)}
                                                        onClick={() => navigate(`/${brand.uniqueLink}`)}
                                                    />
                                                    <img
                                                        className='mx-1'
                                                        src={edit}
                                                        alt="icon-edit"
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => navigate(`/edit-link/${brand.id}`)}
                                                    />
                                                    <img
                                                        src={del}
                                                        alt="icon-delete"
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => deleteBrand(brand.id)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Links