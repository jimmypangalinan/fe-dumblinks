import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { API } from '../config/api';
import Swal from "sweetalert2";
import '../style/style.css'

// components
import Side_Bar from '../components/Side_Bar';

// assets hp blank
import temp1 from '../assets/temp1.png'

// icon
import add from '../assets/add-new-pic.png'
import fb from '../assets/fb-icon.png'
import git from '../assets/git-icon.png'
import foto from '../assets/foto-preview.jpg'
import ig from '../assets/icons/ig.png'
import twitter from '../assets/icons/twitter.png'
import yt from '../assets/icons/yt.png'
import wa from '../assets/icons/wa.png'

const Create_Link = () => {
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const [previewIcon, setPreviewIcon] = useState(null);
    const [dataLink, setDataLink] = useState([
        { id: uuidv4(), titleLink: '', url: '', icon: '' },
    ]);

    const handleSubmitDataLink = (e) => {
        e.preventDefault();
        console.log("dataLink", dataLink);
        handleAddDataLink()
    };

    const handleChangeDataLink = (id, event) => {
        const newDataLink = dataLink.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            if (id === i.id) {
                i[event.target.type === "file"] = event.target.value
            }
            return i;
        })

        if (event.target.type === "file") {
            let url = URL.createObjectURL(event.target.files[0]);
            setPreviewIcon(url);
        }
        setDataLink(newDataLink);
    }

    const handleAddDataLink = () => {
        setDataLink([...dataLink, { id: uuidv4(), titleLink: '', url: '', icon: '' }])
    }

    ///////////////////////////////////////////////////////
    // state grouplink
    const [form, setForm] = useState({
        title: "",
        description: "",
        imgBrand: "",
    });

    const handleChangeBrand = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const config = {
                Headers: {
                    "Content-type": "multipart/form-data",
                }
            };

            const formData = new FormData();
            formData.set("imgBrand", form.imgBrand[0], form.imgBrand[0].name);
            formData.set("title", form.title);
            formData.set("description", form.description);

            const response = await API.post("/add-group", formData, config);
            
            const idBrand = response.data.groups.id

            if (response.status == 201) {
                const responses = await API.post(`/add-link/${idBrand}`, dataLink, config);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Success to add new brand',
                    text: "Please don't repeat submit again !",
                    showConfirmButton: false,
                    timer: 3000
                })

                if (responses.status == 201) {
                    setTimeout(function () {
                        navigate("/links")
                    }, 2000)
                }
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

    // update link
    const { id } = useParams()
    const getGroupEdit = async () => {
        if (id) {
            try {
                const response = await API.get(`/group/${id}`);
                setForm(response.data.data.group);
                setDataLink(response.data.data.group.link);
            } catch (error) {
                console.log(error);
            }
        }else{
            return
        }
    };

    useEffect(() => {
        getGroupEdit()
    }, [])

    return (
        <div className='section__padding bg-white'>
            <div className='row'>

                <div className='col-3 vh-100 bg-info jp__create_link_side_bar'>
                    <Side_Bar />
                </div>

                <div className='col col-lg-9 vh-100'>
                    <div className='row bg-white py-3'>
                        <h3>Template</h3>
                    </div>
                    <div className='row bg-light pt-lg-4 pt-2'>
                        <div className='row pb-lg-4'>
                            <div className='col-6 col-lg-5 ms-lg-4'>
                                <h5>Create Link</h5>
                            </div>
                            <div className='col-6 text-end'>
                                <button
                                    className='btn btn-warning text-white shadow-none'
                                    onClick={handleSubmit}
                                >Publish Link</button>
                            </div>
                        </div>

                        <div className='row pb-5'>

                            <div className='col-12 col-lg-9'>
                                <div className='row'>
                                    <div className="col-lg-9 col jp__input_area">
                                        <div className="row bg-white ms-lg-4 vh-50 input-data p-3">
                                            <div className='d-flex align-items-center'>

                                                {/* start foto brand */}
                                                <label htmlFor="img-brand" >
                                                    {preview ? (
                                                        <div>
                                                            <img
                                                                src={preview}
                                                                style={{
                                                                    maxWidth: "150px",
                                                                    maxHeight: "150px",
                                                                    objectFit: "cover",
                                                                }}
                                                            />
                                                        </div>
                                                    ) :
                                                        <img
                                                            src={add}
                                                            alt="foto"
                                                            style={{ 
                                                                cursor: "pointer" 
                                                            }}
                                                        />
                                                    }
                                                    <input
                                                        id='img-brand'
                                                        className='d-none'
                                                        type="file"
                                                        name="imgBrand"
                                                        onChange={handleChangeBrand}
                                                    />
                                                </label>

                                                <div>
                                                    <button
                                                        className='btn btn-warning ms-5 text-white shadow-none'
                                                        type='submit'
                                                    >Upload</button>
                                                </div>
                                            </div>
                                            {/* end foto brand */}
                                            {/* start brand */}

                                            <div className='row py-3'>
                                                <label>Title</label>
                                                <input
                                                    type="text"
                                                    placeholder='Ex. Your Title'
                                                    name='title'
                                                    onChange={handleChangeBrand}
                                                    defaultValue={form.title}
                                                />
                                            </div>

                                            <div className='row py-3'>
                                                <label >Description</label>
                                                <input
                                                    type="text"
                                                    placeholder='Ex. Dexcription Here'
                                                    name='description'
                                                    defaultValue={form.description}
                                                    onChange={handleChangeBrand}
                                                />
                                            </div>
                                            {/* end brand */}

                                            {dataLink.map((item) => {
                                                return (
                                                    <div className='d-flex py-3 jp__links_link mb-2' key={item.id}>
                                                        <div className='col-4'>
                                                            <label >
                                                                {previewIcon ? (
                                                                    <div>
                                                                        <img
                                                                            src={previewIcon}
                                                                            style={{
                                                                                maxWidth: "120px",
                                                                                maxHeight: "120px",
                                                                                objectFit: "cover",
                                                                            }}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    <img
                                                                        src={add}
                                                                        alt="foto"
                                                                        style={{ cursor: "pointer" }}
                                                                    />
                                                                }
                                                                <input
                                                                    className='d-none'
                                                                    type="file"
                                                                    name="icon"
                                                                    value={item.icon}
                                                                    onChange={event => handleChangeDataLink(item.id, event)}
                                                                />
                                                            </label>
                                                        </div>

                                                        <div className='col'>
                                                            <div className='row pe-3'>
                                                                <label className=''>Title Link</label>
                                                                <input
                                                                    type="text"
                                                                    className='mb-3'
                                                                    name='titleLink'
                                                                    value={item.titleLink}
                                                                    onChange={event => handleChangeDataLink(item.id, event)}
                                                                />
                                                                <label className=''>Link</label>
                                                                <input
                                                                    type="text"
                                                                    name='url'
                                                                    value={item.url}
                                                                    onChange={event => handleChangeDataLink(item.id, event)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                            <div className='row d-flex justify-content-center ms-1 py-3 '>
                                                <button
                                                    className='btn btn-info text-white shadow-none'
                                                    type='submit'
                                                    onClick={handleSubmitDataLink}
                                                >Add Link</button>
                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* right section  */}

                            <div className='col-12 col-lg-3 mt-4  jp__create_link_image_area'>
                                <img
                                    src={temp1}
                                    alt="template"
                                    className='jp_temp'
                                />

                                <div className="bg-white jp_input-data-2 ">
                                    <div className='row d-felx justify-content-center mt-4'>
                                        {preview ?
                                            <img
                                                src={preview}
                                                alt="brand"
                                                style={{
                                                    maxWidth: 120,
                                                    maxHeight: 120,
                                                    clipPath: "circle()",
                                                }}
                                            /> :
                                            <img
                                                src={add}
                                                alt="brand"
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    clipPath: "circle()",
                                                }}
                                            />

                                        }

                                    </div>
                                    <div className='row text-center mt-2 mx-2'>
                                        <span className='fw-bold fs-6'>{form.title}</span>
                                        <p
                                            className='text-center'
                                            style={{
                                                fontSize: 11,
                                                overflowWrap: 'break-word'
                                            }}>{form.description}</p>
                                    </div>

                                    {dataLink.map((item) => {
                                        return (
                                            <div className='row  mb-1'>
                                                <div className='col-2 bg-dark offset-1'>
                                                    <img
                                                        src={ig}
                                                        alt="icon-fb"
                                                        style={{ maxWidth: 30, maxHeight: 30, clipPath: "circle()" }}
                                                    />
                                                </div>
                                                <div className='col-8 bg-dark d-flex align-items-center justify-content-center'>
                                                    <span className='fs-6 text-white'>{item.titleLink}</span>
                                                </div>
                                            </div>
                                        )
                                    })}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create_Link 