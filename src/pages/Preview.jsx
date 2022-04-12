import React, { useEffect, useState } from 'react'
import { API } from '../config/api'
import { useNavigate, useParams } from 'react-router-dom'
// style
import '../style/style.css'

// assests
import foto from '../assets/foto-preview.jpg'
import fb from '../assets/icons/fb.png'
import ig from '../assets/icons/ig.png'
import twitter from '../assets/icons/twitter.png'
import yt from '../assets/icons/yt.png'
import wa from '../assets/icons/wa.png'


const Preview = () => {


    const { id } = useParams();
    console.log(id);
    const [preview, setPreview] = useState();
    console.log(preview);
    const getPreview = async () => {
        try {
            const response = await API.get(`/group/${id}`);
            setPreview(response.data.data.group);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPreview()
    }, [])


    const redidectExternal = (url) => {
        console.log(url);
        window.location.href = `${url}`
    }

    return (
        <div className='section__padding bg-white'>
            <div className='row'>
                <div className='col-6 offset-3 text-center '>
                    <div className='row pt-5 pb-2' >
                        <img src={foto} alt="foto" style={{
                            clipPath: "circle()",
                            height: 130,
                            border: 200,
                        }} />
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
                                        src={`http://localhost:5000/uploads/${item.icon}`}
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

export default Preview