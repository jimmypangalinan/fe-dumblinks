import React, { useEffect, useState } from 'react'
import { API } from '../config/api'
import { useNavigate, useParams } from 'react-router-dom'

// style
import '../style/style.css'

// assests
import foto from '../assets/foto-preview.jpg'


const Publish = () => {

    const { id } = useParams();
    console.log(id);

    const [path, setPath] = useState()
    const [preview, setPreview] = useState();
    console.log(preview);

    const getPreview = async () => {
        try {
            const response = await API.get(`/url/${id}`);
            setPreview(response.data.data.group);
            setPath(response.data.data.path);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPreview()
    }, []);    

    const redidectExternal = async (url, e) => {
        console.log(url);
        window.location.href = window.open(`${url}` , '_blank');
        try {
            console.log(preview.id);
            const response = await API.patch(`/view/${preview.id}`)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='section__padding bg-white'>
            <div className='row'>
                <div className='col-10 col-lg-6 offset-lg-3 offset-1 text-center '>
                    <div className='row d-flex justify-content-center pt-5 pb-2' >
                        {preview ?
                            <img src={path + preview.imgBrand}
                                alt="foto"
                                style={{
                                    maxWidth: 150,
                                    clipPath: "circle()",
                                }} /> :
                            <img src={foto}
                                alt="foto"
                                style={{
                                    maxWidth: 150,
                                    clipPath: "circle()",
                                }} />
                        }
                    </div>

                    <div className='row'>
                        {preview ? <h4>{preview.title}</h4> : <h4>Brand Here</h4>}
                        {preview ? <p className='fs-5'>{preview.description}</p> : <p className='fs-5'>Description Here</p>}
                    </div>

                    {preview ? preview.link.map((item) => {
                        return (
                            <div className='row py-2 bg-dark rounded mb-1' key={item.id}>
                                <div className='col-1'>
                                    <img
                                        src={path + item.icon}
                                        alt="icon-fb"
                                        className='p-1 bg-white'
                                        style={{
                                            width: 50,
                                            clipPath: "circle()",
                                        }}
                                    />
                                </div>
                                <div className='col-10 d-flex align-items-center justify-content-center ' onClick={() => redidectExternal(item.url)}>
                                    {item ?
                                        <span
                                            className='fs-4 text-white'
                                            style={{ cursor: 'pointer' }}
                                        >{item.titleLink}</span> : <span></span>
                                    }
                                </div>
                            </div>
                        )
                    }) : <span></span>}



                </div>
            </div>
        </div>
    )
}

export default Publish