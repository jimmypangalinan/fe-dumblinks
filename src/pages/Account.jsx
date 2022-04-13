import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { API } from '../config/api';
import '../style/style.css';

// components
import Side_Bar from '../components/Side_Bar';
import Navbar_Mobile from '../components/Navbar_Mobile';

const Account = () => {

    const navigate = useNavigate();

    // get user by id
    const [profile, setProfile] = useState();

    const id = useParams();

    // get user 
    const getProfile = async () => {
        try {
            const response = await API.get(`/user/${id}`);
            setProfile(response.data.userExist);

        } catch (error) {
            console.log(error);
        }
    }

    // delete user
    const deleteUser = async () => {
        try {
            const response = await API.delete(`/user/${profile.id}`);

            if (response.status == 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Success to delete user',
                    text: "Thank you for choce wayslink!!",
                    showConfirmButton: false,
                    timer: 3000
                })
                setTimeout(function () {
                    navigate('/')
                }, 2000)
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ops... , Something Wrong',
                showConfirmButton: false,
                timer: 3000
            })
            console.log(error);
        }
    }

    const [form, setForm] = useState({
        email: profile?.email,
        fullName: profile?.fullName,
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // update user
    const updateUser = async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }

            const body = JSON.stringify(form);

            const response = await API.patch(`/user/${profile.id}`, body, config);
            console.log(response);
            if (response.status == 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Success update profile',
                    text: "Please don't repeat submit again !",
                    showConfirmButton: false,
                    timer: 3000
                })
            }

        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ops... , Something Wrong',
                showConfirmButton: false,
                timer: 3000
            })
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile()
    }, []);

    return (
        <div className='section__padding bg-white'>
            <div className='row'>
                <div className='col-3 vh-100 bg-info jp__account__side_bar'>
                    <Side_Bar />
                </div>
                <div className='col-lg-9'>
                <Navbar_Mobile />
                    <div className='row bg-white py-3 ms-lg-4 ms-sm-3'>
                        <h3>My Account</h3>
                    </div>

                    <div className='row bg-light pt-lg-4 pt-2'>
                        <div className='row pb-lg-4 ms-lg-4'>
                            <h5>My Information</h5>
                        </div>

                        <div className='row  my-3 ms-lg-4'>
                            <div className='col-12 col-lg-11 ms-2 bg-white jp_account_input_data'>
                                <div className='py-3'>
                                    <label>Name</label>

                                    {profile ? (
                                        <input
                                            type="text"
                                            name='fullName'
                                            placeholder="ex. Your fullname"
                                            className='pt-3'
                                            onChange={handleChange}
                                            defaultValue={profile.fullName}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name='fullName'
                                            placeholder="Your Full Name"
                                            className='pt-3'

                                        />)}

                                </div>

                                <div className='py-3'>
                                    <label>Email</label>
                                    {profile ? (
                                        <input
                                            type="text"
                                            name='email'
                                            placeholder={profile.email}
                                            className='pt-3'
                                            onChange={handleChange}
                                            defaultValue={profile.email}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder="Your Email"
                                            className='pt-3'
                                        />)}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-lg-12 d-flex justify-content-between justify-content-md-end text-lg-end me-lg-5 pe-lg-5 pb-5'>
                                <button className='btn btn-warning me-lg-3 ms-3 text-white shadow-none' onClick={updateUser}>Save Account</button>
                                <button className='btn btn-danger me-1 ms-md-4 shadow-none' onClick={deleteUser}>Delete Account</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account 